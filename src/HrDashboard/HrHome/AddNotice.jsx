import React, { useContext } from 'react';
import useAxiosSecure from '../../Hooks/useAxiosSecure';
import { AuthContext } from '../../Provider/Provider';

const AddNotice = () => {
    const axiosSecure = useAxiosSecure();
    const {user} = useContext(AuthContext);
    const handleNotice = (e)=>{
 e.preventDefault();
  const data = e.target.notice.value;
  const date = new Date().toLocaleDateString();

 const notice ={
    notice:data,
    date:date,
    Hr_email:user?.email,
 }
 
  axiosSecure.post('/notice',notice)
  .then(res=>{
    console.log(res.data);

  })
  e.target.reset();
    }
    return (
        <div className='border border-green-200 rounded-lg container mx-auto my-24 p-12'>
         <div>
         <div className="divider"></div>
                <h1 className='text-2xl text-yellow-400  flex justify-center items-center my-4'>------Add Notice For Employee-----</h1>
                <div className="divider "></div>
         </div>

         <div>
            <div>
                <h2 className='text-2xl flex justify-center items-center'>Your Notice</h2>
                </div> 
            <div className='flex flex-col justify-center items-center'>
           <form onSubmit={handleNotice} >

           <textarea name='notice' placeholder="Bio" className="textarea textarea-bordered textarea-md w-full max-w-xs" ></textarea>
           <div>
            <button className='btn btn-wide bg-green-400 text-white'>Add Notice</button>
           </div>
           </form>
            </div>
         </div>
            
        </div>
    );
};

export default AddNotice;