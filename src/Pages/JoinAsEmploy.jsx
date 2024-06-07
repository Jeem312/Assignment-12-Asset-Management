import { Helmet } from "react-helmet-async";
import React, { useContext, useState } from 'react';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import { useForm} from "react-hook-form";

import DatePicker from "react-datepicker";

import "react-datepicker/dist/react-datepicker.css";


import toast, { Toaster } from "react-hot-toast";
import { AuthContext } from "../Provider/Provider";
import useAxiosPublic from "../Hooks/useAxiosPublic";


const JoinAsEmploy = () => {
    const [startDate, setStartDate] = useState(new Date());
    const {  createUser,updateUserProfile,googleLogin} =useContext(AuthContext);
        const axiosPublic = useAxiosPublic();
    const navigate = useNavigate();
      const from = "/";
    
    
        const {
            register,
       
            formState: { errors },
            handleSubmit,} = useForm()
    
          const onSubmit = (data) => {
            
            const {email,password,Name, image} = data;
            if (!/(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[!@#$%^&*]).{6,}/.test(password)) {
              toast.error("Password must have at least 1 uppercase letter, 1 lowercase letter, 1 special character, 1 numeric character, and be at least 6 characters long");
              return;
          }
          const info ={
            email: data.email,
            Name:data.Name,
            role:'Employee'
        }
        
            createUser(email,password)
            .then(result=>{
              console.log(result.user);
    
              if (result.user) {
                toast('Register Successfully');
               axiosPublic.post('/user',info)
               .then(res=>{console.log(res.data)})
                updateUserProfile(Name, image)
                navigate(from)
              
              }
          })
              
              
          
             
          
          }
          const handleSocialLogin = (socialProvider) => {
            socialProvider()
            .then((result) => {
              if (result.user) {
                const info ={
                  email: result.user.email,
                  Name:result.user.displayName,
                  role:'Employee'
              }
                toast('LogIn Successfully');
                axiosPublic.post('/user',info)
                .then(res=>{console.log(res.data)})
                toast('LogIn Successfully');
                navigate(from);
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
                   
              
               
            
                <div className="form-control mt-6 p-0">
                  <button className="border bg-green-400 text-white rounded-lg p-3 ">Register</button>
                </div>
                <div className="flex justify-center space-x-4">
            <button  onClick={() => handleSocialLogin(googleLogin)}
              aria-label="Log in with Google" className="p-3 rounded-sm">
                <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 32 32" className="w-5 h-5 fill-current text-green-400">
                    <path d="M16.318 13.714v5.484h9.078c-0.37 2.354-2.745 6.901-9.078 6.901-5.458 0-9.917-4.521-9.917-10.099s4.458-10.099 9.917-10.099c3.109 0 5.193 1.318 6.38 2.464l4.339-4.182c-2.786-2.599-6.396-4.182-10.719-4.182-8.844 0-16 7.151-16 16s7.156 16 16 16c9.234 0 15.365-6.49 15.365-15.635 0-1.052-0.115-1.854-0.255-2.651z"></path>
                </svg>
            </button>
          
           
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