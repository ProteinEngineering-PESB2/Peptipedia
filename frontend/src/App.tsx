import { BrowserRouter } from "react-router-dom";
import { Toaster } from "react-hot-toast";
import { ThemeProvider, createTheme } from "@mui/material/styles";

import AppProvider from "./context/AppProvider";
// Pages
import Home from "./pages/home";
import Activities from "./pages/activities";
import Sources from "./pages/sources";
import Activity from "./pages/activity";
import Peptide from "./pages/peptide";
import Source from "./pages/source";
import AdvancedSearch from "./pages/search";
import Blast from "./pages/blast";
import ComingSoon from "./pages/coming_soon";
import NotFound from "./pages/not_found";
import DownloadPage from "./pages/download";

import { Routes, Route } from "react-router-loading";
import LoadingComponent from "./components/layout/loading";
import useHandlerBackendUrl from "./hooks/useHandlerBackendUrl";
import config from "./config.json";


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
              <Route path={config.activity.route} element={<Activity />} loading />
              <Route path={config.peptide.route} element={<Peptide />} loading />
              <Route path={config.source.route} element={<Source />} loading />
              <Route path={config.search.route} element={<AdvancedSearch />} loading />
              <Route path={config.alignment.route} element={<Blast />} loading />
              <Route path={config.download.route} element={<DownloadPage />} loading />
              <Route path={config.peptitools.route} element={<ComingSoon />} loading />
              <Route path="*" element={<NotFound />} loading />
            </Routes>
          </BrowserRouter>
          <Toaster />
        </>
      </ThemeProvider>
    </AppProvider>
  );
}
