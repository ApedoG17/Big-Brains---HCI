import {
  BrowserRouter,
  Routes,
  Route
} from "react-router-dom";

import Navbar from "./components/Navbar";
import Footer from "./components/Footer";

import Home from "./pages/Home";
import About from "./pages/About";
import Services from "./pages/Services";
import Architects from "./pages/Architects";
import Login from "./pages/Login";
import Register from "./pages/Register";

// Consultation pages
import ConsultationBooking from "./pages/ConsultationBooking";
import MyConsultations from "./pages/MyConsultations";
import ConsultationDetails from "./pages/ConsultationDetails";

// Messaging & Notifications
import Inbox from "./pages/Inbox";
import Conversation from "./pages/Conversation";
import Notifications from "./pages/Notifications";

// Dashboards
import ClientDashboard from "./pages/dashboards/ClientDashboard";
import ArchitectDashboard from "./pages/dashboards/ArchitectDashboard";
import AdminDashboard from "./pages/dashboards/AdminDashboard";

// Authentication
import ProtectedRoute from "./auth/ProtectedRoute";

function App() {
  return (
    <BrowserRouter>

      <Navbar />

      <Routes>

        {/* Public Pages */}
        <Route path="/" element={<Home />} />

        <Route path="/about" element={<About />} />

        <Route path="/services" element={<Services />} />

        <Route path="/architects" element={<Architects />} />

        <Route path="/login" element={<Login />} />

        <Route path="/register" element={<Register />} />

        {/* Consultation Module */}
        <Route
          path="/consultation/book"
          element={<ConsultationBooking />}
        />

        <Route
          path="/my-consultations"
          element={<MyConsultations />}
        />

        <Route
          path="/consultations/:id"
          element={<ConsultationDetails />}
        />

        {/* Messaging & Notifications */}
        <Route
          path="/inbox"
          element={
            <ProtectedRoute>
              <Inbox />
            </ProtectedRoute>
          }
        />

        <Route
          path="/conversation/:id"
          element={
            <ProtectedRoute>
              <Conversation />
            </ProtectedRoute>
          }
        />

        <Route
          path="/notifications"
          element={
            <ProtectedRoute>
              <Notifications />
            </ProtectedRoute>
          }
        />

        {/* Dashboards */}
        <Route
          path="/client-dashboard"
          element={
            <ProtectedRoute>
              <ClientDashboard />
            </ProtectedRoute>
          }
        />

        <Route
          path="/architect-dashboard"
          element={
            <ProtectedRoute>
              <ArchitectDashboard />
            </ProtectedRoute>
          }
        />

        <Route
          path="/admin-dashboard"
          element={
            <ProtectedRoute>
              <AdminDashboard />
            </ProtectedRoute>
          }
        />

      </Routes>

      <Footer />

    </BrowserRouter>
  );
}

export default App;