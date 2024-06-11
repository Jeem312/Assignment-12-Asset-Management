import React, { useContext } from 'react';
import { AuthContext } from '../../Provider/Provider';
import useRequestAssets from '../../Hooks/useRequestAssets';

const MyMonthlyReq = () => {
    const {user} = useContext(AuthContext);
    const [requstedAssets,refetch] =useRequestAssets();
    const myAssets = requstedAssets.filter(p=> p.requesterEmail === user?.email );
    const userRequestsThisMonth = myAssets.filter(request => {
        const requestDate = new Date(request.requestedDate);
        const currentDate = new Date();
        return requestDate.getMonth() === currentDate.getMonth() && requestDate.getFullYear() === currentDate.getFullYear();
    });
    // console.log(userRequestsThisMonth)
    return (
        <div>
            <div className="divider"></div>
                <h1 className='text-2xl text-yellow-400  flex justify-center items-center my-4'>------Monthly Requests-----</h1>
                <div className="divider "></div>
                <table className="table">
    {/* head */}
    <thead className='bg-blue-400 text-white'>
      <tr>
        <th></th>

        <th>Asset Name</th>
        <th>Asset Type</th>
        <th>Asset Status</th>
      </tr>
    </thead>
    <tbody>
      {/* row 1 */}
     {
        userRequestsThisMonth.map((data,index)=> <tr key={data._id} className='' >
            <th>{index + 1}</th>
            
            <td>{data.assetName}</td>
            <td>{data.assetType}</td>
            <td>{data.status}</td>
            
            
          </tr>
         )
     }
    </tbody>
  </table>
        </div>
    );
};

export default MyMonthlyReq;