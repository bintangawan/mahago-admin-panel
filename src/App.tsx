import { Routes, Route, Navigate, Outlet } from "react-router-dom";
import AdminLayout from "@/layouts/AdminLayout";

/* =============================
   PAGES (YANG SUDAH ADA SAJA)
============================= */
import LoginPage from "@/pages/auth/LoginPage";
import DashboardPage from "@/pages/dashboard/DashboardPage";

// Drivers
import DriverVerificationPage from "@/pages/drivers/DriverVerificationPage";

// Topup
import TopupListPage from "@/pages/topup/TopupListPage";

import NotFound from "@/pages/NotFound";

/* =============================
   AUTH CHECK
============================= */
const isAuthenticated = () => {
  return Boolean(localStorage.getItem("access_token"));
};

/* =============================
   PROTECTED LAYOUT
============================= */
function ProtectedLayout() {
  if (!isAuthenticated()) {
    return <Navigate to="/inituhpageslogin" replace />;
  }

  return (
    <AdminLayout>
      <Outlet />
    </AdminLayout>
  );
}

export default function App() {
  return (
    <Routes>
      {/* =============================
          PUBLIC LOGIN
      ============================== */}
      <Route
        path="/inituhpageslogin"
        element={
          isAuthenticated() ? (
            <Navigate to="/" replace />
          ) : (
            <LoginPage />
          )
        }
      />

      {/* =============================
          ADMIN ROUTES (PROTECTED)
      ============================== */}
      <Route element={<ProtectedLayout />}>
        {/* Dashboard */}
        <Route path="/" element={<DashboardPage />} />

        {/* Driver */}
        <Route path="/drivers" element={<DriverVerificationPage />} />

        {/* Topup */}
        <Route path="/topup" element={<TopupListPage />} />
      </Route>

      {/* =============================
          FALLBACK
      ============================== */}
      <Route path="*" element={<NotFound />} />
    </Routes>
  );
}
