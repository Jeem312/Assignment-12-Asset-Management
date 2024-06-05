import React from 'react';
import { Link } from 'react-router-dom';

const ErrorPage = () => {
    return (
        <div className='container mx-auto md:grid md:grid-cols-2'>
            <div>
                <img src="https://i.ibb.co/wsjw3nm/6325254.jpg" alt="" />
            </div>
           <div className='flex flex-col justify-center items-center my-4 mr-36'>
            <Link to='/'>
               <h1 className='text-4xl font-bold'>Wanna Go Home?</h1>
                <button className='btn bg-green-400 text-white'>Home</button></Link>
           </div>
        </div>
    );
};

export default ErrorPage;