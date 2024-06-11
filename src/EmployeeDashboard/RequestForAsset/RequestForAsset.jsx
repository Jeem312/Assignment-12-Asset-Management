import React, { useState, useContext } from 'react';
import { Helmet } from 'react-helmet-async';
import useAssets from '../../Hooks/useAssets';
import { AuthContext } from '../../Provider/Provider';
import useAxiosSecure from '../../Hooks/useAxiosSecure';
import Swal from 'sweetalert2';
import useUser from '../../Hooks/useUser';
import { update } from 'firebase/database';

const RequestForAsset = () => {
    const [assets,refetch] = useAssets();
    const [users]=useUser();
    const {user} = useContext(AuthContext);
    const myInfo = users?.filter(p=>p.email === user.email);
    // console.log(myInfo);
    const myHr = users?.filter(u=>u.email === myInfo[0].Hr_email);
    // console.log(myHr);
    
    const myAssets = assets.filter(a=>a.HrEmail===myHr[0].email);
    console.log(myAssets);
    const [selectedAsset, setSelectedAsset] = useState(null);
    const [note, setNote] = useState('');
    const axiosSecure = useAxiosSecure();

   
    const [stockFilter, setStockFilter] = useState('');
    const [typeFilter, setTypeFilter] = useState('');
    const [search, setSearch] = useState('');
    const [sortOrder, setSortOrder] = useState('');





    const myAsset = assets
    .filter(asset => 
        asset.HrEmail === myHr[0].email &&
       
        (stockFilter === '' || (stockFilter === 'instock' ? asset.productStatus === 'In Stock' : asset.productStatus === 'Out of Stock')) &&
        (typeFilter === '' || asset.productType.toLowerCase() === typeFilter) &&
        (search === '' || asset.productName.toLowerCase().includes(search.toLowerCase()))
    )
    .sort((a, b) => {
        if (sortOrder === 'asc') {
            return a.productQuantity - b.productQuantity;
        } else if (sortOrder === 'desc') {
            return b.productQuantity - a.productQuantity;
        }
        return 0;
    });



// console.log(myAsset)

    const handleRequestClick = (asset) => {
        setSelectedAsset(asset);
        document.getElementById('request_modal').showModal();
    };

    const handleFormSubmit = async (e) => {
        e.preventDefault();
      

        const requestData = {
            requesterName:user?.displayName,
            requesterEmail:user?.email,
            requestedDate: new Date().toLocaleDateString(),
            assetHrEmail: selectedAsset.HrEmail,
            assetName: selectedAsset.productName,
            assetId: selectedAsset._id,
            assetType: selectedAsset.productType,
            status:'pending',
            assetQuantity: selectedAsset.productQuantity,
            requesterId: user.id,
           
        };

        // Add note only if it is provided
        if (note) {
            requestData.note = note;
        }

       
           axiosSecure.post('/requestedAsset',requestData)
           .then(res=> {
            console.log(res.data);
            if(res.data){
                Swal.fire({
                    title: 'success',
                    text: 'Requested Successfully',
                    icon: 'success',
                    confirmButtonText: 'Success'
                 
                })
                setSelectedAsset(null);
                setNote('');
                document.getElementById('request_modal').close();
                refetch();
            }
           })
             const count = parseInt(selectedAsset.requestedCount) + 1;
             const update = {
                count: count
              }
           axiosSecure.patch(`/count/${selectedAsset._id}`,update)
           .then(res=>console.log(res.data))
           
           
    };
    const handleSearch = (e) => {
        e.preventDefault();
        setSearch(e.target.search.value);
    }
    return (
        <div>
            <Helmet>
                <title>PrimeFunds || Request For An Asset</title>
            </Helmet>

            <div className='mb-6 flex justify-between'>
                <div className='flex flex-col md:flex-row gap-4'>
                   
                    <select
                        onChange={e => setStockFilter(e.target.value)}
                        value={stockFilter}
                        name='stock'
                        id='stock'
                        className='border p-4 rounded-lg  text-green-400'
                    >
                        <option value=''>Filter By Stock Status</option>
                        <option value='instock'>In Stock</option>
                        <option value='outofstock'>Out of Stock</option>
                    </select>
                    <select
                        onChange={e => setTypeFilter(e.target.value)}
                        value={typeFilter}
                        name='assetType'
                        id='assetType'
                        className='border p-4 rounded-lg text-green-400'
                    >
                        <option value=''>Filter By Asset Type</option>
                        <option value='returnable'>Returnable</option>
                        <option value='non-returnable'>NonReturnable</option>
                    </select>
                    <select
                        onChange={e => setSortOrder(e.target.value)}
                        value={sortOrder}
                        name='sortOrder'
                        id='sortOrder'
                        className='border p-4 rounded-lg text-green-400'
                    >
                        <option value=''>Sort By Quantity</option>
                        <option value='asc'>Ascending</option>
                        <option value='desc'>Descending</option>
                    </select>
                </div>
                <form onSubmit={handleSearch} className='mt-4'>
                    <div className='flex overflow-hidden border rounded-lg focus-within:ring focus-within:ring-opacity-40 focus-within:border-blue-400 focus-within:ring-blue-300'>
                        <input
                            className='px-6 py-2 text-gray-700 placeholder-gray-500 bg-white outline-none focus:placeholder-transparent'
                            type='text'
                            name='search'
                            placeholder='Enter Asset Name'
                            aria-label='Enter Asset Name'
                        />
                        <button className='px-1 md:px-3 py-3 text-sm font-medium tracking-wider text-gray-100 uppercase transition-colors duration-300 transform rounded-lg hover:bg-gray-600 focus:bg-gray-600 focus:outline-none bg-green-500'>
                            Search
                        </button>
                    </div>
                </form>
            </div>

          {
             myHr.length === 0 ? 
             <div>
                 <h1 className='flex justify-center items-center text-4xl my-36'>No Asset found</h1>
             </div> :  <div>
             <div>
                <h1 className='flex justify-center items-center my-12 text-3xl text-green-400 font-bold'>Request For An Asset</h1>
                <div className='grid grid-cols-1 md:grid-cols-3 gap-4 my-12'>
                    {myAsset.map(asset => (
                        <div key={asset._id} className="card w-96 bg-base-100 shadow-xl border border-green-100">
                            <div className="card-body">
                                <h2 className="card-title flex justify-center items-center text-green-400">{asset?.productName}</h2>
                                <p className='text-center text-green-600'>Product Quantity: {asset?.productQuantity}</p>
                                <p className='text-center text-green-600'>{asset?.productType}</p>
                                <p className='text-center text-green-600'>{asset?.productStatus}</p>
                            </div>
                            {asset?.productStatus === 'In Stock' ?
                                <div className='flex justify-center items-center my-4'>
                                    <button className="btn bg-green-400 text-white" onClick={() => handleRequestClick(asset)}>Request</button>
                                </div> :  <div className='flex justify-center items-center my-4'>
                                    <button disabled className="btn bg-green-400 text-white" onClick={() => handleRequestClick(asset)}>Request</button>
                                </div>
                            }
                        </div>
                    ))}
                </div>
            </div>

            <dialog id="request_modal" className="modal modal-bottom sm:modal-middle">
                <div className="modal-box">
                    <h3 className="font-bold text-lg">Request for {selectedAsset?.productName}</h3>
                    <p className='text-red-500 my-2'>For Request Please click on Request Button</p>
                    <form onSubmit={handleFormSubmit}>
                        <textarea
                            className="textarea textarea-bordered w-full mb-4"
                            placeholder="Add additional notes here (optional)"
                            value={note}
                            onChange={(e) => setNote(e.target.value)}
                        ></textarea>
                        <div className="modal-action">
                            <button type="submit" className="btn bg-green-400 text-white">Request</button>
                            <button type="button" className="btn bg-red-500 text-white" onClick={() => document.getElementById('request_modal').close()}>Cancel</button>
                        </div>
                    </form>
                </div>
            </dialog>
             </div>

          }
        </div>
    );
};

export default RequestForAsset;