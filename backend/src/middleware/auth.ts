import type { NextFunction, Request, Response } from "express";

export function requireApiKey(req: Request, res: Response, next: NextFunction) {
  const expected = process.env.GENERATOR_API_KEY;
  if (!expected) {
    return next();
  }

  const authHeader = req.get("authorization");
  const bearer = authHeader?.startsWith("Bearer ")
    ? authHeader.slice("Bearer ".length)
    : undefined;
  const apiKey = bearer || req.get("x-api-key");

  if (apiKey && apiKey === expected) {
    return next();
  }

  return res.status(401).json({ error: "Unauthorized" });
}

export function maybeRequireDownloadAuth(
  req: Request,
  res: Response,
  next: NextFunction
) {
  const publicDownloads = process.env.PUBLIC_DOWNLOADS === "true";
  if (publicDownloads) {
    return next();
  }
  return requireApiKey(req, res, next);
}
