import { type User, type InsertUser, type Contact, type InsertContact } from "@shared/schema";
import { randomUUID } from "crypto";
import { readFile, writeFile, mkdir } from "fs/promises";
import { dirname, join } from "path";
import { fileURLToPath } from "url";

const __dirname = dirname(fileURLToPath(import.meta.url));
const DATA_DIR = join(__dirname, "data");
const INQUIRIES_FILE = join(DATA_DIR, "inquiries.json");

export interface IStorage {
  getUser(id: string): Promise<User | undefined>;
  getUserByUsername(username: string): Promise<User | undefined>;
  createUser(user: InsertUser): Promise<User>;
  createContact(contact: InsertContact): Promise<Contact>;
  getContacts(): Promise<Contact[]>;
}

type StoredContact = Omit<Contact, "createdAt"> & { createdAt: string | Date | null };

async function ensureInquiriesFile(): Promise<void> {
  await mkdir(DATA_DIR, { recursive: true });
  try {
    await readFile(INQUIRIES_FILE, "utf-8");
  } catch {
    await writeFile(INQUIRIES_FILE, "[]", "utf-8");
  }
}

async function loadInquiries(): Promise<Contact[]> {
  await ensureInquiriesFile();
  const raw = await readFile(INQUIRIES_FILE, "utf-8");
  const parsed = JSON.parse(raw) as StoredContact[];
  return parsed.map((c) => ({
    ...c,
    createdAt: c.createdAt ? new Date(c.createdAt) : new Date(),
  }));
}

async function saveInquiries(contacts: Contact[]): Promise<void> {
  await ensureInquiriesFile();
  const serializable = contacts.map((c) => ({
    ...c,
    createdAt: c.createdAt ? new Date(c.createdAt).toISOString() : new Date().toISOString(),
  }));
  await writeFile(INQUIRIES_FILE, JSON.stringify(serializable, null, 2), "utf-8");
}

export class MemStorage implements IStorage {
  private users: Map<string, User>;
  private contactsCache: Contact[] | null = null;

  constructor() {
    this.users = new Map();
  }

  private async getContactList(): Promise<Contact[]> {
    if (!this.contactsCache) {
      this.contactsCache = await loadInquiries();
    }
    return this.contactsCache;
  }

  async getUser(id: string): Promise<User | undefined> {
    return this.users.get(id);
  }

  async getUserByUsername(username: string): Promise<User | undefined> {
    return Array.from(this.users.values()).find(
      (user) => user.username === username,
    );
  }

  async createUser(insertUser: InsertUser): Promise<User> {
    const id = randomUUID();
    const user: User = { ...insertUser, id };
    this.users.set(id, user);
    return user;
  }

  async createContact(insertContact: InsertContact): Promise<Contact> {
    const contacts = await this.getContactList();
    const contact: Contact = {
      ...insertContact,
      id: randomUUID(),
      formName: insertContact.formName ?? "Contact Form",
      createdAt: new Date(),
    };
    contacts.unshift(contact);
    this.contactsCache = contacts;
    await saveInquiries(contacts);
    return contact;
  }

  async getContacts(): Promise<Contact[]> {
    const contacts = await this.getContactList();
    return [...contacts].sort(
      (a, b) =>
        new Date(b.createdAt ?? 0).getTime() -
        new Date(a.createdAt ?? 0).getTime(),
    );
  }
}

export const storage = new MemStorage();
