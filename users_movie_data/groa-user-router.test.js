const db = require("../database/dbConfig.js");
const request = require("supertest");
const server = require("../api/server.js");

beforeEach(async function() {
  await db.raw("TRUNCATE users RESTART IDENTITY CASCADE");
});
afterEach(async function() {
  await db.raw("TRUNCATE user_ratings RESTART IDENTITY CASCADE");
});

describe("POST /users/:user_id/add-movie-rating", () => {
  it("adds a new movie rating and gives a success message", async () => {
    await db.seed.run();
    const res = await request(server)
      .post("/api/users/1/add-movie-rating")
      .send({
        name: "American Psycho",
        year: 2000,
        rating: 3
      });

    expect(res.status).toBe(201);
    expect(res.body.name).toBe("American Psycho");
  });
});

describe("GET /users/:user_id/get-ratings", () => {
  it("gets all users rated movies with posters", async () => {
    await db.seed.run();
    const res = await request(server).get("/api/users/3/get-ratings");

    expect(res.status).toBe(200);
  });
});
