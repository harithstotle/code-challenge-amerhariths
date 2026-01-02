import { Request, Response, NextFunction } from "express";

export interface AuthenticatedRequest extends Request {
  user?: {
    id: string;
    role: "user" | "admin";
  };
}

export function requireAuth(
  req: AuthenticatedRequest,
  res: Response,
  next: NextFunction
) {
  const authHeader = req.headers.authorization;

  if (!authHeader) {
    return res.status(401).json({ error: "Unauthorized" });
  }

  // Simulated token validation
  if (authHeader !== "Bearer valid-token") {
    return res.status(403).json({ error: "Forbidden" });
  }

  req.user = {
    id: "user-123",
    role: "user",
  };

  next();
}
