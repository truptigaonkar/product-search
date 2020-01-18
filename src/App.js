import React from "react";
import "./App.css";
import Productsearch from "./components/Productsearch";
import { AppBar, Typography, Container, Button, Link } from "@material-ui/core";

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
      <AppBar
        position="fixed"
        color="default"
        style={{ top: "auto", bottom: 0 }}
      >
        <Button color="primary">
          <Link
            href="https://truptigaonkar.github.io/portfolio/"
            color="inherit"
          >
            <b>Copyright &copy; Trupti Gaonkar's portfolio 2020</b>
          </Link>
        </Button>
      </AppBar>
    </div>
  );
}

export default App;
