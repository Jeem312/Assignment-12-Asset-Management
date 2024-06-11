import React from 'react';
import useAssets from '../../Hooks/useAssets';
import Piechart from './Piechart';

const LimitedStock = () => {
    const [assets] =useAssets();
    const limitedStock = assets.filter(item=> parseInt(item.productQuantity) < 10 );
    
    return (
        <div className='flex my-10'>
            <div className="overflow-x-auto">
            <div className="divider"></div>
                <h1 className='text-2xl text-gray-600  flex justify-center items-center my-4'>------Limited Stocks-----</h1>
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
        <div>
            <Piechart></Piechart>
        </div>
        </div>
    );
};

export default LimitedStock;