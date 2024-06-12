import React, { useContext, useState } from 'react';
import { Helmet } from 'react-helmet-async';
import useRequestAssets from '../../Hooks/useRequestAssets';
import { AuthContext } from '../../Provider/Provider';
import useAxiosSecure from '../../Hooks/useAxiosSecure';
import Swal from 'sweetalert2';
import useAssets from '../../Hooks/useAssets';

const AllRequest = () => {
  const [requstedAssets, refetch] = useRequestAssets();
  const { user } = useContext(AuthContext);
  const [assets] = useAssets();
  const [searchQuery, setSearchQuery] = useState('');
  const [searchResults, setSearchResults] = useState([]);
  // console.log(requstedAssets);
  // const myRequests = requstedAssets.filter(p=> p.assetHrEmail===user.email);
  // // console.log(myRequests)


  const axiosSecure = useAxiosSecure();


  const handleSearch = (e) => {
    e.preventDefault();
    const filteredAssets = requstedAssets.filter((asset) =>
      asset.requesterName.toLowerCase().includes(searchQuery.toLowerCase())
    );
    setSearchResults(filteredAssets);
  };

  const myRequests = searchQuery ? searchResults : requstedAssets.filter(p => p.assetHrEmail === user.email);


  const handleApproved = (id, requestedAssetId) => {
    const status = {
      status: 'approved',
    }
    axiosSecure.patch(`/statusUpdate/${id}`, status)
      .then(res => {
        console.log(res.data)
        if (res.data.modifiedCount > 0) {
          Swal.fire({
            title: 'success',
            text: 'Request Approved Successfully',
            icon: 'success',
            confirmButtonText: 'Success'

          })


        }
      })
    const neededAsset = assets.find(a => a._id === requestedAssetId);
    const quanity = parseInt(neededAsset.productQuantity) - 1;

    const update = {
      quanity: quanity
    }


    axiosSecure.patch(`/updateAssetQuantity/${requestedAssetId}`, update)
      .then(res => console.log(res.data))




  }

  const handleReject = (id) => {

    Swal.fire({
      title: "Are you sure?",
      text: "You won't be able to revert this!",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#3085d6",
      cancelButtonColor: "#d33",
      confirmButtonText: "Yes, Reject it!"
    }).then((result) => {
      if (result.isConfirmed) {


        axiosSecure.delete(`/requestedAsset/${id}`)
          .then(res => {
            if (res.data.deletedCount > 0) {
              refetch();
              Swal.fire({
                title: "Reject!",
                text: "Rejected.",
                icon: "success"
              });
            }
          })
      }
    });
  }
  return (
    <div>
      <div>
        <Helmet>
          <title>PrimeFunds || All Request</title>
        </Helmet></div>
      <div className='my-12 flex justify-between'>
        <div></div>
        <form onSubmit={handleSearch} className='mt-4'>
          <div className='flex overflow-hidden border rounded-lg focus-within:ring focus-within:ring-opacity-40 focus-within:border-blue-400 focus-within:ring-blue-300'>
            <input
              className='px-6 py-2 text-gray-700 placeholder-gray-500 bg-white outline-none focus:placeholder-transparent'
              type='text'
              name='search'
              placeholder='Enter Requester Name'
              aria-label='Enter Requester Name'
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
            />
            <button className='px-1 md:px-3 py-3 text-sm font-medium tracking-wider text-gray-100 uppercase transition-colors duration-300 transform rounded-lg hover:bg-gray-600 focus:bg-gray-600 focus:outline-none bg-green-500'>
              Search
            </button>
          </div>
        </form>
      </div>
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
                myRequests?.map((asset, index) => <tr key={asset._id}>
                  <th>{index + 1}</th>
                  <td>{asset?.assetName}</td>
                  <td>{asset?.assetType}</td>
                  <td>{asset?.requesterName}</td>
                  <td>{asset?.requesterEmail}</td>
                  <td>{asset?.requestedDate}</td>
                  <td>{asset?.status}</td>

                  {
                    asset.note ? <td>{asset.note}</td> : <td>No Note Available</td>
                  }
                  {
                    asset.status === 'approved' ? <td><button onClick={() => handleApproved(asset._id, asset.assetId)} disabled className='btn btn-sm text-green-400'>Approve</button></td> : <td><button onClick={() => handleApproved(asset._id, asset.assetId)} disabled={asset.status === 'returned'} className='btn btn-sm text-green-400'>Approve</button></td>
                  }
                  {
                    asset.status === 'approved' ? <td><button disabled className='btn btn-sm text-red-400'>Reject</button></td> : <td><button
                      disabled={asset.status === 'returned'} className='btn btn-sm text-red-400' onClick={() => handleReject(asset._id)}>Reject</button></td>
                  }

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