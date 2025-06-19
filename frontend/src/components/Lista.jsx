import { useContext } from "react";
import { myContext } from "../context/myContext";

const Lista = () => {
  const { citas, prepararCita, eliminarCita } = useContext(myContext);

  return (
    <div className="lista">
      <h2>citas de pacientes</h2>
      <table>
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
                <button onClick={() => prepararCita(i, cita.id)}>editar</button>
                <button onClick={() => eliminarCita(i, cita.id)}>x</button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default Lista;
