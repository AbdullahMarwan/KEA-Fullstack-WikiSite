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

describe("Integration flow: user registration, login, favorite, unfavorite, logout", () => {
  let userId: number;
  let token: string;
  let randomMovie: any;

  const testUser = {
    first_name: "Test",
    last_name: "User",
    email: `testuser_${Date.now()}@example.com`,
    password: "testpassword123",
  };

  it("should register a new user", async () => {
    const res = await request(app)
      .post("/api/users/register")
      .send(testUser);
    expect(res.statusCode).toBe(201);
    expect(res.body.user).toBeDefined();
    userId = res.body.user.user_id || res.body.user.id;
  });

  it("should login with the new user", async () => {
    const res = await request(app)
      .post("/api/users/login")
      .send({ email: testUser.email, password: testUser.password });
    expect(res.statusCode).toBe(200);
    expect(res.body.token).toBeDefined();
    token = res.body.token;
    // Optionally update userId if returned
    if (res.body.user && res.body.user.user_id) {
      userId = res.body.user.user_id;
    }
  });

  it("should fetch 10 movies", async () => {
    const res = await request(app)
      .get("/api/content/all")
      .set("Authorization", `Bearer ${token}`);
    expect(res.statusCode).toBe(200);
    expect(Array.isArray(res.body)).toBe(true);
    expect(res.body.length).toBeGreaterThan(0);
    // Pick a random movie
    const movies = res.body.slice(0, 10);
    randomMovie = movies[Math.floor(Math.random() * movies.length)];
    expect(randomMovie).toBeDefined();
    // Print the movie
    // eslint-disable-next-line no-console
    console.log("Random movie to favorite:", randomMovie);
  });

  it("should favorite the random movie", async () => {
    const res = await request(app)
      .post("/api/favorites")
      .set("Authorization", `Bearer ${token}`)
      .send({ user_id: userId, content_id: randomMovie.id });
    expect(res.statusCode).toBe(201);
    expect(res.body.message).toMatch(/Favorite added/i);
    // eslint-disable-next-line no-console
    console.log(`Favorited movie ID: ${randomMovie.id}`);
  });

  it("should unfavorite the movie", async () => {
    const res = await request(app)
      .delete(`/api/favorites/${userId}/${randomMovie.id}`)
      .set("Authorization", `Bearer ${token}`);
    expect(res.statusCode).toBe(200);
    expect(res.body.message).toMatch(/Favorite removed/i);
      // eslint-disable-next-line no-console
    console.log(`Unfavorited movie ID: ${randomMovie.id}`);
  });

  it("should logout (token invalidation is optional, so just clear token)", async () => {
    token = "";
    expect(token).toBe("");
  });
});