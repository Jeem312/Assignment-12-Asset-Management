import React, { useState, useContext } from 'react';
import { Helmet } from 'react-helmet-async';
import useAssets from '../../Hooks/useAssets';
import { AuthContext } from '../../Provider/Provider';
import useAxiosSecure from '../../Hooks/useAxiosSecure';
import Swal from 'sweetalert2';
import useUser from '../../Hooks/useUser';

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
           
           
    };

    return (
        <div>
            <Helmet>
                <title>PrimeFunds || Request For An Asset</title>
            </Helmet>
          {
             myHr.length === 0 ? 
             <div>
                 <h1 className='flex justify-center items-center text-4xl my-36'>No Asset found</h1>
             </div> :  <div>
             <div>
                <h1 className='flex justify-center items-center my-12 text-3xl text-green-400 font-bold'>Request For An Asset</h1>
                <div className='grid grid-cols-1 md:grid-cols-3 gap-4 my-12'>
                    {myAssets.map(asset => (
                        <div key={asset._id} className="card w-96 bg-base-100 shadow-xl border border-green-100">
                            <div className="card-body">
                                <h2 className="card-title flex justify-center items-center text-green-400">{asset?.productName}</h2>
                                <p className='text-center text-green-600'>Product Quantity: {asset?.productQuantity}</p>
                                <p className='text-center text-green-600'>{asset?.productType}</p>
                                <p className='text-center text-green-600'>{asset?.productStatus}</p>
                            </div>
                            {asset?.productStatus === 'In Stock' && (
                                <div className='flex justify-center items-center my-4'>
                                    <button className="btn bg-green-400 text-white" onClick={() => handleRequestClick(asset)}>Request</button>
                                </div>
                            )}
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