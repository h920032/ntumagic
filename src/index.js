import React from "react";
import ReactDOM from "react-dom";
import { ThemeProvider } from "@mui/material";
import { BrowserRouter } from "react-router-dom";

import "./index.css";
import App from "./App";
import theme from "./styles/theme";

ReactDOM.render(
  <ThemeProvider theme={theme}>
    <BrowserRouter>
      <App />
    </BrowserRouter>
  </ThemeProvider>,
  document.getElementById("root")
);
