import { Helmet } from "react-helmet-async";
import React, { useContext, useState } from 'react';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import { useForm} from "react-hook-form";

import DatePicker from "react-datepicker";

import "react-datepicker/dist/react-datepicker.css";


import toast, { Toaster } from "react-hot-toast";
import { AuthContext } from "../Provider/Provider";
import useAxiosPublic from "../Hooks/useAxiosPublic";
import Swal from "sweetalert2";


const JoinAsEmploy = () => {
    const [startDate, setStartDate] = useState(new Date());
    const {  createUser,updateUserProfile,googleLogin} =useContext(AuthContext);
        const axiosPublic = useAxiosPublic();
    const navigate = useNavigate();
   
      const image_hosting_key = import.meta.env.VITE_IMAGE_API;
      // console.log(image_hosting_key);
      const image_hosting_api = `https://api.imgbb.com/1/upload?key=${image_hosting_key}`;
   
    
        const {
            register,
       
            formState: { errors },
            handleSubmit,} = useForm()
    
          const onSubmit = async(data) => {
           
            const {email,password,Name} = data;
            if (!/(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[!@#$%^&*]).{6,}/.test(password)) {
              toast.error("Password must have at least 1 uppercase letter, 1 lowercase letter, 1 special character, 1 numeric character, and be at least 6 characters long");
              return;
          }
          const imageFile = { image: data.image[0]};
          const res =await  axiosPublic.post(image_hosting_api,imageFile,{
              headers: {
                  'Content-Type': 'multipart/form-data'
                }
             
          }
          
     ) 
     const Image = res.data.data.display_url;
          const info ={
            email: data.email,
            Name:data.Name,
            role:'Employee',
            companyStatus: 'none',
            image: res.data.data.display_url,
        }
        
            createUser(email,password)
            .then(result=>{
              console.log(result.user);
    
              if (result.user) {
                Swal.fire({
                  title: 'success',
                  text: 'Register As Employee Successfully',
                  icon: 'success',
                  confirmButtonText: 'Success'
               
              })
            
               axiosPublic.post('/user',info)
               .then(res=>{console.log(res.data);
                updateUserProfile(Name, Image)
                navigate('/');

               })
               
              
              }
          })
              
              
          
             
          
          }
         
    return (
        <div>
           <div>
           <Helmet>
        <title>PrimeFunds || Join As Employ</title>
        </Helmet></div> 
        <div className='flex justify-center items-center min-h-[calc(100vh-306px)]'>
      <div className=' w-full max-w-sm mx-auto overflow-hidden bg-white rounded-lg shadow-lg  lg:max-w-4xl '>
       
        <div className=" min-h-screen  ">
          <div className="hero-content flex-col ">
            <div className="text-center lg:text-left">
              <h1 className="text-5xl font-bold text-green-400">Join As Employee</h1>
             
            </div>
            <form    onSubmit={handleSubmit(onSubmit)}
             
              className="card flex-shrink-0 w-full max-w-sm shadow-2xl "
            >
              <div className="card-body">
                <div className="form-control">
                  <label className="label text-white">
                    <span className="label-text">Full Name</span>
                  </label>
                  <input name='name'
                    type="text"
                    placeholder="Full name"
                    className="input input-bordered"
                   
                    {...register("Name", { required: true })} />
                    {errors.Name && <span className='text-red-400'>This field is required</span>}
                 
                </div>
                <div className="form-control">
                  <label className="label text-green-400">
                    <span className="label-text">Email</span>
                  </label>
                  <input name='email'
                    type="text"
                    placeholder="email"
                    className="input input-bordered"
                   
                    {...register("email", { required: true })} />
                    {errors.email && <span className='text-red-400'>This field is required</span>}
                 
                </div>
                <div className="form-control  ">
                 <label className="label ">
                    <span className="label-text">Date Of Birth</span>
                  </label>
                
                 <DatePicker  className="border rounded-lg p-3 w-full" selected={startDate} onChange={(date) => setStartDate(date)} />
                 </div>
                 <div className="form-contro">
                  <label className="label ">
                    <span className="lebel-text ">Password</span>
                  </label>
                  <input name='password'
                    type="password"
                    placeholder="password"
                    className="input input-bordered w-full"
                   
                    {...register("password", { required: true })} />
                    {errors.password && <span className='text-red-400'>This field is required</span>}
                 
                </div>
                   
                <div className="form-control  ">
                 <label className="label ">
                    <span className="label-text">User Image</span>
                   
                  </label>
                  <input type="file" className="file-input file-input-bordered file-input-success w-full max-w-xs"
                   {...register("image", { required: true })} />
                   {errors.image && <span className='text-red-400'>This field is required</span>} 
                 
               
                 </div>
               
            
                <div className="form-control mt-6 p-0">
                  <button className="border bg-green-400 text-white rounded-lg p-3 ">Register</button>
                </div>
               
                <label className="label">
                  Have an account?{" "}
                  <Link to="/login" className="label-text-alt link link-hover">
                    Please Login
                  </Link>
                </label>
                <Toaster />
              </div>
            </form>
           
          </div>
        </div>
      </div>
      </div>
        </div>
    );
};

export default JoinAsEmploy;