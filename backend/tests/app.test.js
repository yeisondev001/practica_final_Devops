const request = require("supertest");
const app = require("../src/index");
const db = require("../src/database");

let createdId = null;

afterAll((done) => {
  db.close(done);
});

// ================================================
// PRUEBA 1: Crear un item
// ================================================
describe("POST /items", () => {
  test("Crea un item correctamente", async () => {
    const res = await request(app)
      .post("/items")
      .send({ name: "Item de prueba" });

    expect(res.status).toBe(201);
    expect(res.body.id).toBeDefined();
    expect(res.body.name).toBe("Item de prueba");

    createdId = res.body.id; // Guardar ID para pruebas siguientes
  });
});

// ================================================
// PRUEBA 2: Obtener todos los items
// ================================================
describe("GET /items", () => {
  test("Debe devolver una lista de items", async () => {
    const res = await request(app).get("/items");

    expect(res.status).toBe(200);
    expect(Array.isArray(res.body)).toBe(true);
  });
});

// ================================================
// PRUEBA 3: Eliminar item creado
// ================================================
describe("DELETE /items/:id", () => {
  test("Debe eliminar un item", async () => {
    const res = await request(app).delete(`/items/${createdId}`);

    expect(res.status).toBe(200);
    expect(res.body.message).toBe("Item eliminado");
  });
});
