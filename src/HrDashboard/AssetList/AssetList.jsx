import React, { useContext, useState } from 'react';
import useAssets from '../../Hooks/useAssets';
import { AuthContext } from '../../Provider/Provider';
import { FaEdit, FaTrash } from 'react-icons/fa';
import useAxiosSecure from '../../Hooks/useAxiosSecure';
import Swal from 'sweetalert2';
import { Link } from 'react-router-dom';
import { Helmet } from 'react-helmet-async';

const AssetList = () => {
    const { user } = useContext(AuthContext);
    const [assets, refetch] = useAssets();
    const axiosSecure = useAxiosSecure();
   
    const [stockFilter, setStockFilter] = useState('');
    const [typeFilter, setTypeFilter] = useState('');
    const [search, setSearch] = useState('');
    const [sortOrder, setSortOrder] = useState('');

    const myAsset = assets
        .filter(asset => 
            asset.HrEmail === user?.email &&
           
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

    const handleDelete = (id) => {
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
                    .then(res => {
                        if (res.data.deletedCount > 0) {
                            refetch();
                            Swal.fire({
                                title: "Deleted!",
                                text: "Your file has been deleted.",
                                icon: "success"
                            });
                        }
                    });
            }
        });
    }

    const handleSearch = (e) => {
        e.preventDefault();
        setSearch(e.target.search.value);
    }

    return (
        <div className='container mx-auto my-24'>
            <Helmet>
                <title>PrimeFunds || Asset List</title>
            </Helmet>
            <div className='mb-6 flex justify-between'>
                <div className='flex flex-col md:flex-row gap-4'>
                  
                    <select
                        onChange={e => setStockFilter(e.target.value)}
                        value={stockFilter}
                        name='stock'
                        id='stock'
                        className='border p-4 rounded-lg text-gray-700'
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
                        className='border p-4 rounded-lg text-gray-700'
                    >
                        <option value=''>Filter By Asset Type</option>
                        <option value='returnable'>Returnable</option>
                        <option value='non-returnable'>Non-Returnable</option>
                    </select>
                    <select
                        onChange={e => setSortOrder(e.target.value)}
                        value={sortOrder}
                        name='sortOrder'
                        id='sortOrder'
                        className='border p-4 rounded-lg text-gray-700'
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
            <h1 className='flex justify-center items-center my-12 text-3xl text-green-400 font-bold'>Assets List</h1>
            <div className='grid grid-cols-1 md:grid-cols-3 gap-4'>
                {myAsset.map(asset => (
                    <div key={asset._id} className="card w-96 bg-base-100 shadow-xl border border-green-100">
                        <div className="card-body">
                            <h2 className="card-title flex justify-center items-center text-green-400">{asset?.productName}</h2>
                            <p className='text-center text-green-600'>Product Quantity: {asset?.productQuantity}</p>
                            <p className='text-center text-green-600'>Product Type: {asset?.productType}</p>
                            <p className='text-center text-green-600'>Product Status: {asset?.productStatus}</p>
                            <p className='text-center text-green-600'>Added-Date: {asset?.date}</p>
                        </div>
                        <div className='flex justify-between'>
                            <div>
                                <Link to={`/updateAsset/${asset?._id}`}>
                                    <button className="btn btn-ghost btn-lg text-red-600">
                                        <FaEdit />
                                    </button>
                                </Link>
                            </div>
                            <div>
                                <button onClick={() => handleDelete(asset?._id)} className="btn btn-ghost btn-lg text-red-600">
                                    <FaTrash />
                                </button>
                            </div>
                        </div>
                    </div>
                ))}
            </div>
        </div>
    );
};

export default AssetList;
