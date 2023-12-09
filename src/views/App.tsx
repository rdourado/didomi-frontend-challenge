import { SnackbarProvider } from "notistack";
import { Route, Routes, Navigate } from "react-router-dom";
import { ThemeProvider } from "@mui/material/styles";
import CssBaseline from "@mui/material/CssBaseline";
import theme from "../theme";
import DefaultLayout from "../components/layout/DefaultLayout";
import GiveConsent from "./GiveConsent";
import CollectedConsents from "./CollectedConsents";

function App() {
  return (
    <ThemeProvider theme={theme}>
      <CssBaseline enableColorScheme />
      <SnackbarProvider preventDuplicate />
      <Routes>
        <Route path="/" element={<DefaultLayout />}>
          <Route index element={<Navigate to="/give-consent" replace />} />
          <Route path="give-consent" element={<GiveConsent />} />
          <Route path="consents" element={<CollectedConsents />} />
        </Route>
      </Routes>
    </ThemeProvider>
  );
}

export default App;
