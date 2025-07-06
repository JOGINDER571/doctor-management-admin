import { useEffect } from "react";
import useLoading from "../../hooks/useLoading";
import Loader from "../../components/Loader";
import { useAdminContext } from "../../context/AdminContext";
import { AdminService } from "../../services/AdminService";
import { toast } from "react-toastify";

const DoctorList = () => {
  const { loading, showLoader, hideLoader } = useLoading();
  const { atoken, doctors, setDoctors } = useAdminContext();

  const fetchDoctors = async () => {
    try {
      showLoader();
      const response = await AdminService.getDoctors(atoken);
      if (response.data.data?.length > 0) {
        setDoctors(response.data.data);
      }
    } catch (error: any) {
      if (error?.response?.data.message) {
        toast.error(error.response?.data.message);
      } else {
        toast.error("Internal server error");
      }
    } finally {
      hideLoader();
    }
  };

  useEffect(() => {
    fetchDoctors();
  }, []);

  const checkAvailability = async (docId: number) => {
    try {
      showLoader();
      const response = await AdminService.checkAvailability(atoken, docId);
      if (response.data.success) {
        toast.success("Availability Updated!");
        fetchDoctors();
      }
    } catch (error: any) {
      if (error?.response?.data.message) {
        toast.error(error.response?.data.message);
      } else {
        toast.error("Internal server error");
      }
    } finally {
      hideLoader();
    }
  };

  return (
    <div className="m-5 max-h-[90vh] overflow-y-scroll">
      {loading && <Loader />}
      <h1 className="text-lg font-medium">All Doctors</h1>
      <div className="w-full flex flex-wrap gap-4 pt-5 gap-y-6">
        {doctors.map((item, index) => (
          <div
            // onClick={() => navigate(`/appointment/${item._id}`)}
            key={index}
            className="border group border-blue-200 rounded-xl max-w-56 overflow-hidden hover:translate-y-[-10px] transition-all duration-500 cursor-pointer"
          >
            <img
              className="bg-blue-50 group-hover:bg-primary transition-all duration-300"
              src={item.image}
              alt="image"
            />
            <div className="p-4">
              <p className="font-semibold text-lg text-gray-6">{item.name}</p>
              <p className="font-medium text-sm text-gray-500">
                {item.speciality}
              </p>
              <div
                className={`flex items-center gap-2 text-sm ${
                  item.available ? "text-green-500" : "text-yellow-500"
                } `}
              >
                <input
                  onClick={() => checkAvailability(item.id)}
                  type="checkbox"
                  checked={item.available}
                  className="cursor-pointer"
                />
                <p>Available</p>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default DoctorList;
