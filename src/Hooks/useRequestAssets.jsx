import { useQuery } from "@tanstack/react-query";
import useAxiosSecure from "./useAxiosSecure";


const useRequestAssets = () => {
    const axiosSecure = useAxiosSecure();

    const {refetch,data:requstedAssets=[]}=useQuery({
        queryKey:['requestedAssets'],
        queryFn:   async () => {
            const res = await axiosSecure.get('/requestedAssets');
            return res.data;
          }
    })
    return [requstedAssets,refetch];
};

export default useRequestAssets;