const request = require("supertest");
const app = require("../src/index");
const db = require("../src/database");

afterAll(async () => {
  // Cierra SQLite para evitar que Jest se quede colgado
  db.close();
});

describe("GET /health", () => {
  test("debe responder OK", async () => {
    const res = await request(app).get("/health");
    expect(res.status).toBe(200);
    expect(res.body.status).toBe("ok");
  });
});
