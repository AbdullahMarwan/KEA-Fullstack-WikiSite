import request from "supertest";
import express from "express";
import setupRouters from "../../startup/setupRouters";
import { AppDataSource } from "../../startup/data-source";

const app = express();
app.use(express.json());
setupRouters(app);

beforeAll(async () => {
  if (!AppDataSource.isInitialized) {
    await AppDataSource.initialize();
  }
});

afterAll(async () => {
  if (AppDataSource.isInitialized) {
    await AppDataSource.destroy();
  }
});

describe("GET /api/content/all", () => {
  it("should return content array", async () => {
    const res = await request(app).get("/api/content/all");
    expect(res.statusCode).toBe(200);
    expect(Array.isArray(res.body)).toBe(true);
  });
});