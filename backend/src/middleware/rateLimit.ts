import rateLimit from "express-rate-limit";

const uploadWindowMs = Number(process.env.UPLOAD_RATE_WINDOW_MS || 15 * 60 * 1000);
const uploadMax = Number(process.env.UPLOAD_RATE_MAX || 30);

const downloadWindowMs = Number(
  process.env.DOWNLOAD_RATE_WINDOW_MS || 15 * 60 * 1000
);
const downloadMax = Number(process.env.DOWNLOAD_RATE_MAX || 120);

export const uploadLimiter = rateLimit({
  windowMs: uploadWindowMs,
  max: uploadMax,
  standardHeaders: "draft-7",
  legacyHeaders: false
});

export const downloadLimiter = rateLimit({
  windowMs: downloadWindowMs,
  max: downloadMax,
  standardHeaders: "draft-7",
  legacyHeaders: false
});
