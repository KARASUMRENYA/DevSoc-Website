import {Router} from "express";

const newsletterRouter = Router();

import {
  createNewsletter,
  getNewsletters,
  getNewsletterById,
  updateNewsletter,
  deleteNewsletter,
} from "../controller/newsletter.controller.js";

import { verifyAuth } from "../middleware/auth.middleware.js";

newsletterRouter.post("/", verifyAuth, createNewsletter);
newsletterRouter.get("/", getNewsletters);
newsletterRouter.get("/:id", getNewsletterById);
newsletterRouter.patch("/:id", verifyAuth, updateNewsletter);
newsletterRouter.delete("/:id", verifyAuth, deleteNewsletter);

export default newsletterRouter;