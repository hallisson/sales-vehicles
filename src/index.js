import "react-app-polyfill/stable";
import ReactDOM from "react-dom";
import { BrowserRouter } from "react-router-dom";

import reportWebVitals from "./utils/reportWebVitals";
import App from "./App";

import { ThemeProvider } from "./contexts/ThemeContext";
import "./mocks";


ReactDOM.render(
  <BrowserRouter>
    <ThemeProvider>
      <App />
    </ThemeProvider>
  </BrowserRouter>,
  document.getElementById("root")
);

reportWebVitals();
