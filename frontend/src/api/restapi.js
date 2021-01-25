import axios from "axios";

export default axios.create({
    baseURL: process.env.REACT_APP_HOST,
    headers: {
        "Content-type": "application/json",
        withCredentials: true
    }
});