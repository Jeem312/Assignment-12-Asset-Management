import axios from "axios";
import { useNavigate } from "react-router-dom";


const axiosSecure = axios.create({
    baseURL: `${import.meta.env.VITE_API_URL}`
})
const useAxiosSecure = () => {
  

    // request interceptor to add authorization header for every secure call to teh api
    axiosSecure.interceptors.request.use(function (config) {
        const token = localStorage.getItem('Access-token')
        // console.log('request stopped by interceptors', token)
        config.headers.authorization = `Bearer ${token}`;
        return config;
    }, function (error) {
        // Do something with request error
        return Promise.reject(error);
    });


    // intercepts 401 and 403 status
    axiosSecure.interceptors.response.use(function (response) {
        return response;
    }, async (error) => {
        const status = error.response.status;
        // console.log('status error in the interceptor', status);
        // for 401 or 403 logout the user and move the user to the login
       
        return Promise.reject(error);
    })


    return axiosSecure;
};

export default useAxiosSecure;