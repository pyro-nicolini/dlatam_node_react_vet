import "./App.css";
import axios from "axios";
import { useEffect, useState } from "react";

function App() {
  const [mensaje, setMensaje] = useState("");
  const [citas, setCitas] = useState([]);
  const [registro, setRegistro] = useState({
    id: "",
    nombre: "",
    edad: "",
    tipo: "",
    color: "",
    enfermedad: "",
  });

  let url = "/citas";

  useEffect(() => {
    axios
      .get("http://localhost:3000/")
      .then((res) => setMensaje(res.data))
      .catch((err) => console.log(err));
  }, []);

  const getData = () => {
    axios
      .get("http://localhost:3000" + url)
      .then((res) => setCitas(res.data))
      .catch((err) => console.log(err));
  };
  function eliminarCita(i, id) {
    axios.delete("http://localhost:3000" + url + "/" + id).then(() => {
      alert("Eliminando a " + citas[i].nombre + " del registro " + citas[i].id);
      getData();
    });
  }

  /* */

  function prepararCita(i, id) {
    const cita = citas[i];
    setRegistro({
      id: cita.id,
      nombre: cita.nombre,
      edad: cita.edad,
      tipo: cita.tipo,
      color: cita.color,
      enfermedad: cita.enfermedad,
    });
  }

  function editarCita(id) {
    // Validación: todos los campos deben estar llenos
    const camposVacios = Object.values(registro).some(
      (v) => v === "" || v === null
    );
    if (camposVacios) {
      alert(
        "❌ Por favor completa todos los campos antes de agregar una cita."
      );
      return;
    }
    axios
      .put("http://localhost:3000/citas/" + id, registro)
      .then(() => {
        getData();
        setRegistro({
          id: "",
          nombre: "",
          edad: "",
          tipo: "",
          color: "",
          enfermedad: "",
        });
      })
      .catch((err) => console.log(err));
  }

  /*
   */

  useEffect(() => {
    getData();
  }, []);

  function handleChange(e) {
    const { name, value } = e.target;

    let nuevoRegistro = {
      ...registro,
      [name]: name === "id" || name === "edad" ? Number(value) : value,
    };

    if (name === "id") {
      const citaExistente = citas.find((c) => c.id === Number(value));
      if (citaExistente) {
        nuevoRegistro = { ...citaExistente };
      }
    }

    setRegistro(nuevoRegistro);
  }

  function nuevaCita() {
    // Validación: todos los campos deben estar llenos
    const camposVacios = Object.values(registro).some(
      (v) => v === "" || v === null
    );
    if (camposVacios) {
      alert(
        "❌ Por favor completa todos los campos antes de agregar una cita."
      );
      return;
    }
    axios.post("http://localhost:3000" + url, registro).then(() => {
      getData();
      setRegistro({
        id: "",
        nombre: "",
        edad: "",
        tipo: "",
        color: "",
        enfermedad: "",
      });
    });
  }

  return (
    <>
      <h1>{mensaje}</h1>

      <form>
        <div
          style={{
            display: "flex",
            flexDirection: "column",
            gap: ".5rem",
            width: "100%",
            alignItems: "start",
            justifyContent: "start",
          }}
        >
          <div>
            {["id", "nombre", "edad", "tipo", "color", "enfermedad"].map(
              (nombreDelIndice) => (
                <label key={nombreDelIndice} htmlFor={nombreDelIndice}>
                  {nombreDelIndice}:
                  <input
                    type="text"
                    name={nombreDelIndice}
                    placeholder={nombreDelIndice}
                    value={registro[nombreDelIndice]}
                    onChange={handleChange}
                  />
                </label>
              )
            )}
          </div>
          {citas.some((c) => c.id == registro.id) ? (
            <button onClick={() => editarCita(registro.id)}>
              Guardar Cambios
            </button>
          ) : (
            <button onClick={nuevaCita}>Agregar</button>
          )}
        </div>
      </form>

      <div
        style={{
          display: "flex",
          justifyContent: "center",
          flexDirection: "column",
          alignItems: "center",
        }}
      >
        <h2>citas de pacientes</h2>
        <table
          style={{
            background: "lightblue",
            color: "black",
            padding: "1rem",
            borderRadius: "1rem",
          }}
        >
          <thead>
            <tr>
              <th>ID</th>
              <th>Paciente</th>
              <th>Edad</th>
              <th>Tipo</th>
              <th>Color</th>
              <th>Síntoma</th>
            </tr>
          </thead>
          <tbody id="cuerpo"></tbody>
          <tbody>
            {citas.map((cita, i) => (
              <tr key={cita.id}>
                <th scope="row">{cita.id}</th>
                <td>{cita.nombre}</td>
                <td>{cita.edad}</td>
                <td>{cita.tipo}</td>
                <td>{cita.color}</td>
                <td>{cita.enfermedad}</td>
                <td>
                  <button onClick={() => prepararCita(i, cita.id)}>
                    editar
                  </button>
                  <button onClick={() => eliminarCita(i, cita.id)}>x</button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </>
  );
}

export default App;