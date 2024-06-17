const fs = require("fs");
const path = require("path");

const filePath = path.join(__dirname, "..", "ubicacion.json");

module.exports = (req, res) => {
  if (req.method === "POST") {
    let body = "";
    req.on("data", (chunk) => {
      body += chunk.toString();
    });
    req.on("end", () => {
      const data = JSON.parse(body);
      const ubicacion = {
        id: 1,
        latitud: data.latitud,
        longitud: data.longitud,
        timestamp: new Date().toISOString(),
      };
      fs.writeFileSync(filePath, JSON.stringify(ubicacion, null, 2), "utf8");
      res.status(200).json({ message: "Ubicación actualizada" });
    });
  } else if (req.method === "GET") {
    fs.readFile(filePath, "utf8", (err, data) => {
      if (err) {
        res.status(500).send("Error al leer el archivo de ubicación");
        return;
      }
      res.json(JSON.parse(data));
    });
  } else {
    res.status(405).send("Método no permitido");
  }
};
