import { createTheme, ThemeProvider } from "@mui/material/styles";
import { createContext, type ReactNode, useState, useMemo, useContext } from "react";

type ThemeMode = "light" | "dark";
type ThemeContextType = { mode: ThemeMode; toggle: () => void };

const defaultMode: ThemeMode = (localStorage.getItem("tm_theme") as ThemeMode) || "light";
const ThemeContext = createContext<ThemeContextType>({ mode: defaultMode, toggle: () => {} });

export function ThemeProviderWrapper({ children }: { children: ReactNode }) {
  const [mode, setMode] = useState<ThemeMode>(defaultMode);

  const toggle = () => {
    const next = mode === "light" ? "dark" : "light";
    setMode(next);
    localStorage.setItem("tm_theme", next);
  };

  const theme = useMemo(
    () =>
      createTheme({
        palette: {
          mode,
          ...(mode === "dark"
            ? {
                background: { default: "#0f1724", paper: "#0b1220" },
              }
            : {}),
        },
        components: {
          MuiAppBar: {
            defaultProps: { elevation: 0 },
          },
        },
      }),
    [mode]
  );

  return (
    <ThemeContext.Provider value={{ mode, toggle }}>
      <ThemeProvider theme={theme}>{children}</ThemeProvider>
    </ThemeContext.Provider>
  );
}

export const useThemeMode = () => useContext(ThemeContext);
