import React, { useContext } from 'react';
import useAxiosSecure from '../../Hooks/useAxiosSecure';
import { AuthContext } from '../../Provider/Provider';
import useNotice from '../../Hooks/useNotice';
import useUser from '../../Hooks/useUser';
import Swal from 'sweetalert2';

const AddNotice = () => {
    const axiosSecure = useAxiosSecure();
    const {user} = useContext(AuthContext);
    const [notice,,refetch] = useNotice();
    
   const mynotice = notice.filter(item=> item.Hr_email==user?.email)
   .sort((a,b)=>new Date(b.date)-new Date(a.date));
   console.log(mynotice)
   
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
    if(res.data){
        Swal.fire({
            title: 'success',
            text: 'Notice Added Successfully',
            icon: 'success',
            confirmButtonText: 'Success'
         
        })
        refetch();
    }
   


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
            <div className='my-10'>
                <h2 className='text-2xl flex justify-center items-center'>Your Notice</h2>
             {
                mynotice.map((n,index)=> <div className='my-4' key={n._id}>
                    <p  className='text-red-500' key={n._id}><span className='text-green-500 font-bold'>{index+1}.Notice:</span>{n.notice}</p>
                    <p className=''><span className='font-bold'>Published Date:</span>{n.date}</p>
                </div>

                )
             }
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