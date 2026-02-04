import { describe, expect, it } from "vitest";
import request from "supertest";
import path from "path";
import fs from "fs";
import { app } from "../index.js";

describe("generator upload integration", () => {
  it("uploads a spec and returns download URL", async () => {
    process.env.PUBLIC_DOWNLOADS = "true";

    const specPath = path.resolve(process.cwd(), "..", "test-openai.json");
    const res = await request(app)
      .post("/api/generator/upload")
      .attach("spec", fs.readFileSync(specPath), "test-openai.json");

    expect(res.status).toBe(200);
    expect(res.body.projectId).toBeTruthy();
    expect(res.body.downloadUrl).toMatch(/\/api\/generator\/download\//);

    const download = await request(app).get(res.body.downloadUrl);
    expect(download.status).toBe(200);
    expect(download.header["content-type"]).toContain("application/zip");
  });
});
