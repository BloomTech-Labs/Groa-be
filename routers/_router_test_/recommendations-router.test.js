const db = require("../../database/dbConfig");
const request = require("supertest");
const server = require("../../api/server");

describe("Recommendation router", function () {
  it("runs the tests", function () {
    expect(true).toBe(true);
  });
  describe("test environment", function () {
    it("should use the test environment", function () {
      expect(process.env.DB_ENV).toBe("testing");
    });
  });
  beforeEach(async function () {
    await db.raw("TRUNCATE users RESTART IDENTITY CASCADE");
  });
  afterEach(async function () {
    await db.raw("TRUNCATE user_ratings RESTART IDENTITY CASCADE");
  });
  describe("GET /api/users/:id/recommended", function () {
    it("should return recommendations for a given user", async function () {
      await db.seed.run();
      await request(server).get("/api/users/3/recommended").expect(200);
    });
  });
  describe("GET /api/users/:id/recommendation-history", function () {
    it("should return recommendations for a given user", async function () {
      await db.seed.run();
      await request(server)
        .get("/api/users/3/recommendation-history")
        .expect(200);
    });
  });
});
