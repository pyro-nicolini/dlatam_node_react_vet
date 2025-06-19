import "./App.css";
import { useContext } from "react";
import { myContext } from "./context/myContext.jsx";
import Lista from "./components/lista.jsx";
import Registro from "./components/Registro.jsx";

function App() {
  const {
    mensaje,
  } = useContext(myContext);

  return (
    <>
      <h1>{mensaje}</h1>
      <Registro/>
      <Lista/>
    </>
  );
}

export default App;
