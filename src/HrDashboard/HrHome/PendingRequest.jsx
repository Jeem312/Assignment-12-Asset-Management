import React from 'react';
import useRequestAssets from '../../Hooks/useRequestAssets';
import { Link } from 'react-router-dom';

const PendingRequest = () => {
    const [requstedAssets,refetch] = useRequestAssets();
   const pendingData = requstedAssets.filter(p=>p.status==='pending');
   console.log(pendingData);
    return (
        <div className='my-24'>
            <div className="overflow-x-auto">
            <div className="divider"></div>
                <h1 className='text-2xl text-gray-600  flex justify-center items-center my-4'>------Pending Requests-----</h1>
                <div className="divider "></div>
  <table className="table">
    {/* head */}
    <thead className='bg-green-400 text-white'>
      <tr>
        <th></th>
        <th>Rquester Name</th>
        <th>Asset Name</th>
        <th>Quantity</th>
      </tr>
    </thead>
    <tbody>
      {/* row 1 */}
     {
        pendingData.slice(0,5).map((data,index)=> <tr key={data._id} className='' >
            <th>{index + 1}</th>
            <td>{data.requesterName}</td>
            <td>{data.assetName}</td>
            <td>{data.assetQuantity}</td>
            
          </tr>
         )
     }
    </tbody>
  </table>
</div>        <div className='flex justify-center items-center'>
    <Link to='/allRequest'><button className='btn   bg-green-400 text-white'>See All Request</button></Link>
</div>
        </div>
    );
};

export default PendingRequest;