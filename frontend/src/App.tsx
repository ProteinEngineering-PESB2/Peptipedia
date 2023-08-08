import { BrowserRouter } from "react-router-dom";
import { Toaster } from "react-hot-toast";
import { ThemeProvider, createTheme } from "@mui/material/styles";

import AppProvider from "./context/AppProvider";
// Pages
import Home from "./pages/home";
import Activities from "./pages/activities";
import Sources from "./pages/sources";


import { Routes, Route } from "react-router-loading";
import LoadingComponent from "./components/layout/loading";
import useHandlerBackendUrl from "./hooks/useHandlerBackendUrl";
import config from "./config.json"

export default function App() {
  const theme = createTheme();
  useHandlerBackendUrl();
  //For to add a new page, you create a component in pages folder, and bind it to the route in config.json file
  return (
    <AppProvider>
      <ThemeProvider theme={theme}>
        <>
          <BrowserRouter>
            <Routes loadingScreen={LoadingComponent}>
              <Route path={config.home.route} element={<Home />} loading />
              <Route path={config.activities.route} element={<Activities />} loading />
              <Route path={config.sources.route} element={<Sources />} loading />
            </Routes>
          </BrowserRouter>
          <Toaster />
        </>
      </ThemeProvider>
    </AppProvider>
  );
}
