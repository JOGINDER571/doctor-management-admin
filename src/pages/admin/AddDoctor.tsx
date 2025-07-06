import { useState } from "react";
import { assets } from "../../assets/assets";
import { AdminService } from "../../services/AdminService";
import { toast } from "react-toastify";
import { useAdminContext } from "../../context/AdminContext";
import Loader from "../../components/Loader";
const experience = [
  "1 Year",
  "2 Year",
  "3 Year",
  "4 Year",
  "5 Year",
  "6 Year",
  "7 Year",
  "8 Year",
  "9 Year",
  "10 Year",
];
const specialityData = [
  "General physician",
  "Gynecologist",
  "Dermatologist",
  "Pediatricians",
  "Neurologist",
  "Gastroenterologist",
];

const AddDoctor = () => {
  const { atoken } = useAdminContext();
  const [loading, setLoading] = useState<boolean>(false);
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    password: "",
    experience: "1 Year",
    fees: "",
    speciality: "General physician",
    degree: "",
    address1: "",
    address2: "",
    about: "",
  });

  const [image, setImage] = useState<File | null>(null);
  const [preview, setPreview] = useState<string>(assets.upload_area);
  const [error, setError] = useState<string[]>([]);

  const handleChange = (
    e: React.ChangeEvent<
      HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement
    >
  ) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      setImage(file);
      setPreview(URL.createObjectURL(file));
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError([]);

    try {
      const data = new FormData();
      if (!image) {
        toast.error("Image is not selected!");
        return;
      }
      data.append("image", image);
      data.append("name", formData.name);
      data.append("email", formData.email);
      data.append("password", formData.password);
      data.append("experience", formData.experience);
      data.append("fees", formData.fees);
      data.append("speciality", formData.speciality);
      data.append("degree", formData.degree);
      data.append("about", formData.about);
      data.append("available", "true");
      data.append("date", "12");
      data.append(
        "address",
        JSON.stringify({ line1: formData.address1, line2: formData.address2 })
      );
      setLoading(true);

      const response = await AdminService.addDoctor(data, atoken);
      console.log(response?.data);
      if (response?.data.success) {
        toast.success(response.data.message);
      }
      setFormData({
        name: "",
        email: "",
        password: "",
        experience: "",
        fees: "",
        speciality: "",
        degree: "",
        address1: "",
        address2: "",
        about: "",
      });
      setImage(null);
      setPreview(assets.upload_area);
    } catch (err: any) {
      console.error(err);
      toast.error(err?.response?.data.message);
      setError(err.response?.data?.errors || "Something went wrong.");
    } finally {
      scrollTo(0, 0);
      setLoading(false);
    }
  };

  return (
    <form className="m-5 w-full" onSubmit={handleSubmit}>
      {loading && <Loader />}
      <p className="mb-3 text-lg font-medium">Add Doctor</p>

      <div className="bg-white px-8 py-8 border border-gray-200 rounded w-full max-w-4xl max-h-[80vh] overflow-y-scroll ">
        {error?.length > 0 &&
          error.map((item, index) => (
            <p
              key={index}
              className={`text-red-500 ${
                index === error.length - 1 ? "pb-2" : ""
              }`}
            >
              {item}
            </p>
          ))}

        <div className="flex items-center gap-2">
          <label htmlFor="doc-img">
            <img
              className="w-16 rounded cursor-pointer"
              src={preview}
              alt="img"
            />
          </label>
          <input type="file" id="doc-img" hidden onChange={handleImageChange} />
          <p className="text-gray-500">
            Upload doctor <br /> picture
          </p>
        </div>

        <div className="flex flex-col lg:flex-row items-start gap-10 text-gray-600 py-3">
          <div className="flex flex-col lg:flex-1 gap-4">
            <div className="flex-1 flex flex-col gap-1">
              <p>Doctor name</p>
              <input
                name="name"
                value={formData.name}
                onChange={handleChange}
                className="border border-gray-200 outline-0 rounded px-3 py-1.5"
                type="text"
                placeholder="Name"
                required
              />
            </div>

            <div className="flex-1 flex flex-col gap-1">
              <p>Doctor Email</p>
              <input
                name="email"
                value={formData.email}
                onChange={handleChange}
                className="border border-gray-200 outline-0 rounded px-3 py-1.5"
                type="email"
                placeholder="Your Email"
                required
              />
            </div>

            <div className="flex-1 flex flex-col gap-1">
              <p>Doctor Password</p>
              <input
                name="password"
                value={formData.password}
                onChange={handleChange}
                className="border border-gray-200 outline-0 rounded px-3 py-1.5"
                type="password"
                placeholder="Password"
                required
              />
            </div>

            <div className="flex-1 flex flex-col gap-1">
              <p>Experience</p>
              <select
                name="experience"
                value={formData.experience}
                onChange={handleChange}
                className="border border-gray-200 outline-0 rounded px-3 py-1.5"
              >
                <option value="">Select Experience</option>
                {experience.map((item, index) => (
                  <option key={index} value={item}>
                    {item}
                  </option>
                ))}
              </select>
            </div>

            <div className="flex-1 flex flex-col gap-1">
              <p>Fees</p>
              <input
                name="fees"
                value={formData.fees}
                onChange={handleChange}
                className="border border-gray-200 outline-0 rounded px-3 py-1.5"
                type="number"
                placeholder="Fees"
                required
              />
            </div>
          </div>

          <div className="flex flex-col lg:flex-1 gap-4">
            <div className="flex-1 flex flex-col gap-1">
              <p>Speciality</p>
              <select
                name="speciality"
                value={formData.speciality}
                onChange={handleChange}
                className="border border-gray-200 outline-0 rounded px-3 py-1.5"
              >
                <option value="">Select Speciality</option>
                {specialityData.map((item, index) => (
                  <option key={index} value={item}>
                    {item}
                  </option>
                ))}
              </select>
            </div>

            <div className="flex-1 flex flex-col gap-1">
              <p>Education</p>
              <input
                name="degree"
                value={formData.degree}
                onChange={handleChange}
                className="border border-gray-200 outline-0 rounded px-3 py-1.5"
                type="text"
                placeholder="Education"
                required
              />
            </div>

            <div className="flex-1 flex flex-col gap-1">
              <p>Address</p>
              <input
                name="address1"
                value={formData.address1}
                onChange={handleChange}
                className="border border-gray-200 outline-0 rounded px-3 py-1.5"
                type="text"
                placeholder="Address1"
                required
              />
              <input
                name="address2"
                value={formData.address2}
                onChange={handleChange}
                className="border border-gray-200 outline-0 rounded px-3 py-1.5"
                type="text"
                placeholder="Address2"
                required
              />
            </div>
          </div>
        </div>

        <div>
          <p className="mt-4 mb-2">About me</p>
          <textarea
            name="about"
            value={formData.about}
            onChange={handleChange}
            className="border border-gray-200 outline-0 w-full rounded px-4 pt-2"
            placeholder="Write about yourself"
            rows={5}
            required
          />
        </div>

        <button
          type="submit"
          className="mt-4 px-8 py-1.5 rounded-full bg-primary cursor-pointer text-white hover:scale-110 transition-all duration-300"
        >
          Add Doctor
        </button>
      </div>
    </form>
  );
};

export default AddDoctor;
