import { useQuery } from "@tanstack/react-query";
import useAxiosSecure from "../../Hooks/useAxiosSecure";
import PackageCard from "./PackageCard";
import { useParams } from "react-router-dom";
import { Helmet } from "react-helmet-async";

const PaymentModal = () => {
    
    const axiosSecure = useAxiosSecure()
    const {data: packages=[]} = useQuery({
        queryKey: ['packages'],
        queryFn:async()=>{
            const res = await axiosSecure.get('/package');
            return res.data;
        }
    })
    return (
      <div className="container mx-auto">
         <div>
      <Helmet>
        <title>PrimeFunds || Packages</title>
      </Helmet></div>
         <div className="container mx-auto mb-16 text-center mt-10">
						<span className="font-bold tracking-wider uppercase dark:text-violet-600">Pricing</span>
						<h2 className="text-4xl font-bold  lg:text-5xl">Our Packages</h2>
					</div>
        
    <div className="grid grid-cols-1 md:grid-cols-3">
   
        {
            packages.map(p=><PackageCard key={p._id} p={p}></PackageCard>)
        }
   
      </div>
      </div>
    );
};

export default PaymentModal;