import { useContext } from "react";
import { AuthContext } from "../Provider/Provider";
import { useQuery } from "@tanstack/react-query";
import useAxiosSecure from './useAxiosSecure'

const useEmplyee = () => {
    const {user,loading} = useContext(AuthContext);
    // const axiosPublic = useAxiosPublic();
    const axiosSecure = useAxiosSecure();
    const {data:isEmployee,isPending:isEmployeeLoading} = useQuery({
        queryKey: [user?.email,'isEmployee'],
        enabled: !loading,
        queryFn: async()=>{
        
           if(user){
            const res = await axiosSecure.get(`/users/employee/${user?.email}`);
            console.log('useEmployee',res.data);
            return res.data.employee;
           }
       
        
        }  
       
    })
    return [isEmployee,isEmployeeLoading];
}
export default useEmplyee;