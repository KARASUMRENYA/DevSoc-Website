import type { Request, Response, NextFunction } from "express";
import { UNAUTHORIZED } from "../utils/http.js";
import { verifyAccessToken } from "../libs/jwt.js";

declare global {
  namespace Express {
    interface Request {
      auth?: {
        userId: string;
        role: "USER" | "ADMIN" | "SUBCOMMITTEE";
        sessionId?: string;
      };
    }
  }
}

export function verifyAuth(req: Request, res: Response, next: NextFunction) {
  try {
    const token =
      req.cookies?.access_token ||
      (req.headers.authorization?.startsWith("Bearer ")
        ? req.headers.authorization.split(" ")[1]
        : undefined);
    if (!token)
      return res.status(UNAUTHORIZED).json({ message: "Missing access token" });
    const payload = verifyAccessToken(token);
    if (payload.sid !== undefined) {
      req.auth = {
        userId: payload.sub,
        role: payload.role,
        sessionId: payload.sid,
      };
    } else {
      req.auth = { userId: payload.sub, role: payload.role };
    }
    next();
  } catch {
    return res
      .status(UNAUTHORIZED)
      .json({ message: "Invalid or expired access token" });
  }
}

export function verifyAdmin(
  req: Request,
  res: Response,
  next: NextFunction
) {
  if (req.auth?.role !== "ADMIN") {
    return res
      .status(UNAUTHORIZED)
      .json({ message: "Admin privileges required" });
  }
  next();
}

export function verifySubcommittee(
  req: Request,
  res: Response,
  next: NextFunction
) {
  if (req.auth?.role !== "SUBCOMMITTEE") {
    return res
      .status(UNAUTHORIZED)
      .json({ message: "Subcommittee privileges required" });
  }
  next();
}
