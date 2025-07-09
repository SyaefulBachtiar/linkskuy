import { Route, Routes } from "react-router-dom";
import Footer from "./components/Footer";
import LandingPageLayout from "./layouts/LandingPageLayout";
import "./css/style.css"
import Login from "./auth/Login";
import Daftar from "./auth/Daftar";
import TemplatePageLayout from "./layouts/TemplateLayout";
import LayananPageLayout from "./layouts/LayananPageLayout";
import ProtectedRoute from "./components/form-components/ProtectedRoute";
import Dashboard from "./layouts/LoginLayout/DashboardPageLayout";
import Coba from "./layouts/Coba";


function App() {
  return (
    <>
      <Routes>
        <Route path="/" element={<LandingPageLayout />} />
        <Route path="/login" element={<Login />} />
        <Route path="/daftar" element={<Daftar />} />
        <Route path="/template" element={<TemplatePageLayout />} />
        <Route path="/layanan" element={<LayananPageLayout />} />
        <Route path="/:displayName" element={<Dashboard />} />
        <Route
          path="/coba"
          element={
            <ProtectedRoute>
              <Coba />
            </ProtectedRoute>
          }
        />
        <Route
          path="/dashboard"
          element={
            <ProtectedRoute>
              <Dashboard />
            </ProtectedRoute>
          }
        />
      </Routes>
      <Footer />
    </>
  );
}

export default App;
