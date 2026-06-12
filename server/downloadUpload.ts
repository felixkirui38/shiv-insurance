import { existsSync, mkdirSync } from "fs";
import { dirname, join, extname, basename } from "path";
import { fileURLToPath } from "url";
import multer from "multer";

const ALLOWED_EXTENSIONS = new Set([
  ".pdf",
  ".doc",
  ".docx",
  ".xls",
  ".xlsx",
  ".png",
  ".jpg",
  ".jpeg",
]);

const MAX_FILE_BYTES = 25 * 1024 * 1024;

export function getDownloadsUploadDir(): string {
  const serverFile = fileURLToPath(import.meta.url).replace(/\\/g, "/");
  if (serverFile.includes("/dist/")) {
    return join(dirname(serverFile), "public", "downloads");
  }
  return join(dirname(serverFile), "..", "client", "public", "downloads");
}

function uniqueFilename(dir: string, filename: string): string {
  if (!existsSync(join(dir, filename))) return filename;
  const ext = extname(filename);
  const stem = basename(filename, ext);
  let counter = 1;
  let candidate = `${stem} (${counter})${ext}`;
  while (existsSync(join(dir, candidate))) {
    counter += 1;
    candidate = `${stem} (${counter})${ext}`;
  }
  return candidate;
}

function sanitizeFilename(name: string): string {
  return name.replace(/[^a-zA-Z0-9._ ()-]/g, "_").trim() || "document";
}

export function formatFileSizeLabel(bytes: number): string {
  if (bytes < 1024) return `${bytes} B`;
  if (bytes < 1024 * 1024) return `${Math.round(bytes / 1024)} KB`;
  return `${(bytes / (1024 * 1024)).toFixed(1)} MB`;
}

const storage = multer.diskStorage({
  destination(_req, _file, cb) {
    const dir = getDownloadsUploadDir();
    mkdirSync(dir, { recursive: true });
    cb(null, dir);
  },
  filename(_req, file, cb) {
    const dir = getDownloadsUploadDir();
    const safe = sanitizeFilename(file.originalname);
    cb(null, uniqueFilename(dir, safe));
  },
});

export const downloadUpload = multer({
  storage,
  limits: { fileSize: MAX_FILE_BYTES },
  fileFilter(_req, file, cb) {
    const ext = extname(file.originalname).toLowerCase();
    if (!ALLOWED_EXTENSIONS.has(ext)) {
      cb(new Error("Unsupported file type. Use PDF, Word, Excel, or image files."));
      return;
    }
    cb(null, true);
  },
});
