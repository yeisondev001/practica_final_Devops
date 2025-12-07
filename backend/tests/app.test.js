const request = require("supertest");
const app = require("../src/index");
const db = require("../src/database");

afterAll((done) => {
  // cerrar la DB para que Jest termine correctamente
  db.close(done);
});

describe("GET /health", () => {
  test("responde OK", async () => {
    const res = await request(app).get("/health");
    expect(res.status).toBe(200);
    expect(res.body.status).toBe("ok");
  });
});
