import React, { useContext } from 'react';
import { Helmet } from 'react-helmet-async';
import useRequestAssets from '../../Hooks/useRequestAssets';
import { AuthContext } from '../../Provider/Provider';
import useAxiosSecure from '../../Hooks/useAxiosSecure';
import Swal from 'sweetalert2';

const AllRequest = () => {
    const [requstedAssets,refetch] = useRequestAssets();
    const {user} = useContext(AuthContext);
    // console.log(requstedAssets);
    const myRequests = requstedAssets.filter(p=> p.assetHrEmail===user.email);
    // console.log(myRequests)
    const axiosSecure = useAxiosSecure();
    const handleApproved= (id,requestedAssetId)=>{
        const status = {
            status:'approved',
        }
        axiosSecure.patch(`/statusUpdate/${id}`,status)
        .then(res=>{
            console.log(res.data)
            if(res.data.modifiedCount>0){
                Swal.fire({
                    title: 'success',
                    text: 'Request Approved Successfully',
                    icon: 'success',
                    confirmButtonText: 'Success'
                  
                })
              
               
              }
    })

    }
    return (
        <div>
             <div>
      <Helmet>
        <title>PrimeFunds || All Request</title>
      </Helmet></div>
      <div>
      <div className="overflow-x-auto">
  <table className="table">
    {/* head */}
    <thead className='bg-green-400 text-white'>
      <tr>
        <th>#</th>
        <th>AssetName</th>
        <th>AssetType</th>
        
        <th>RequesterName</th>
        <th>RequesterEmail</th>
        <th>RequestedDate</th>
        <th>Status</th>
        <th>Note</th>
        
        <th>Action</th>
        <th>Action</th>
      </tr>
    </thead>
    <tbody>
      {/* row 1 */}
     {
        myRequests?.map((asset,index)=> <tr key={asset._id}>
            <th>{index + 1}</th>
            <td>{asset?.assetName}</td>
            <td>{asset?.assetType}</td>
            <td>{asset?.requesterName}</td>
            <td>{asset?.requesterEmail}</td>
            <td>{asset?.requestedDate}</td>
            <td>{asset?.status}</td>
            
            {
                asset.note?  <td>{asset.note}</td> : <td>No Note Available</td>
            }
           <td><button onClick={()=>handleApproved(asset._id,asset.assetId)} className='btn btn-sm text-green-400'>Approve</button></td>
           <td><button className='btn btn-sm text-red-400'>Reject</button></td>
           
          </tr>)
     }
    
    </tbody>
  </table>
</div>
      </div>
        </div>
    );
};

export default AllRequest;