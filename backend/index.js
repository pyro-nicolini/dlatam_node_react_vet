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

app.get("/citas", (req, res) => {
  citas = JSON.parse(fs.readFileSync("citas.json"));
  citas.sort((a, b) => a.id - b.id);
  res.send(citas);
});

// app.post("/citas", (req, res) => {
//   const nuevaCita = req.body;
//   let data = fs.readFileSync("citas.json");
//   citas = JSON.parse(data);
//   citas.push(nuevaCita);
//   fs.writeFileSync("citas.json", JSON.stringify(citas, null, 2));
//   res.send(`Nueva cita `);
//   console.log(`Nueva cita de ${nuevaCita.nombre}`);
// });

app.post("/citas", (req, res) => {
  let data = fs.readFileSync("citas.json", "utf8");
  citas = JSON.parse(data);
  const nuevaCita = req.body;

  // Si ya existe ese ID, rechazamos la cita
  const idExiste = citas.some((c) => c.id == nuevaCita.id);
  if (idExiste) {
    return res
      .status(400)
      .send(`❌ Ya existe una cita con el ID ${nuevaCita.id}`);
  }

  // Si no hay ID o no es numérico, generamos uno automáticamente
  if (!nuevaCita.id || isNaN(nuevaCita.id)) {
    const ultimoId = citas.length > 0 ? Math.max(...citas.map((c) => c.id)) : 0;
    nuevaCita.id = ultimoId + 1;
  }

  citas.push(nuevaCita);
  fs.writeFileSync("citas.json", JSON.stringify(citas, null, 2));
  res.send(`✅ Nueva cita registrada con ID ${nuevaCita.id}`);
});

app.put("/citas/:id", (req, res) => {
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

app.delete("/citas/:id", (req, res) => {
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
