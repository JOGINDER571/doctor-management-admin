import React from "react";
import { NavLink } from "react-router-dom";
import { assets } from "../assets/assets";
import { useDoctorContext } from "../context/DoctorContext";

const Sidebar = () => {
  const { dtoken } = useDoctorContext();
  const data = [
  {
    image: assets.home_icon,
    name: "Dashboard",
    to: dtoken ? "dashboard" : "admin-dashboard",
  },
  {
    image: assets.appointment_icon,
    name: "Appointments",
    to: dtoken ? "appointments" : "all-appointments",
  },
  {
    image: assets.add_icon,
    name: "Add Doctor",
    to: "add-doctor",
  },
  {
    image: assets.people_icon,
    name: "Doctors List",
    to: "doctor-list",
  },
];
  return (
    <div className="min-h-screen border-r border-gray-200">
      <ul className="text-[#515151] mt-5">
        {data.map((item, index) => {
          if (item.to === "add-doctor" && dtoken) {
            return;
          }
          return (
            <NavLink
              className={({ isActive }) =>
                `flex items-center py-3.5 px-3 gap-3 md:px-9 md:min-w-72 cursor-pointer ${
                  isActive ? "bg-[#f1f2ff] border-r-4 border-primary" : ""
                }`
              }
              key={index}
              to={`/${item.to}`}
            >
              <img src={item.image} alt="img" />
              <p>{item.name}</p>
            </NavLink>
          );
        })}
      </ul>
    </div>
  );
};

export default Sidebar;
