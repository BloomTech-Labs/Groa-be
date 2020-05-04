const db = require("../database/dbConfig.js");
const request = require("supertest");
const server = require("../api/server.js");

beforeEach(async function() {
  await db.raw("TRUNCATE users RESTART IDENTITY CASCADE");
});
afterEach(async function() {
  await db.raw("TRUNCATE user_watchlist RESTART IDENTITY CASCADE");
});

describe("POST /users/:user_id/add-to-watchlist", () => {
  it("adds a new movie to watchlist returns with a 201", async () => {
    await db.seed.run();
    const res = await request(server)
      .post("/api/users/1/add-to-watchlist")
      .send({
        name: "American Psycho",
        year: 2000
      });

    expect(res.status).toBe(201);
  });
});

describe("GET /users/:user_id/get-watchlist", () => {
  it("gets all user's watchlist with posters", async () => {
    await db.seed.run();
    const res = await request(server).get("/api/users/3/get-watchlist");

    expect(res.status).toBe(200);
  });
});

describe("/DELETE /:user_id/remove-from-watchlist/:watchlist_id", () => {
  it("successfully deletes a movie from the watchlist returns 200 ok", async () => {
    await request(server)
      .post("/api/users/1/add-to-watchlist")
      .send({
        name: "American Psycho",
        year: 2000
      });

    const res = await request(server).delete(
      "/api/users/1/remove-from-watchlist/1"
    );

    expect(res.status).toBe(200);
  });
});
