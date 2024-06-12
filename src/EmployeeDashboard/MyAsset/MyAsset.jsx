import React, { useContext, useState } from 'react';
import { Helmet } from 'react-helmet-async';
import useUser from '../../Hooks/useUser';
import { AuthContext } from '../../Provider/Provider';
import useRequestAssets from '../../Hooks/useRequestAssets';
import useAxiosSecure from '../../Hooks/useAxiosSecure';
import Swal from 'sweetalert2';
import useAssets from '../../Hooks/useAssets';
import { PDFDownloadLink, PDFViewer } from '@react-pdf/renderer';
import PDFFile from './PDFFile';

const MyAsset = () => {
    const [users] = useUser();
    const { user } = useContext(AuthContext);
    const [requestedAssets, refetch] = useRequestAssets();
    const axiosSecure = useAxiosSecure();
    const [assets] = useAssets();
    
    const [selectedAsset, setSelectedAsset] = useState(null);
    const [stockFilter, setStockFilter] = useState('');
    const [typeFilter, setTypeFilter] = useState('');
    const [searchQuery, setSearchQuery] = useState('');
    const myInfo = users?.filter(p => p.email === user?.email);
    const myHr = users?.find(u => u.email === myInfo[0]?.Hr_email);
    const myAssets = requestedAssets.filter(a => a.requesterEmail === user?.email);
    console.log(myAssets);

    const handleReturn = (id, requestedAssetId) => {
        const status = {
            status: 'returned',
        };
        axiosSecure.patch(`/statusUpdate/${id}`, status)
            .then(res => {
                console.log(res.data);
                if (res.data.modifiedCount > 0) {
                    Swal.fire({
                        title: 'Success',
                        text: 'Return Successfully',
                        icon: 'success',
                        confirmButtonText: 'OK'
                    });
                    refetch();  // Refresh the asset list
                }
            });

        const neededAsset = assets.find(a => a._id === requestedAssetId);
        const quantity = parseInt(neededAsset.productQuantity) + 1;

        const update = {
            quantity: quantity
        };

        axiosSecure.patch(`/updateAssetQuantity/${requestedAssetId}`, update)
            .then(res => console.log(res.data));
    };

    const filteredAssets = myAssets.filter(asset => {
        return (
            (stockFilter === '' || (stockFilter === 'approved' ? asset.status === 'approved' : asset.status === 'pending')) && 
            (typeFilter === '' || (typeFilter === 'NonReturnable' ? asset.assetType === 'NonReturnable' : asset.assetType === 'ReturnAble')) &&
            (searchQuery === '' || asset.assetName.toLowerCase().includes(searchQuery.toLowerCase()))
        );
    });

    const handleSearch = (e) => {
        e.preventDefault();
        setSearchQuery(e.target.search.value);
    };
console.log(filteredAssets)
    return (
        <div>
            <Helmet>
                <title>PrimeFunds || My Asset</title>
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
                        <option value=''>Filter By Requested Status</option>
                        <option value='approved'>approved</option>
                       
                        <option value='pending'>pending</option>
                    </select>
                    <select
                        onChange={e => setTypeFilter(e.target.value)}
                        value={typeFilter}
                        name='assetType'
                        id='assetType'
                        className='border p-4 rounded-lg text-green-400'
                    >
                        <option value=''>Filter By Asset Type</option>
                        <option value='ReturnAble'>Returnable</option>
                        <option value='NonReturnable'>NonReturnable</option>
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
                !myHr || myHr.length === 0 ? 
                <div>
                    <h1 className='flex justify-center items-center text-4xl my-36'>No Asset found</h1>
                </div> : 
                <div className="overflow-x-auto">
                    <table className="table">
                        <thead className='bg-green-400 text-white'>
                            <tr>
                                <th>#</th>
                                <th>AssetName</th>
                                <th>AssetType</th>
                                <th>RequestedDate</th>
                                <th>Status</th>
                                <th>Approval Date</th>
                                <th>Cancel</th>
                                <th>Print</th>
                                <th>Return</th>
                                <th>PDF Perview</th>
                            </tr>
                        </thead>
                        <tbody>
                            {
                                filteredAssets?.map((asset, index) => (
                                    <tr key={asset._id}>
                                        <th>{index + 1}</th>
                                        <td>{asset?.assetName}</td>
                                        <td>{asset?.assetType}</td>
                                        <td>{asset?.requestedDate}</td>
                                        <td>{asset?.status}</td>
                                        <td>{asset.approvalDate ? asset.approvalDate : 'empty'}</td>
                                        <td>
                                            {asset.status === 'pending' ? 
                                                <button className='btn btn-sm text-red-400'>Cancel</button> : 
                                                null
                                            }
                                        </td>
                                        <td>
                                            {asset.status !== 'pending' && 
                                                <PDFDownloadLink document={<PDFFile asset={asset} myHr={myHr} />} filename="AssetDetails.pdf">
                                                    <button className='btn btn-sm text-green-400'>Print</button>
                                                </PDFDownloadLink>
                                            }
                                        </td>
                                        <td>
                                            {asset.status === 'approved' && asset.assetType === "ReturnAble" ? 
                                                <button
                                                    onClick={() => handleReturn(asset._id, asset.assetId)}
                                                    disabled={asset.status === 'returned'} 
                                                    className='btn btn-sm text-yellow-400'
                                                >
                                                    Return
                                                </button> : 
                                                null
                                            }
                                        </td>
                                        <td>
                                            {asset.status !== 'pending' &&
                                                <button
                                                    onClick={() => setSelectedAsset(asset)}
                                                    className='btn btn-sm text-blue-400'
                                                >
                                                    Preview
                                                </button>
                                            }
                                        </td>
                                        {selectedAsset && 
                        <div className="pdf-viewer-container">
                            <PDFViewer width="600" height="400">
                                <PDFFile asset={selectedAsset} />
                            </PDFViewer>
                        </div>
                    }
                                    </tr>
                                ))
                            }
                        </tbody>
                    </table>
                   
                </div>
            }
        </div>
    );
};

export default MyAsset;
