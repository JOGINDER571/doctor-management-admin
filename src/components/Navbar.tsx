import { assets } from "../assets/assets.ts";
import { NavLink, useNavigate } from "react-router-dom";
import { useAdminContext } from "../context/AdminContext.tsx";
import { useDoctorContext } from "../context/DoctorContext.tsx";

const Navbar: React.FC = () => {
  const navigate = useNavigate();
  const { atoken, setAtoken } = useAdminContext();
  const { dtoken, setDtoken } = useDoctorContext();

  const handleLogin = () => {
    navigate("/login");
    localStorage.removeItem("atoken");
    localStorage.removeItem("dtoken");
    setAtoken("");
    setDtoken("");
  };

  return (
    <div className="flex justify-between items-center py-4 mb-1 border-b border-b-gray-200 px-2 sm:px-5">
      <NavLink className={`flex items-center gap-3`} to={"/"}>
        <img className="w-44 cursor-pointer" src={assets.admin_logo} alt="" />
        <p className="text-sm px-2.5 py-0.5 border border-gray-400 rounded-full">
          {atoken ? "Admin" : "Doctor"}
        </p>
      </NavLink>
      <div className="flex items-center">
        <button
          onClick={handleLogin}
          className="py-3 px-8 text-[#fff] rounded-full bg-primary cursor-pointer font-light hidden md:block"
        >
          {atoken || dtoken ? "Logout" : "Login"}
        </button>
      </div>
    </div>
  );
};

export default Navbar;
