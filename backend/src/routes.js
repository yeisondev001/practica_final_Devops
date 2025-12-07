const express = require("express");
const router = express.Router();
const db = require("./database");

router.get("/items", (req, res) => {
  db.all("SELECT * FROM items", [], (err, rows) => {
    if (err) return res.status(500).json({ error: err });
    res.json(rows);
  });
});

router.post("/items", (req, res) => {
  const { name } = req.body;
  db.run("INSERT INTO items (name) VALUES (?)", [name], function (err) {
    if (err) return res.status(500).json({ error: err });
    res.json({ id: this.lastID, name });
  });
});

router.get("/health", (req, res) => {
  res.json({ status: "ok" });
});

module.exports = router;
