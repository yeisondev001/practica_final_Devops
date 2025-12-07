const express = require("express");
const routes = require("./routes");
const app = express();

app.use(express.json());
app.use("/", routes);

// Solo arrancar cuando se ejecuta directamente (evita que Jest quede abierto)
if (require.main === module) {
  const PORT = process.env.PORT || 3000;
  app.listen(PORT, () => console.log(`Servidor corriendo en ${PORT}`));
}

module.exports = app;
