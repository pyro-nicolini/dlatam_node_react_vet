import { createContext, useState, useEffect } from "react";
import axios from "axios";

export const myContext = createContext();

export const MyProvider = ({ children }) => {
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
  let id, nombre, edad, tipo, color, enfermedad;

  useEffect(() => {
    obtenerMensaje();
    obtenerData();
  }, []);


  const obtenerMensaje = async ()=> {
    try{
      const res = await axios.get("http://localhost:3000/");
      setMensaje(res.data);
    } catch (err) {
      console.log(err);
    }
  };

  const obtenerData = async () => {
    try {
      const res = await axios.get("http://localhost:3000" + url);
      setCitas(res.data);
    } catch (err) {
      console.log(err);
    }
  };


  const eliminarCita = async (i, id) => {
    try {
      const res = await axios.delete("http://localhost:3000" + url + "/" + id);
      alert("Eliminando a " + citas[i].nombre + " del registro " + citas[i].id);
      obtenerData();
    } catch (err) {
      console.log(err);
    };
  }

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

  const editarCita = async (id) => {
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
    try {
      const res = await axios.put("http://localhost:3000/citas/" + id, registro);
      obtenerData();
      setRegistro({
          id: "",
          nombre: "",
          edad: "",
          tipo: "",
          color: "",
          enfermedad: "",
        });
    } catch (err) {
      console.log(err);
    }
  }

  function handleChange(e) {
    const { name, value } = e.target;
    let nuevoRegistro = {
      ...registro,
      [name]: name === "id" || name === "edad" ? Number(value) : value,
    };
    if (value <= 0 || value == null) return;
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
      obtenerData();
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
    <myContext.Provider
      value={{
        mensaje,
        setMensaje,
        citas,
        setCitas,
        registro,
        setRegistro,
        id,
        nombre,
        edad,
        tipo,
        color,
        enfermedad,
        nuevaCita,
        handleChange,
        prepararCita,
        editarCita,
        eliminarCita,
      }}
    >
      {children}
    </myContext.Provider>
  );
};

export default MyProvider;
