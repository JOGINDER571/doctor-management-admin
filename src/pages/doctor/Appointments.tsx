import React, { useEffect, useState } from "react";
import useLoading from "../../hooks/useLoading";
import { toast } from "react-toastify";
import Loader from "../../components/Loader";
import { DoctorService } from "../../services/DoctorServices";
import { useDoctorContext } from "../../context/DoctorContext";

interface UserData {
  name: string;
  dob: string;
}

interface DocData {
  fees: number;
}
interface Appointment {
  id: number;
  slotTime: string;
  slotDate: string;
  isCompleted: boolean;
  payment: boolean;
  cancelled: boolean;
  userData: UserData;
  docData: DocData;
}

const DoctorAppointments: React.FC = () => {
  const { dtoken } = useDoctorContext();
  const [appointmentData, setAppointmentData] = useState<Appointment[]>([]);
  const { loading, showLoader, hideLoader } = useLoading();

  useEffect(() => {
    fectchData();
  }, []);

  const fectchData = async () => {
    try {
      showLoader();
      const response = await DoctorService.appointments(dtoken);
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
      const response = await DoctorService.cancelAppointment(dtoken, id);
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

  const handleCompleteAppointment = async (id: number) => {
    try {
      showLoader();
      const response = await DoctorService.completeAppointment(dtoken, id);
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
              <th className="px-4 py-4">Age</th>
              <th className="px-4 py-4">Date & Time</th>
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
                <td className="px-4 py-4">{appt?.userData.name}</td>
                <td className="px-4 py-4">
                  {calculateAge(appt?.userData.dob)}
                </td>
                <td className="px-4 py-4">
                  {appt.slotDate} | {appt.slotTime}
                </td>
                <td className="px-4 py-4">{appt?.docData.fees}</td>
                <td className="px-4 py-4">
                  {appt.cancelled ? (
                    <span className="text-red-500">Cancelled</span>
                  ) : appt.isCompleted ? <><span className="text-green-500">Complete</span></> : (
                    <>
                      <div className="flex items-center gap-2">
                        <button
                          onClick={() => handleCancelAppointment(appt.id)}
                          className="text-red-500 bg-red-100 hover:text-red-700 rounded-full p-1.5 transition cursor-pointer"
                        >
                          ❌
                        </button>
                        <button
                          onClick={() => handleCompleteAppointment(appt.id)}
                          className="text-red-500 bg-red-100 hover:text-red-700 rounded-full p-1.5 transition cursor-pointer"
                        >
                          ✔️
                        </button>
                      </div>
                    </>
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

export default DoctorAppointments;
