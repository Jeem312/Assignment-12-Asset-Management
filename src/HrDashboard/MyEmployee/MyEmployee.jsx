import React, { useContext } from 'react';
import useUser from '../../Hooks/useUser';
import { AuthContext } from '../../Provider/Provider';
import { FaTrash } from 'react-icons/fa';
import useAxiosSecure from '../../Hooks/useAxiosSecure';
import Swal from 'sweetalert2';
import { Helmet } from 'react-helmet-async';

const MyEmployee = () => {
    const {user}=useContext(AuthContext);
    const axiosSecure = useAxiosSecure();
    const [users,refetch] = useUser();
    const myTeam = users.filter(item=> item.Hr_email===user?.email);
    // console.log(myTeam)
    const handleRemove = (Hr_email,companyStatus,email)=>{
        Swal.fire({
            title: "Are you sure?",
            text: "You won't be able to revert this!",
            icon: "warning",
            showCancelButton: true,
            confirmButtonColor: "#3085d6",
            cancelButtonColor: "#d33",
            confirmButtonText: "Yes, Remove!"
          }).then((result) => {
            if (result.isConfirmed) {
           
                const updateInfo = {
                    Hr_email:'none',
                    companyStatus:'none',
                    Company_logo:'none'
                   }
                   axiosSecure.patch(`/users/${email}`,updateInfo)
                   .then(res=>{
                    console.log(res.data);
                    if(res.data.modifiedCount > 0){
                        refetch();
                              Swal.fire({
                    title: "Removed!",
                    text: "Your Employee Ha Been Removed.",
                    icon: "success"
                  });
                    }
                   })
          
            
            }
          });
    }
    return (
        <section className="py-6 dark:bg-gray-100 dark:text-gray-800 my-24">
             <div>
      <Helmet>
        <title>PrimeFunds || My Employee List</title>
      </Helmet></div>
        <div className="container flex flex-col items-center justify-center p-4 mx-auto space-y-8 sm:p-10">
            <h1 className="text-4xl font-bold leading-none text-center sm:text-5xl text-green-400">My team</h1>
           
            <div className="flex flex-row flex-wrap-reverse justify-center ">
               {
                myTeam.map(member=> <div key={member._id} className="flex flex-col justify-center m-8 text-center">
                <img src={member?.image}  className='self-center flex-shrink-0 w-24 h-24 mb-4 bg-center bg-cover rounded-full dark:bg-gray-500' />
                <p className="text-xl font-semibold leading-tight">{member?.Name}</p>
                <p className=" font-semibold leading-tight">{member.role}</p>
                <div className='flex justify-center items-center my-3 border border-red-300 rounded-lg p-2'>
                    <button onClick={()=> handleRemove(member.Hr_email,member.companyStatus,member.email)} className=' text-red-400 flex'>Remove<FaTrash className='mt-1'></FaTrash></button>
                </div>
               
            </div>)
               }
               
            </div>
        </div>
    </section>
    );
};

export default MyEmployee;