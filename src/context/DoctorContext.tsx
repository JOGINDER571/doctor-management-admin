import React, { createContext, useContext } from "react";

interface DoctorContextType {
  //   currencySymbol: string;
}

const DoctorContext = createContext<DoctorContextType | undefined>(undefined);

const DoctorContextProvider: React.FC<{ children: React.ReactNode }> = ({
  children,
}) => {
  const value = {};
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
