import { useRoutes } from "react-router-dom";
import { Provider } from "react-redux";
import { create } from "jss";
import { ThemeProvider } from "styled-components/macro";
import AdapterDateFns from "@material-ui/lab/AdapterDateFns";
import LocalizationProvider from "@material-ui/lab/LocalizationProvider";

import { ThemeProvider as MuiThemeProvider } from "@material-ui/core/styles";
import StylesProvider from "@material-ui/styles/StylesProvider";
import jssPreset from "@material-ui/styles/jssPreset";

import createTheme from "./theme";
import routes from "./routes";

import useTheme from "./hooks/useTheme";
import { store } from "./redux/store";

import { AuthProvider } from "./contexts/JWTContext";

const jss = create({
  ...jssPreset(),
  insertionPoint: document.getElementById("jss-insertion-point")!,
});

function App() {
  const content = useRoutes(routes);

  const { theme } = useTheme();

  return (
    <Provider store={store}>
      <StylesProvider jss={jss}>
        {/* @ts-ignore */}
        <LocalizationProvider dateAdapter={AdapterDateFns}>
          <MuiThemeProvider theme={createTheme(theme)}>
            <ThemeProvider theme={createTheme(theme)}>
              <AuthProvider>{content}</AuthProvider>
            </ThemeProvider>
          </MuiThemeProvider>
        </LocalizationProvider>
      </StylesProvider>
    </Provider>
  );
}

export default App;
