import { ThemeProvider } from "styled-components";
import { defaultTheme } from "./styles/themes/default.ts";

export function App() {
  return <ThemeProvider theme={defaultTheme}>Hello world!!</ThemeProvider>;
}
