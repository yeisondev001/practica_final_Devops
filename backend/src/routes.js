const express = require("express");
const router = express.Router();
const db = require("./database");

// ========================
// RUTA HEALTHCHECK
// ========================
router.get("/health", (req, res) => {
  return res.status(200).json({ status: "ok" });
});

// ========================
// CREAR ITEM  (POST)
// ========================
router.post("/items", (req, res) => {
  const { name } = req.body;

  if (!name) {
    return res.status(400).json({ error: "Name es requerido" });
  }

  const query = "INSERT INTO items (name) VALUES (?)";

  db.run(query, [name], function (err) {
    if (err) return res.status(500).json({ error: err.message });

    return res.status(201).json({
      id: this.lastID,
      name,
    });
  });
});

// ========================
// LISTAR ITEMS (GET)
// ========================
router.get("/items", (req, res) => {
  const query = "SELECT * FROM items";

  db.all(query, [], (err, rows) => {
    if (err) return res.status(500).json({ error: err.message });

    return res.status(200).json(rows);
  });
});

// ========================
// ELIMINAR ITEM (DELETE)
// ========================
router.delete("/items/:id", (req, res) => {
  const { id } = req.params;

  const query = "DELETE FROM items WHERE id = ?";

  db.run(query, [id], function (err) {
    if (err) return res.status(500).json({ error: err.message });

    if (this.changes === 0) {
      return res.status(404).json({ error: "Item no encontrado" });
    }

    return res.status(200).json({ message: "Item eliminado" });
  });
});

module.exports = router;
