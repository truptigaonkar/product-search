import React from "react";
import Style from "./App.module.css";
import Productsearch from "./components/Productsearch";

function App() {
  return (
    <div className={Style.container}>
      <Productsearch />
    </div>
  );
}

export default App;
