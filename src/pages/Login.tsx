import React, { useState } from "react";
import { useAdminContext } from "../context/AdminContext";
import { useNavigate } from "react-router-dom";
import { AdminService } from "../services/AdminService";
import useLoading from "../hooks/useLoading";
import Loader from "../components/Loader";
import { toast } from "react-toastify";
interface FormValues {
  email: string;
  password: string;
}

interface FormErrors {
  email?: string;
  password?: string;
}

const Login: React.FC = () => {
  const { setAtoken } = useAdminContext();
  const navigate = useNavigate();
  const [formValues, setFormValues] = useState<FormValues>({
    email: "",
    password: "",
  });
  const { loading, showLoader, hideLoader } = useLoading();
  const [formErrors, setFormErrors] = useState<FormErrors>({});
  const [state, setState] = useState<string>("admin");

  const validate = (): FormErrors => {
    const errors: FormErrors = {};

    if (!formValues.email.trim()) {
      errors.email = "Email is required";
    } else if (!/\S+@\S+\.\S+/.test(formValues.email)) {
      errors.email = "Email is invalid";
    }

    if (!formValues.password) {
      errors.password = "Password is required";
    } else if (formValues.password.length < 6) {
      errors.password = "Password must be at least 6 characters";
    }

    return errors;
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>): void => {
    const { name, value } = e.target;
    setFormValues({ ...formValues, [name]: value });
  };

  const handleSubmit = async (
    e: React.FormEvent<HTMLFormElement>
  ): Promise<void> => {
    e.preventDefault();
    const errors = validate();
    setFormErrors(errors);

    if (Object.keys(errors).length === 0) {
      try {
        showLoader();
        const res = await AdminService.login(formValues);
        if (res?.data.success) {
          setAtoken(res.data.data[0]);
          localStorage.setItem("atoken", res.data.data[0]);
          navigate("/");
        }
      } catch (error: any) {
        toast.error(
          error.response?.data?.message || "Login failed. Please try again."
        );
      } finally {
        hideLoader();
      }
    }
  };

  return (
    <div className="flex items-center justify-center p-4 h-screen">
      {loading && <Loader />}
      <form
        onSubmit={handleSubmit}
        className="bg-white rounded-lg shadow-md w-full max-w-sm p-6"
      >
        <h2 className="text-2xl font-semibold text-gray-800 mb-2">
          {state === "admin" ? "Admin" : "Doctor"} Login
        </h2>

        <div className="mb-4">
          <label className="block text-sm font-medium text-gray-700">
            Email
          </label>
          <input
            name="email"
            type="email"
            value={formValues.email}
            onChange={handleChange}
            className={`mt-1 block w-full px-3 py-2 border ${
              formErrors.email ? "border-red-500" : "border-gray-300"
            } rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500`}
          />
          {formErrors.email && (
            <p className="text-sm text-red-600 mt-1">{formErrors.email}</p>
          )}
        </div>

        <div className="mb-6">
          <label className="block text-sm font-medium text-gray-700">
            Password
          </label>
          <input
            name="password"
            type="password"
            value={formValues.password}
            onChange={handleChange}
            className={`mt-1 block w-full px-3 py-2 border ${
              formErrors.password ? "border-red-500" : "border-gray-300"
            } rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500`}
          />
          {formErrors.password && (
            <p className="text-sm text-red-600 mt-1">{formErrors.password}</p>
          )}
        </div>

        <button
          type="submit"
          className="w-full bg-indigo-500 text-white py-2 rounded-md hover:bg-indigo-600 transition cursor-pointer"
        >
          Login
        </button>
        {state === "admin" ? (
          <p className="mt-4 text-sm text-center">
            Doctor Login?{" "}
            <span
              onClick={() => setState("doctor")}
              className="text-indigo-600 hover:underline cursor-pointer"
            >
              click here
            </span>
          </p>
        ) : (
          <p className="mt-4 text-sm text-center">
            Admin Login?{" "}
            <span
              onClick={() => setState("admin")}
              className="text-indigo-600 hover:underline cursor-pointer"
            >
              Click here
            </span>
          </p>
        )}
      </form>
    </div>
  );
};

export default Login;
