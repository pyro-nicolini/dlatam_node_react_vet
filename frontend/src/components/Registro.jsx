import { useContext } from "react";
import { myContext } from "../context/myContext";

function Registro() {
  const { citas, registro, nuevaCita, handleChange, editarCita } =
    useContext(myContext);
  return (
    <>
      <form>
          <strong>Ingreso paciente:</strong>
        <div>
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
            <button id="add" onClick={() => editarCita(registro.id)}>
              Guardar Cambios
            </button>
          ) : (
            <button id="add" onClick={nuevaCita}>Agregar</button>
          )}
        </div>
      </form>
    </>
  );
}

export default Registro;
