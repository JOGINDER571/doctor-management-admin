import { useAdminContext } from "./context/AdminContext";
import { ToastContainer } from "react-toastify";
import Login from "./pages/Login";
import Navbar from "./components/Navbar";
import Sidebar from "./components/Sidebar";
import { Route, Routes } from "react-router-dom";
import Dashboard from "./pages/admin/Dashboard";
import Appointments from "./pages/admin/Appointments";
import AddDoctor from "./pages/admin/AddDoctor";
import DoctorList from "./pages/admin/DoctorList";
import { useDoctorContext } from "./context/DoctorContext";
import DoctorDashboard from "./pages/doctor/Dashboard";
import DoctorAppointments from "./pages/doctor/Appointments";
const App = () => {
  const { atoken } = useAdminContext();
  const { dtoken } = useDoctorContext();
  return atoken || dtoken ? (
    <div>
      <ToastContainer />
      <Navbar />
      <div className="flex items-start">
        <Sidebar />
        <Routes>
          {/* Admin Routes */}
          <Route path="/admin-dashboard" element={<Dashboard />} />
          <Route path="/all-appointments" element={<Appointments />} />
          {atoken && <Route path="/add-doctor" element={<AddDoctor />} />}
          {atoken && <Route path="/doctor-list" element={<DoctorList />} />}
          {/* Doctor Routes */}
          <Route path="/dashboard" element={<DoctorDashboard />} />
          <Route path="/appointments" element={<DoctorAppointments />} />
        </Routes>
      </div>
    </div>
  ) : (
    <div>
      <ToastContainer />
      <Login />
    </div>
  );
};

export default App;
