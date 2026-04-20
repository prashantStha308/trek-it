import axios from "axios";
import { BASE_API } from "@/constants/config.constant";

const axiosI = axios.create({
    baseURL: BASE_API,
    withCredentials: true,
})

axiosI.interceptors.response.use((res) => res,
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

        return Promise.reject({
            status,
            message,
            original: error
        });
    }
)

export default axiosI;