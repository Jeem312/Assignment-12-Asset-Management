import { useQuery } from "@tanstack/react-query";
import useAxiosSecure from "../../Hooks/useAxiosSecure";
import PackageCard from "./PackageCard";

const PaymentModal = ({value}) => {
    const axiosSecure = useAxiosSecure()
    const {data: packages=[]} = useQuery({
        queryKey: ['packages'],
        queryFn:async()=>{
            const res = await axiosSecure.get('/package');
            return res.data;
        }
    })
    return (
      <div>
         {/* Open the modal using document.getElementById('ID').showModal() method */}
<button className="border bg-emerald-600 btn-block text-white rounded-lg p-3" onClick={()=>document.getElementById('my_modal_1').showModal()}>{value}</button>
<dialog id="my_modal_1" className="modal">
  <div className="modal-box">
  <div className="max-w-2xl mx-auto mb-16 text-center">
						<span className="font-bold tracking-wider text-green-400 uppercase dark:text-violet-600">Pay First</span>
						<h2 className="text-4xl font-bold lg:text-5xl">Our Packages</h2>
					</div>
    <div className="grid grid-cols-1 md:grid-cols-2">
  
        {
            packages.map(p=><PackageCard key={p._id} p={p}></PackageCard>)
        }
    </div>
    <div className="modal-action">
      <form method="dialog">
      
        {/* if there is a button in form, it will close the modal */}
        <button className="btn">Close</button>
      </form>
    </div>
  </div>
</dialog>
      </div>
    );
};

export default PaymentModal;