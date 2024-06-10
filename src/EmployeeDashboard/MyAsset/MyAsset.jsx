import React, { useContext } from 'react';
import { Helmet } from 'react-helmet-async';
import useUser from '../../Hooks/useUser';
import { AuthContext } from '../../Provider/Provider';
import useRequestAssets from '../../Hooks/useRequestAssets';

const MyAsset = () => {
    const [users]=useUser();
    const {user} = useContext(AuthContext);
    const [requstedAssets,refetch]=useRequestAssets();
   
    const myInfo = users?.filter(p=>p.email === user.email);
    // console.log(myInfo);
    const myHr = users?.filter(u=>u.email === myInfo[0].Hr_email);
    // console.log(myHr);
    const myAssets = requstedAssets.filter(a=>a.requesterEmail ===user.email);
    console.log(myAssets);
    return (
        <div>
             <div>
      <Helmet>
        <title>PrimeFunds || My Asset</title>
      </Helmet></div>
      {
         myHr.length === 0 ? 
         <div>
             <h1 className='flex justify-center items-center text-4xl my-36'>No Asset found</h1>
         </div> : <div>

         <div className="overflow-x-auto">
  <table className="table">
    {/* head */}
    <thead className='bg-green-400 text-white'>
      <tr>
        <th>#</th>
        <th>AssetName</th>
        <th>AssetType</th>
        
       
        <th>RequestedDate</th>
        <th>Status</th>
       
        <th>Action</th>
        <th>Action</th>
        <th>Action</th>
      </tr>
    </thead>
    <tbody>
      {/* row 1 */}
     {
        myAssets?.map((asset,index)=> <tr key={asset._id}>
            <th>{index + 1}</th>
            <td>{asset?.assetName}</td>
            <td>{asset?.assetType}</td>
           
            <td>{asset?.requestedDate}</td>
            <td className=''>{asset?.status}</td>
            
            {
                asset.approvalDate?  <td>{asset.approvalDate}</td> : <td>empty</td>
            }
           {
            asset.status === 'pending' ?  <td><button className='btn btn-sm text-red-400'>Cancel</button></td> : <td><button  className='btn btn-sm text-green-400'>Print</button></td>
           }
           
           {
            asset.status === 'approved' && asset.assetType === "ReturnAble" ?  <td><button className='btn btn-sm text-yellow-400'>Return</button></td> : <td  className=' text-yellow-400'></td>
           }
          </tr>)
     }
    
    </tbody>
  </table>
</div>

         </div>
      }
        </div>
    );
};

export default MyAsset;