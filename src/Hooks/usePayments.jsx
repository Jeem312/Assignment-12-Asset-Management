import { useQuery } from "@tanstack/react-query";
import useAxiosSecure from "./useAxiosSecure";


const usePayments = () => {
    const axiosSecure = useAxiosSecure();

    const {isPending,refetch,data:payments=[]}=useQuery({
        queryKey:['payments'],
        queryFn:   async () => {
            const res = await axiosSecure.get('/payments');
            return res.data;
          }
    })
    return [payments,refetch,isPending];
  
};

export default usePayments;