import type { Request, Response, NextFunction } from "express";
import jwt from "jsonwebtoken";
export const JWT_SECRET = "myJwtSecret";

export function authMiddleware(
  req: Request,
  res: Response,
  next: NextFunction,
) {
  try {
    const token = req.headers.authorization;
    const decodedInfo = jwt.verify(token as string, JWT_SECRET);
    //@ts-ignore
    req.userId = decodedInfo.id;
    next();
  } catch (e) {
    res.status(401).json({
      msg: "Invalid token",
    });
  }
}
