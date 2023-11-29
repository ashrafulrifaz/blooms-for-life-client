import axios from "axios";

const axiosPublic = axios.create({
    baseURL: 'https://blood-donation-server-side.vercel.app',
    withCredentials: true
});

const useAxiosPublic = () => {
    return axiosPublic
};

export default useAxiosPublic;