import React from "react";
import "./App.css";
import Productsearch from "./components/Productsearch";
import { AppBar, Typography, Container } from "@material-ui/core";

function App() {
  return (
    <div className="App">
      <AppBar position="static">
        <Typography variant="h5" color="secondary">
          PRODUCT SEARCH
        </Typography>
      </AppBar>
      <br />
      <Container>
        <Productsearch />
      </Container>
    </div>
  );
}

export default App;
