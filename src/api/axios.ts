import axios, { AxiosError } from "axios";
interface ApiError {
  error: string;
  message: string;
  statusCode: number;
}

export type ErrorResponse = AxiosError<ApiError>;

const api = axios.create({
  baseURL: import.meta.env.VITE_BACKEND_URL,
});

api.interceptors.response.use(
  (res) => res,
  (err: ErrorResponse) => {
    if (
      err?.response?.data?.message === "Unauthorized access." ||
      err?.response?.data?.message === `Unauthorized`
    ) {
      localStorage.removeItem("atoken");
      localStorage.removeItem("dtoken");
      window.location.href = `/login`;
    }

    console.error(err, err?.response);
    return Promise.reject(err);
  }
);

export default api;
