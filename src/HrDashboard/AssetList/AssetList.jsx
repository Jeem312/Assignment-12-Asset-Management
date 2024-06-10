import React, { useContext } from 'react';
import useAssets from '../../Hooks/useAssets';
import { AuthContext } from '../../Provider/Provider';
import { FaEdit, FaTrash } from 'react-icons/fa';
import useAxiosSecure from '../../Hooks/useAxiosSecure';
import Swal from 'sweetalert2';
import { Link } from 'react-router-dom';
import { Helmet } from 'react-helmet-async';

const AssetList = () => {
    const {user} = useContext(AuthContext);
    const [assets,refetch] =useAssets();
    const axiosSecure = useAxiosSecure();
    const myAsset= assets.filter(asset=> asset.HrEmail === user?.email);
    const handleDelete=(id)=>{
        Swal.fire({
            title: "Are you sure?",
            text: "You won't be able to revert this!",
            icon: "warning",
            showCancelButton: true,
            confirmButtonColor: "#3085d6",
            cancelButtonColor: "#d33",
            confirmButtonText: "Yes, delete it!"
          }).then((result) => {
            if (result.isConfirmed) {
           
           
            axiosSecure.delete(`/assets/${id}`)
            .then(res=>{
                if(res.data.deletedCount > 0){
                    refetch();
                          Swal.fire({
                title: "Deleted!",
                text: "Your file has been deleted.",
                icon: "success"
              });
                }
            })
            }
          });

    }
   
    return (
        <div className='container mx-auto my-24'>
           <div>
      <Helmet>
        <title>PrimeFunds || Asset List</title>
      </Helmet></div>
           <h1 className='flex justify-center items-center my-12 text-3xl text-green-400 font-bold'>Assets List</h1> 
           <div className='grid grid-cols-1 md:grid-cols-3 gap-4'>
            {
                myAsset.map(asset=><div key={asset._id} className="card w-96 bg-base-100 shadow-xl border border-green-100">
                <div className="card-body ">
                  <h2 className="card-title flex justify-center items-center text-green-400">{asset?.productName}</h2>
                  <p className='text-center text-green-600'>productQuantity:{asset?.productQuantity}</p>
                  <p className='text-center text-green-600'>{asset?.productType}</p>
                  <p className='text-center text-green-600'>Added-Date:{asset?.date}</p>
                 
                </div>
                <div className='flex justify-between'>
                    <div><Link to={`/updateAsset/${asset?._id}`}><button   className="btn btn-ghost btn-lg text-red-600"><FaEdit></FaEdit></button></Link></div>
                    <div><button onClick={()=>handleDelete(asset?._id)}
              className="btn btn-ghost btn-lg text-red-600">
                <FaTrash></FaTrash>
              </button></div>
                </div>
              </div>)
            }
           </div>
        </div>
    );
};

export default AssetList;