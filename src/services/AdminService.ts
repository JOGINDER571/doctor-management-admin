
import Axios from "../api/axios";
const baseURL = "/admin";

export class AdminService {
  public static async login(payload: any) {
    try {
      const response = await Axios.post(baseURL + "/login", payload);
      return response;
    } catch (error) {
      console.log(error);
      throw error;
    }
  }

  public static async addDoctor(payload: any, atoken: string) {
    try {
      const response = await Axios.post(baseURL + "/add-doctor", payload, {
        headers: { atoken },
      });
      return response;
    } catch (error: any) {
      throw error;
    }
  }

  public static async getDoctors(atoken: string) {
    try {
      const response = await Axios.get(baseURL + "/doctors", {
        headers: { atoken },
      });
      return response;
    } catch (error: any) {
      throw error;
    }
  }

  public static async checkAvailability(atoken: string, docId: number) {
    try {
      const response = await Axios.put(baseURL + "/change-doctor-availability", {docId}, {
        headers: { atoken },
      });
      return response;
    } catch (error: any) {
      throw error;
    }
  }
}
