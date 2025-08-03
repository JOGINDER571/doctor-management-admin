import Axios from "../api/axios";
const baseURL = "/doctor";

export class DoctorService {
  public static async login(payload: any) {
    try {
      const response = await Axios.post(baseURL + "/login", payload);
      return response;
    } catch (error) {
      console.log(error);
      throw error;
    }
  }

  public static async checkAvailability(dtoken: string, docId: number) {
    try {
      const response = await Axios.put(
        baseURL + "/change-doctor-availability",
        { docId },
        {
          headers: { dtoken },
        }
      );
      return response;
    } catch (error: any) {
      throw error;
    }
  }

  public static async dashboard(dtoken: string) {
    try {
      const response = await Axios.get(baseURL + "/dash-data", {
        headers: { dtoken },
      });
      return response;
    } catch (error: any) {
      throw error;
    }
  }

  public static async appointments(dtoken: string) {
    try {
      const response = await Axios.get(baseURL + "/appointments", {
        headers: { dtoken },
      });
      return response;
    } catch (error: any) {
      throw error;
    }
  }

  public static async cancelAppointment(dtoken: string, appointmentId: number) {
    try {
      const response = await Axios.put(
        baseURL + "/cancel-appointment",
        { appointmentId },
        {
          headers: { dtoken },
        }
      );
      return response;
    } catch (error: any) {
      throw error;
    }
  }
}
