import type { Request, Response, NextFunction } from "express";
import { timingSafeEqual } from "crypto";
import { cmsLoginSchema } from "@shared/cms-schema";

declare module "express-session" {
  interface SessionData {
    cmsAuthenticated?: boolean;
    cmsUsername?: string;
  }
}

function getCmsCredentials(): { username: string; password: string } | null {
  const username = process.env.CMS_USERNAME?.trim();
  const password = process.env.CMS_PASSWORD;
  if (!username || !password) {
    return null;
  }
  return { username, password };
}

function safeCompare(a: string, b: string): boolean {
  const bufA = Buffer.from(a);
  const bufB = Buffer.from(b);
  if (bufA.length !== bufB.length) return false;
  return timingSafeEqual(bufA, bufB);
}

export function requireCmsAuth(req: Request, res: Response, next: NextFunction) {
  if (req.session?.cmsAuthenticated) {
    return next();
  }
  res.status(401).json({ success: false, message: "Authentication required" });
}

export function cmsLoginHandler(req: Request, res: Response) {
  try {
    const { username, password } = cmsLoginSchema.parse(req.body);
    const expected = getCmsCredentials();
    if (!expected) {
      return res.status(503).json({
        success: false,
        message: "CMS login is not configured. Set CMS_USERNAME and CMS_PASSWORD on the server.",
      });
    }
    if (
      safeCompare(username.trim(), expected.username) &&
      safeCompare(password, expected.password)
    ) {
      req.session.cmsAuthenticated = true;
      req.session.cmsUsername = username.trim();
      return req.session.save((err) => {
        if (err) {
          return res.status(500).json({ success: false, message: "Session error" });
        }
        res.json({ success: true, username: username.trim() });
      });
    }
    res.status(401).json({ success: false, message: "Invalid credentials" });
  } catch {
    res.status(400).json({ success: false, message: "Invalid login data" });
  }
}

export function cmsLogoutHandler(req: Request, res: Response) {
  req.session.destroy((err) => {
    if (err) {
      return res.status(500).json({ success: false, message: "Logout failed" });
    }
    res.clearCookie("shiv.cms.sid");
    res.json({ success: true });
  });
}

export function cmsMeHandler(req: Request, res: Response) {
  if (req.session?.cmsAuthenticated) {
    return res.json({
      success: true,
      authenticated: true,
      username: req.session.cmsUsername,
    });
  }
  res.status(401).json({ success: false, authenticated: false });
}
