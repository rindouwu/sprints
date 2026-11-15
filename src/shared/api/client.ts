import axios from "axios";

export const client = axios.create({
    baseURL: "http://48.102.249.95",
    headers: {
        "Content-Type": "application/json",
    }
})