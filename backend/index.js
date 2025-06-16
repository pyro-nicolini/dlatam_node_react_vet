const express = require("express");
const cors = require("cors");
const app = express();
const fs = require("fs");
require("dotenv").config();

app.use(cors());
app.use(express.json());

// SI NO EXISTE LA DB LA CREAMOS
let citas = [
  {
    id: 1,
    nombre: "Luna",
    edad: 3,
    tipo: "gata",
    color: "gris",
    enfermedad: "pulgas",
  },
  {
    id: 2,
    nombre: "Max",
    edad: 7,
    tipo: "perro",
    color: "negro",
    enfermedad: "otitis",
  },
  {
    id: 3,
    nombre: "Coco",
    edad: 2,
    tipo: "loro",
    color: "verde",
    enfermedad: "pico descascarado",
  },
  {
    id: 4,
    nombre: "Nina",
    edad: 5,
    tipo: "coneja",
    color: "blanco",
    enfermedad: "ojos llorosos",
  },
  {
    id: 5,
    nombre: "Simba",
    edad: 4,
    tipo: "gato",
    color: "naranja",
    enfermedad: "infección urinaria",
  },
];

if (!fs.existsSync("citas.json", "uft8")) {
  fs.writeFileSync("citas.json", JSON.stringify(citas));
}

const PORT = process.env.PORT || 3000;

app.listen(PORT, () => {
  console.log(`Servidor backend escuchando en http://localhost:${PORT}`);
});

app.get("/", (req, res) => {
  res.send("Bienvenido a Veterinaria Online");
});

app.get("/lista", (req, res) => {
  citas = fs.readFileSync("citas.json");
  res.send(JSON.parse(citas));
});

app.post("/lista", (req, res) => {
  const nuevaCita = req.body;
  let data = fs.readFileSync("citas.json");
  citas = JSON.parse(data);
  citas.push(nuevaCita);
  fs.writeFileSync("citas.json", JSON.stringify(citas, null, 2));
  res.send(`Nueva cita `);
  console.log(`Nueva cita de ${nuevaCita.nombre}`);
});

app.put("/lista/:id", (req, res) => {
  const { id } = req.params;
  const modificacion = req.body;
  citas = JSON.parse(fs.readFileSync("citas.json", "utf-8"));

  citas = citas.map((c) => {
    if (c.id == id) {
      return { ...c, ...modificacion };
    } else {
      return { ...c };
    }
  });
  fs.writeFileSync("citas.json", JSON.stringify(citas, null, 2));
  res.send("actualizado con exito");
});

app.delete("/lista/:id", (req, res) => {
  const { id } = req.params;
  try {
    let citas = JSON.parse(fs.readFileSync("citas.json", "utf8"));
    const existe = citas.some((c) => c.id == id);
    if (!existe) {
      return res
        .status(404)
        .send(`No se encontró una cita con registro n° ${id}`);
    }
    citas = citas.filter((c) => c.id != id);
    fs.writeFileSync("citas.json", JSON.stringify(citas, null, 2));
    res.send(`cita numero de registro ${id} eliminada`);
  } catch (error) {
    console.error("Error al eliminar:", error);
    res.status(500).send("Error al eliminar cita");
  }
});
