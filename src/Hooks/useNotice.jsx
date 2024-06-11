import React from 'react';
import useAxiosSecure from './useAxiosSecure';
import { useQuery } from '@tanstack/react-query';

const useNotice = () => {
    const axiosSecure = useAxiosSecure();

    const {refetch,data:notice=[]}=useQuery({
        queryKey:['notice'],
        queryFn:   async () => {
            const res = await axiosSecure.get('/notice');
            return res.data;
          }
    })
    return [notice,refetch];
};

export default useNotice;