import { useQuery } from "@tanstack/react-query";
import useAxiosSecure from "./useAxiosSecure";


const useAssets = () => {
    const axiosSecure = useAxiosSecure();

    const {refetch,data:assets=[]}=useQuery({
        queryKey:['asset'],
        queryFn:   async () => {
            const res = await axiosSecure.get('/assets');
            return res.data;
          }
    })
    return [assets,refetch];
};

export default useAssets;