import React, { useEffect, useState, useMemo } from "react";
import { useAdminContext } from "../../context/AdminContext";
import useLoading from "../../hooks/useLoading";
import { AdminService } from "../../services/AdminService";
import { toast } from "react-toastify";
import Loader from "../../components/Loader";

interface Appointments {
  id: number;
  name: string;
  userName: string;
  slotTime: string;
  slotDate: string;
  image: string;
  fees: number;
  dob: string;
  isCompleted: boolean;
  payment: boolean;
  cancelled: boolean;
}

const Appointments: React.FC = () => {
  const { atoken } = useAdminContext();
  const [appointmentData, setAppointmentData] = useState<Appointments[]>([]);
  const { loading, showLoader, hideLoader } = useLoading();

  useEffect(() => {
    fectchData();
  }, []);

  const fectchData = async () => {
    try {
      showLoader();
      const response = await AdminService.appointments(atoken);
      setAppointmentData(response.data.data);
    } catch (error: any) {
      toast.error(
        error.response.data.message || "Failed to fetch dashboard data"
      );
    } finally {
      hideLoader();
    }
  };

  const calculateAge = (dob: string) => {
    const birthDate = new Date(dob);
    const today = new Date();
    const ageDate = today.getFullYear() - birthDate.getFullYear();
    return ageDate < 0 ? 0 : ageDate;
  };

  const handleCancelAppointment = async (id: number) => {
    try {
      showLoader();
      const response = await AdminService.cancelAppointment(atoken, id);
      if (response.data.success) {
        // fetchDoctors();
        toast.success(
          response.data.message || "Appointment cancelled successfully"
        );
      }
    } catch (error: any) {
      toast.error(error.response?.data?.message || "Something went wrong");
    } finally {
      hideLoader();
      fectchData();
    }
  };

  return (
    <div className="p-4 sm:p-6 md:p-8 w-full">
      {loading && <Loader />}
      <h2 className="text-lg font-semibold mb-4">All Appointments</h2>

      <div className="overflow-x-auto bg-white shadow-sm rounded-lg border border-gray-400 min-h-100">
        <table className="min-w-full text-sm text-left whitespace-nowrap">
          <thead className="bg-gray-50 text-gray-700 font-medium border-b border-gray-400">
            <tr>
              <th className="px-4 py-4">#</th>
              <th className="px-4 py-4">Patient</th>
              {/* <th className="px-4 py-4">Department</th> */}
              <th className="px-4 py-4">Age</th>
              <th className="px-4 py-4">Date & Time</th>
              <th className="px-4 py-4">Doctor</th>
              <th className="px-4 py-4">Fees</th>
              <th className="px-4 py-4">Action</th>
            </tr>
          </thead>
          <tbody>
            {appointmentData.map((appt, index) => (
              <tr
                key={appt.id}
                className="border-b text-gray-600 font-medium border-gray-400 hover:bg-gray-50 transition"
              >
                <td className="px-4 py-4">{index + 1}</td>
                <td className="px-4 py-4">{appt.userName}</td>
                {/* <td className="px-4 py-4">{"appt.department"}</td> */}
                <td className="px-4 py-4">{calculateAge(appt.dob)}</td>
                <td className="px-4 py-4">
                  {appt.slotDate} | {appt.slotTime}
                </td>
                <td className="px-4 py-4 flex items-center gap-2">
                  <img
                    src={appt.image}
                    alt={appt.name}
                    className="w-8 h-8 rounded-full object-cover"
                  />
                  <span>{appt.name}</span>
                </td>
                <td className="px-4 py-4">{appt.fees}</td>
                <td className="px-4 py-4">
                  {appt.cancelled ? (
                    <span className="text-red-500">Cancelled</span>
                  ) : (
                    <button
                      onClick={() => handleCancelAppointment(appt.id)}
                      className="text-red-500 bg-red-100 hover:text-red-700 rounded-full p-1.5 transition cursor-pointer"
                    >
                      ❌
                    </button>
                  )}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default Appointments;
