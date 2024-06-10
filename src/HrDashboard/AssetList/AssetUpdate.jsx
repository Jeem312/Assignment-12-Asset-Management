import React, { useState } from 'react';
import { useParams } from 'react-router-dom';
import useAssets from '../../Hooks/useAssets';

import useAxiosPublic from '../../Hooks/useAxiosPublic';
import Swal from 'sweetalert2';

const AssetUpdate = () => {
    const {id}=useParams();
    const [assets,refetch]=useAssets();
    const axiosPublic =useAxiosPublic();
    const updatedasset=assets.find(asset=>asset._id===id);
    const [productType,setProductType]=useState('');
    const [productStatus,setProductStatus]= useState('');
    console.log(updatedasset);
    const handleProductType = (e)=>{
        const ptype=e.target.value;
        setProductType(ptype);

    }
    const handleProductStatus = (e)=>{
        const pstatus=e.target.value;
        setProductStatus(pstatus);

    }
    const handleUpdateAsset=(e)=>{
        e.preventDefault();
        const from = e.target;
        
        const productName= from.name.value;
        const productQuantity = from.quanity.value;
       const productinfo={
        
        productName,
        productQuantity,
        productStatus,
        productType,
       }
       axiosPublic.patch(`/updateAsset/${id}`,productinfo)
       .then(res =>{
        //   console.log(data);
         
          if(res.data.modifiedCount>0){
            Swal.fire({
                title: 'success',
                text: 'Your Asset Updated Successfully',
                icon: 'success',
                confirmButtonText: 'Success'
              
            })
            e.target.reset();
           
          }
        
         })
    
    }
    
    return (
        <div className='container mx-auto my-24'>
      <form
       onSubmit={handleUpdateAsset} className=''> <h2 className='flex mt-16 mb-6 justify-center items-center font-bold text-2xl text-green-500'>Update An Asset</h2>
        <div className='container mx-auto w-1/2 gap-4 my-6 '>
         
          <label className="input input-bordered flex items-center gap-2">
        
            <input type="text" name='name' className="grow w-full" placeholder="Product Name" defaultValue={updatedasset.productName} required />
          </label>

        </div>
        <div className='container mx-auto w-1/2 gap-4 my-6 grid grid-cols-1 md:grid-cols-2'>
          <label className="input input-bordered flex items-center gap-2">
            <input type="text" name='quanity' className=" grow w-full"  defaultValue={updatedasset.productQuantity} placeholder="Quantity" required />

          </label>
         

            <select className="select select-bordered w-full max-w-xs"  onChange={handleProductType} required >
              <option disabled selected>Product Type</option>
              <option></option>
              
              <option>ReturnAble</option>
              <option>NonReturnable</option>
            </select>
          

        </div>
        <div className='container mx-auto w-1/2  my-6'>
        
          <select className="select select-bordered w-full max-w-xs"  onChange={handleProductStatus} required >
              <option disabled selected>Product status</option>
              <option></option>
              
              <option>In Stock</option>
              <option>Out Of Stock</option>
            </select>
          
           

        </div>
       
        
      
      
        <div className='mt-3 w-1/2 container mx-auto'><button className='bg-green-400 text-white p-2  rounded-lg btn-block mb-4'>Update An Asset</button></div>
      </form>
    </div>
    );
};

export default AssetUpdate;