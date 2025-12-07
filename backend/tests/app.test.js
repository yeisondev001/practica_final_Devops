const request = require("supertest");
const app = require("../src/index");

describe("GET /health", () => {
  test("debe responder OK", async () => {
    const res = await request(app).get("/health");
    expect(res.statusCode).toBe(200);
    expect(res.body.status).toBe("ok");
  });
});
