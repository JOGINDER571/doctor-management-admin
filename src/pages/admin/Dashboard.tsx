import { useState, useEffect } from "react";
import { useAdminContext } from "../../context/AdminContext";
import { AdminService } from "../../services/AdminService";
import useLoading from "../../hooks/useLoading";
import { toast } from "react-toastify";
import Loader from "../../components/Loader";

interface Appointment {
  name: string;
  slotDate: string;
  image: string;
}

interface DashboardData {
  doctors: number;
  patient: number;
  totalAppointments: Appointment[];
}

const Dashboard = () => {
  const { atoken } = useAdminContext();
  const [dashboardData, setDashboardData] = useState<DashboardData>();
  const { loading, showLoader, hideLoader } = useLoading();

  useEffect(() => {
    fectchData();
  }, []);

  const fectchData = async () => {
    try {
      showLoader();
      const response = await AdminService.dashboard(atoken);
      setDashboardData(response.data.data);
    } catch (error: any) {
      toast.error(
        error.response.data.message || "Failed to fetch dashboard data"
      );
    } finally {
      hideLoader();
    }
  };

  const stats = [
    { label: "Doctors", count: dashboardData?.doctors ?? 0, icon: "👨‍⚕️" },
    {
      label: "Appointments",
      count: dashboardData?.totalAppointments?.length ?? 0,
      icon: "📅",
    },
    { label: "Patients", count: dashboardData?.patient ?? 0, icon: "🧑‍🤝‍🧑" },
  ];

  return (
    <div className="p-4 sm:p-6 md:p-8 space-y-6">
      {loading && <Loader />}
      {/* Stats Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
        {stats.map((stat, index) => (
          <div
            key={index}
            className="flex items-center gap-4 bg-white p-4 rounded-md shadow-md"
          >
            <div className="text-3xl">{stat.icon}</div>
            <div>
              <p className="text-xl font-semibold">{stat.count}</p>
              <p className="text-sm text-gray-600">{stat.label}</p>
            </div>
          </div>
        ))}
      </div>

      {/* Latest Appointments */}
      <div className="bg-white rounded-md shadow-md border py-2 mt-10 border-gray-300">
        <div className="border-b border-gray-400 px-4 py-3 flex items-center justify-between">
          <h3 className="text-md font-medium text-gray-800 flex items-center gap-2">
            <span className="text-blue-600 text-sm">🕒</span> Latest Appointment
          </h3>
        </div>

        <ul>
          {dashboardData?.totalAppointments?.map((appt, idx) => (
            <li
              key={idx}
              className="px-4 py-3 flex items-center justify-between hover:bg-gray-50 transition"
            >
              <div className="flex items-center gap-3">
                <img
                  src={appt.image}
                  alt={appt.name}
                  className="w-10 h-10 rounded-full object-cover"
                />
                <div>
                  <p className="font-medium text-gray-800">{appt.name}</p>
                  <p className="text-sm text-gray-500">{appt.slotDate}</p>
                </div>
              </div>
              {/* <button className="text-red-500 hover:text-red-700 bg-red-100 rounded-full p-1.5 transition">
                ❌
              </button> */}
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
};

export default Dashboard;
