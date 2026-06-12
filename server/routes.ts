import type { Express } from "express";
import { createServer, type Server } from "http";
import session from "express-session";
import createMemoryStore from "memorystore";
import { storage } from "./storage";
import { insertContactSchema, formSubmissionSchema } from "@shared/schema";
import { z } from "zod";
import { sendFormNotification } from "./emailService";
import { registerCmsRoutes } from "./cmsRoutes";
import { requireCmsAuth } from "./cmsAuth";

const MemoryStore = createMemoryStore(session);

function sessionCookieSecure(): boolean {
  // Secure cookies only work over HTTPS. Default off so localhost/http production works.
  return process.env.COOKIE_SECURE === "true";
}

export async function registerRoutes(app: Express): Promise<Server> {
  app.use(
    session({
      name: "shiv.cms.sid",
      secret:
        process.env.SESSION_SECRET || "shiv-cms-dev-secret-change-in-production",
      resave: false,
      saveUninitialized: false,
      store: new MemoryStore({ checkPeriod: 86400000 }),
      cookie: {
        secure: sessionCookieSecure(),
        httpOnly: true,
        maxAge: 7 * 24 * 60 * 60 * 1000,
        sameSite: "lax",
      },
    }),
  );

  registerCmsRoutes(app);
  app.post("/api/submit-form", async (req, res) => {
    try {
      const validatedData = formSubmissionSchema.parse(req.body);
      
      const contactData = {
        firstName: validatedData.firstName,
        lastName: validatedData.lastName,
        email: validatedData.email,
        phone: validatedData.phone,
        insuranceType: validatedData.insuranceType || "General Inquiry",
        message: validatedData.message,
        formName: validatedData.formName,
      };
      
      const contact = await storage.createContact(contactData);
      
      const emailResult = await sendFormNotification(validatedData);
      
      res.json({ 
        success: true, 
        message: "Thank you! Your message has been received. We'll get back to you shortly.",
        contact,
        emailSent: emailResult.success
      });
    } catch (error) {
      if (error instanceof z.ZodError) {
        res.status(400).json({ 
          success: false, 
          message: "Please check your form details and try again.", 
          errors: error.errors.map(e => ({ field: e.path.join('.'), message: e.message }))
        });
      } else {
        console.error('Form submission error:', error);
        res.status(500).json({ 
          success: false, 
          message: "Something went wrong. Please try again later." 
        });
      }
    }
  });

  app.post("/api/contacts", async (req, res) => {
    try {
      const validatedData = insertContactSchema.parse(req.body);
      const contact = await storage.createContact(validatedData);
      res.json({ success: true, contact });
    } catch (error) {
      if (error instanceof z.ZodError) {
        res.status(400).json({ 
          success: false, 
          message: "Invalid form data", 
          errors: error.errors 
        });
      } else {
        res.status(500).json({ 
          success: false, 
          message: "Failed to submit contact form" 
        });
      }
    }
  });

  app.get("/api/contacts", requireCmsAuth, async (req, res) => {
    try {
      const contacts = await storage.getContacts();
      res.json({ success: true, contacts });
    } catch (error) {
      res.status(500).json({ 
        success: false, 
        message: "Failed to retrieve contacts" 
      });
    }
  });

  const httpServer = createServer(app);
  return httpServer;
}
