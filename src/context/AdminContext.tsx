import React, {
  useState,
  createContext,
  useContext,
  type Dispatch,
} from "react";

export interface DoctorInterface {
  id: number;
  name: string;
  image: string;
  speciality: string;
  degree: string;
  experience: string;
  about: string;
  fees: number;
  address: any;
  available: boolean;
}

interface AdminContextType {
  atoken: string;
  setAtoken: Dispatch<React.SetStateAction<string>>;
  setDoctors: Dispatch<React.SetStateAction<DoctorInterface[]>>;
  doctors: DoctorInterface[];
}

const AdminContext = createContext<AdminContextType | undefined>(undefined);

const AdminContextProvider: React.FC<{ children: React.ReactNode }> = ({
  children,
}) => {
  const [atoken, setAtoken] = useState<string>(
    localStorage.getItem("atoken") ?? ""
  );
  const [doctors, setDoctors] = useState<DoctorInterface[]>([]);

  const value = {
    atoken,
    setAtoken,
    doctors,
    setDoctors,
  };
  return (
    <AdminContext.Provider value={value}>{children}</AdminContext.Provider>
  );
};

export default AdminContextProvider;

export const useAdminContext = () => {
  const context = useContext(AdminContext);
  if (!context) throw new Error("useAuth must be used within an AuthProvider");
  return context;
};
