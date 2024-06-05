import React, { useContext } from 'react';
import { Link, NavLink, useNavigation } from 'react-router-dom';



const Navbar = () => {

   
  
   
   


    const links = <>
    <li className="font-bold text-green-400 "> <NavLink to="/">Home</NavLink></li>
    <li className="font-bold text-green-400"> <NavLink to="/joinAsEmploy">Join As Employ</NavLink> </li>
    <li className="font-bold text-green-400"> <NavLink to="/joinAsHr">Join As HR Manager</NavLink> </li>
    <li className="font-bold text-green-400"> <NavLink to="/login">LogIn</NavLink> </li>
  </>
    return (
        <div className='container mx-auto mb-10  '>
        <div className="navbar rounded-md">
<div className="navbar-start">
<div className="dropdown">
  <div tabIndex={0} role="button" className="btn btn-ghost lg:hidden">
    <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 6h16M4 12h8m-8 6h16" /></svg>
  </div>
  <ul tabIndex={0} className="menu menu-sm text-green-400  dropdown-content mt-3 z-[1] p-2 shadow rounded-box w-52">
   {
    links
   }
  </ul>
</div>
<Link to='/'  className=" text-2xl font-bold text-green-400 ">
 <div className='flex h-8 w-8 rounded-lg '>
 <img className='rounded-full' src="https://i.ibb.co/4464BkY/Whats-App-Image-2024-06-02-at-01-05-19-c4a98a44.jpg"
  alt="" />
  PrimeFunds
</div></Link>
</div>
<div className=" hidden lg:flex navbar-end">
<ul className="menu menu-horizontal px-1 text-green-400 ">
 {links}
</ul>
</div>

</div>
    </div>
   
    );
};

export default Navbar;