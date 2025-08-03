import React, {
  createContext,
  useContext,
  useState,
  type Dispatch,
} from "react";

interface DoctorContextType {
  //   currencySymbol: string;
  dtoken: string;
  setDtoken: Dispatch<React.SetStateAction<string>>;
}

const DoctorContext = createContext<DoctorContextType | undefined>(undefined);

const DoctorContextProvider: React.FC<{ children: React.ReactNode }> = ({
  children,
}) => {
  const [dtoken, setDtoken] = useState<string>(
    localStorage.getItem("dtoken") ?? ""
  );
  const value = {
    dtoken,
    setDtoken,
  };
  return (
    <DoctorContext.Provider value={value}>{children}</DoctorContext.Provider>
  );
};

export default DoctorContextProvider;

export const useDoctorContext = () => {
  const context = useContext(DoctorContext);
  if (!context) throw new Error("useAuth must be used within an AuthProvider");
  return context;
};
