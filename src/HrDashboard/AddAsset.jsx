import { useForm } from "react-hook-form";
import DatePicker from "react-datepicker";

import "react-datepicker/dist/react-datepicker.css";
import { useContext, useState } from "react";
import { AuthContext } from "../Provider/Provider";
import useAxiosSecure from "../Hooks/useAxiosSecure";
import Swal from "sweetalert2";
const AddAsset = () => {
    const [startDate, setStartDate] = useState(new Date());
    const [productType,setProductType]=useState('');
    const [productStatus,setProductStatus]= useState('');
    const {user} = useContext(AuthContext);
    const axiosSecure = useAxiosSecure();
    const handleProductType = (e)=>{
        const ptype=e.target.value;
        setProductType(ptype);

    }
    const handleProductStatus = (e)=>{
        const pstatus=e.target.value;
        setProductStatus(pstatus);

    }
    const handleAddAsset= (e)=>{
        e.preventDefault();
        const from = e.target;
        const date = new Date(startDate).toLocaleDateString();
        const productName= from.name.value;
        const productQuantity = from.quanity.value;
       const productinfo={
        date,
        productName,
        productQuantity,
        productStatus,
        productType,
        HrEmail:user.email,

       }
      axiosSecure.post('/assets',productinfo)
      .then(res=>{console.log(res.data)})
      Swal.fire({
        title: 'success',
        text: 'Your Asset Added Successfully',
        icon: 'success',
        confirmButtonText: 'Success'
     
    })
    e.target.reset();


    }
       
   
   
    return (
        <div>
      <form
       onSubmit={handleAddAsset} className=''> <h2 className='flex mt-16 mb-6 justify-center items-center font-bold text-2xl text-green-500'>Add An Asset</h2>
        <div className='container mx-auto w-1/2 gap-4 my-6 '>
         
          <label className="input input-bordered flex items-center gap-2">
        
            <input type="text" name='name' className="grow w-full" placeholder="Product Name" required />
          </label>

        </div>
        <div className='container mx-auto w-1/2 gap-4 my-6 grid grid-cols-1 md:grid-cols-2'>
          <label className="input input-bordered flex items-center gap-2">
            <input type="text" name='quanity' className=" grow w-full" placeholder="Quantity" required />

          </label>
         

            <select className="select select-bordered w-full max-w-xs"  onChange={handleProductType} required >
              <option disabled selected>Product Type</option>
              <option></option>
              
              <option>ReturnAble</option>
              <option>NonReturnable</option>
            </select>
          

        </div>
        <div className='container mx-auto w-1/2 gap-4 my-6 grid grid-cols-1 md:grid-cols-2'>
        <div className="input input-bordered flex items-center gap-2">
    <DatePicker selected={startDate} onChange={(date) => setStartDate(date)} />
    </div>
          <select className="select select-bordered w-full max-w-xs"  onChange={handleProductStatus} required >
              <option disabled selected>Product status</option>
              <option></option>
              
              <option>In Stock</option>
              <option>Out Of Stock</option>
            </select>
          
           

        </div>
        <div className='container mx-auto w-1/2 gap-4 my-6 grid grid-cols-2 '>
          
         
       
         
       
        
       
        </div>
        
      
      
        <div className='mt-3 w-1/2 container mx-auto'><button className='bg-green-400 text-white p-2  rounded-lg btn-block mb-4'>Add An Asset</button></div>
      </form>
    </div>
    );
};

export default AddAsset;