import React, { useContext } from 'react';
import { AuthContext } from '../../Provider/Provider';
import useRequestAssets from '../../Hooks/useRequestAssets';

const MyPendingReq = () => {
    const {user} = useContext(AuthContext);
    const [requstedAssets,refetch] =useRequestAssets();
    const myPendingAssets = requstedAssets.filter(p=> p.requesterEmail === user?.email && p.status === 'pending');
   
    return (
        <div>
            <div className="divider"></div>
                <h1 className='text-2xl text-yellow-400  flex justify-center items-center my-4'>------Pending Requests-----</h1>
                <div className="divider "></div>
                <table className="table">
    {/* head */}
    <thead className='bg-green-300 text-white'>
      <tr>
        <th></th>
        <th>Rquester Name</th>
        <th>Asset Name</th>
        <th>Asset Type</th>
      </tr>
    </thead>
    <tbody>
      {/* row 1 */}
     {
        myPendingAssets.map((data,index)=> <tr key={data._id} className='' >
            <th>{index + 1}</th>
            <td>{data.requesterName}</td>
            <td>{data.assetName}</td>
            <td>{data.assetType}</td>
            
          </tr>
         )
     }
    </tbody>
  </table>
        </div>
    );
};

export default MyPendingReq;