import "./App.css";
import axios from "axios";
import { useEffect, useState } from "react";

function App() {
  const [mensaje, setMensaje] = useState("");
  const [lista, setLista] = useState([]);
  const [registro, setRegistro] = useState({
    id: "",
    nombre: "",
    edad: "",
    tipo: "",
    color: "",
    enfermedad: "",
  });
  
  let url = "/lista";
  
  const { id, nombre, edad, tipo, color, enfermedad } = registro;

  useEffect(() => {
    axios
      .get("http://localhost:3000/")
      .then((res) => setMensaje(res.data))
      .catch((err) => console.log(err));
  }, []);

  const getData = () => {
    axios
      .get("http://localhost:3000" + url)
      .then((res) => setLista(res.data))
      .catch((err) => console.log(err));
  };



  useEffect(() => {
    getData();
  }, []);

  function handleChange(e) {
    setRegistro({ ...registro, [e.target.name]: e.target.value });
  }

  function nuevaCita() {
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
      <div
        style={{
          display: "flex",
          flexDirection: "column",
          gap: "1rem",
          width: "100%",
        }}
      >
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

        <button type="submit" onClick={nuevaCita}>
          Agregar
        </button>
      </div>

      <div
        style={{
          display: "flex",
          justifyContent: "center",
          flexDirection: "column",
          alignItems: "center",
        }}
      >
        <h1>{mensaje}</h1>
        <h2>Lista de pacientes</h2>
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
            {lista.map((cita) => (
              <tr key={cita.id}>
                <th scope="row">{cita.id}</th>
                <td>{cita.nombre}</td>
                <td>{cita.edad}</td>
                <td>{cita.tipo}</td>
                <td>{cita.color}</td>
                <td>{cita.enfermedad}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </>
  );
}

export default App;
