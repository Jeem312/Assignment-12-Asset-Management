import React, { useContext } from 'react';
import useAssets from '../../Hooks/useAssets';
import Piechart from './Piechart';
import { AuthContext } from '../../Provider/Provider';

const LimitedStock = () => {
    const [assets] =useAssets();
    
    const  {user} = useContext(AuthContext);
    
    const myAssets = assets.filter(item=>item.HrEmail===user?.email);
    const limitedStock = myAssets.filter(item=> parseInt(item.productQuantity) < 10 );
    
    return (
        <div className='flex flex-col md:flex-row my-10'>
            <div className="overflow-x-auto flex-1">
            <div className="divider"></div>
                <h1 className='text-2xl text-yellow-400  flex justify-center items-center my-4'>------Limited Stocks-----</h1>
                <div className="divider "></div>

               <table className="table">
    {/* head */}
    <thead className='bg-yellow-400 text-white'>
      <tr>
        <th></th>
        <th>Asset Name</th>
        <th>Quantity</th>
        <th>productType</th>
        <th>Added Date</th>
      </tr>
    </thead>
    <tbody>
      {/* row 1 */}
     {
        limitedStock.map((data,index)=> <tr key={data._id} className='text-gray-600' >
            <th>{index + 1}</th>
            <td>{data.productName}</td>
            <td>{data.productQuantity}</td>
            <td>{data.productType}</td>
            <td>{data.date}</td>
            
          </tr>
         )
     }
    </tbody>
  </table> 
        </div>
        <div className='flex-1 md:px-36 '>
        <div className="overflow-x-auto flex-1">
            <div className="divider"></div>
                <h1 className='text-2xl text-yellow-400  flex justify-center items-center my-4'>------Asset Returnability Overview-----</h1>
                <div className="divider "></div></div>
           <div className='container mx-auto flex justify-center items-center'>
           <Piechart ></Piechart>
           </div>
        </div>
        </div>
    );
};

export default LimitedStock;