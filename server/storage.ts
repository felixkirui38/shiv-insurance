import { desc, eq } from "drizzle-orm";
import { type User, type InsertUser, type Contact, type InsertContact, users, contacts } from "@shared/schema";
import { randomUUID } from "crypto";
import { db } from "./db";

export interface IStorage {
  getUser(id: string): Promise<User | undefined>;
  getUserByUsername(username: string): Promise<User | undefined>;
  createUser(user: InsertUser): Promise<User>;
  createContact(contact: InsertContact): Promise<Contact>;
  getContacts(): Promise<Contact[]>;
}

export class DatabaseStorage implements IStorage {
  async getUser(id: string): Promise<User | undefined> {
    const [user] = await db.select().from(users).where(eq(users.id, id)).limit(1);
    return user;
  }

  async getUserByUsername(username: string): Promise<User | undefined> {
    const [user] = await db
      .select()
      .from(users)
      .where(eq(users.username, username))
      .limit(1);
    return user;
  }

  async createUser(insertUser: InsertUser): Promise<User> {
    const id = randomUUID();
    const [user] = await db
      .insert(users)
      .values({ ...insertUser, id })
      .returning();
    return user;
  }

  async createContact(insertContact: InsertContact): Promise<Contact> {
    const id = randomUUID();
    const [contact] = await db
      .insert(contacts)
      .values({
        ...insertContact,
        id,
        formName: insertContact.formName ?? "Contact Form",
      })
      .returning();
    return {
      ...contact,
      insuranceType: contact.insuranceType ?? "General Inquiry",
      formName: contact.formName ?? "Contact Form",
    };
  }

  async getContacts(): Promise<Contact[]> {
    const rows = await db.select().from(contacts).orderBy(desc(contacts.createdAt));

    return rows.map((contact) => ({
      ...contact,
      insuranceType: contact.insuranceType ?? "General Inquiry",
      formName: contact.formName ?? "Contact Form",
    }));
  }
}

export const storage = new DatabaseStorage();
