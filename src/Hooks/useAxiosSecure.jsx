import axios from "axios";
import { useNavigate } from "react-router-dom";
import { useContext, useEffect } from "react";
import { AuthContext } from "../Provider/Provider";

const axiosSecure = axios.create({
    baseURL: 'https://blood-donation-server-side.vercel.app',
    withCredentials: true
});

const useAxiosSecure = () => {
    const navigate = useNavigate()
    const {LogOutUser} = useContext(AuthContext)

    useEffect(() => {
        axiosSecure.interceptors.response.use((response) => {
            return response
        }, async (error) => {
            const status = error.response.status
            console.log(status);
            if(status === 401 || status === 403){
                await LogOutUser()
                navigate('/login')
            }
            return Promise.reject(error)
        })
    }, [LogOutUser, navigate])

    return axiosSecure
};

export default useAxiosSecure;