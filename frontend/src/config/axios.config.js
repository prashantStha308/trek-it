import axios from "axios";
import { BASE_API } from "@/constants/config.constants.js";

const axiosInstance = axios.create({
    baseURL: BASE_API,
    withCredentials: true,
})

axiosInstance.interceptors.response.use((res) => res,
    (error) => {

        if (!error.response) {
            console.log("Network error or server unreachable");

            return Promise.reject({
                status: 0,
                message: "Network error",
            });
        }

        const status = error.response.status;
        const message = error.response.data?.message || "Something went wrong";

        if (status >= 500) {
            console.log("Server error:", status);
        } else if (status >= 400) {
            console.log("Client error:", status);
        }

        const err = new Error(message);
        err.status = status;
        err.original = error;
        return Promise.reject(err);
    }
)

export default axiosInstance;