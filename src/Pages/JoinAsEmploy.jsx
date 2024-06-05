import { Helmet } from "react-helmet-async";
import React, { useContext, useState } from 'react';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import { useForm} from "react-hook-form";

import DatePicker from "react-datepicker";

import "react-datepicker/dist/react-datepicker.css";


import toast, { Toaster } from "react-hot-toast";
import { AuthContext } from "../Provider/Provider";


const JoinAsEmploy = () => {
    const [startDate, setStartDate] = useState(new Date());
    const {  createUser,updateUserProfile} =useContext(AuthContext);

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
            
            
            createUser(email,password)
            .then(result=>{
              console.log(result.user);
    
              if (result.user) {
                toast('Register Successfully');
               
                updateUserProfile(Name, image)
                navigate(from)
              
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
                <div className="form-control ">
                  <label className="label ">
                    <span className="label-text">Date Of Birth</span>
                  </label>
                  <DatePicker selected={startDate} onChange={(date) => setStartDate(date)} />
                   
                   
                </div>
                <div className="form-contro ">
                  <label className="label ">
                    <span className="lebel-text ">Password</span>
                  </label>
                  <input name='password'
                    type="password"
                    placeholder="password"
                    className="input input-bordered"
                   
                    {...register("password", { required: true })} />
                    {errors.password && <span className='text-red-400'>This field is required</span>}
                 
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