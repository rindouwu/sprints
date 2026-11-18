import axios from "axios";

export const client = axios.create({
    baseURL: import.meta.env.VITE_API_BASE_URL,
    headers: {
        "Content-Type": "application/json",
    }
})

client.interceptors.request.use(
    (response) => response,
    (error) => {
        if(axios.isAxiosError(error)) {
            const status = error.response?.status;
            const serverMessage = error.response?.data?.message;
            let message = "Unknown error";

            if(!error.response) {
                message = "Cannot connect to server";
            } else if(typeof serverMessage === "string" && serverMessage.trim()) {
                message = serverMessage;
            } else {
                switch(status) {
                    case 400:
                        message = "Uncorrect request"
                        break
                    case 401:
                        message = "Unauthorized"
                        break
                    case 403:
                        message = "Forbidden"
                        break
                    case 404:
                        message = "Not Found"
                        break
                    case 500:
                        message = "Internal Server Error"
                        break
                }
            }
            console.error(message)
        }
        return Promise.reject(error)
    }
)