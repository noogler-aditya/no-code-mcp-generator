import request from "supertest";
import { describe, expect, it } from "vitest";
import { app } from "../index.js";

describe("health endpoints", () => {
  it("returns ok for /health", async () => {
    const res = await request(app).get("/health");
    expect(res.status).toBe(200);
    expect(res.body.status).toBe("ok");
  });

  it("returns ready for /ready", async () => {
    const res = await request(app).get("/ready");
    expect(res.status).toBe(200);
    expect(res.body.status).toBe("ready");
  });
});
