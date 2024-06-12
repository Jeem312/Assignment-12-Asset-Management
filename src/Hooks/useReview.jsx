import React from 'react';
import useAxiosSecure from './useAxiosSecure';
import { useQuery } from '@tanstack/react-query';

const useReview = () => {
    const axiosSecure = useAxiosSecure();

    const {refetch,data:review=[]}=useQuery({
        queryKey:['review'],
        queryFn:   async () => {
            const res = await axiosSecure.get('/review');
            return res.data;
          }
    })
    return [review,refetch];

};

export default useReview;