import { useContext } from "react";
import { AuthContext } from "../Provider/Provider";
import { useQuery } from "@tanstack/react-query";
import useAxiosSecure from './useAxiosSecure'


const useHr = () => {
    const {user,loading} = useContext(AuthContext);
    // const axiosPublic = useAxiosPublic();
    const axiosSecure = useAxiosSecure();
    const {data:isHr,isPending:isHrLoading} = useQuery({
        queryKey: [user?.email,'isHr'],
        enabled: !loading,
        queryFn: async()=>{
        
           if(user){
            const res = await axiosSecure.get(`/users/hr/${user?.email}`);
            console.log('useHr',res.data.hr);
            return res.data.hr;
           }
       
        
        }  
       
    })
    return [isHr,isHrLoading];
};

export default useHr;