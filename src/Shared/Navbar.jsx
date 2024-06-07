import React, { useContext } from 'react';
import { Link, NavLink, useNavigate, useNavigation } from 'react-router-dom';
import { AuthContext } from '../Provider/Provider';
import useHr from '../Hooks/useHr';
import useEmplyee from '../Hooks/useEmplyee';



const Navbar = () => {

  const navigate = useNavigate();
  const {user,logOut} = useContext(AuthContext);
   const [isHr,isHrLoading] =useHr();
   const [isEmployee,isEmployeeLoading]=useEmplyee();
   const handleLogOut = ()=>{
    logOut()
    .then(()=>{
      navigate('/')

    })
    .catch(error => console.log(error))
   }

     const links = <>
   
    
   {
    !user && 
     <div className='flex'>
      <li className="font-bold text-green-400 "> <NavLink to="/">Home</NavLink></li>
       <li className="font-bold text-green-400"> <NavLink to="/joinAsEmploy">Join As Employee</NavLink> </li>
    <li className="font-bold text-green-400"> <NavLink to="/joinAsHr">Join As HR Manager</NavLink> </li> 
     </div>
   
   }
   {
    user && isEmployee &&
     <div className='flex'>
     <li className="font-bold text-green-400 "> <NavLink to="/employeeHome">Home</NavLink></li>
    <li className="font-bold text-green-400"> <NavLink to="/dashboard">My Assets</NavLink> </li> 
    <li className="font-bold text-green-400"> <NavLink to="/dashboard">My Team</NavLink> </li> 
    <li className="font-bold text-green-400"> <NavLink to="/dashboard">Request for an Asset</NavLink> </li> 
    <li className="font-bold text-green-400"> <NavLink to="/profile">Profile</NavLink> </li>
     </div>
   
   }
   {
    user && isHr &&
     <div className='flex'>
       <li className="font-bold text-green-400 "> <NavLink to="/hrHome">Home</NavLink></li>
    <li className="font-bold text-green-400"> <NavLink to="/dashboard">All Requests</NavLink> </li> 
    <li className="font-bold text-green-400"> <NavLink to="/dashboard">Asset List</NavLink> </li> 
    <li className="font-bold text-green-400"> <NavLink to="/addAsset">Add an Asset</NavLink> </li> 
    <li className="font-bold text-green-400"> <NavLink to="/dashboard">Add an Employee</NavLink> </li> 
    <li className="font-bold text-green-400"> <NavLink to="/dashboard">My Employee List</NavLink> </li> 
    <li className="font-bold text-green-400"> <NavLink to="/profile">Profile</NavLink> </li> 
     </div>
   
   }
  
 
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
<div className=" hidden lg:flex navbar-center">
<ul className="menu menu-horizontal px-1 text-green-400 ">
 {links}
</ul>
</div>
<div className="navbar-end gap-2">

{
                user ?  <div className="dropdown dropdown-end inline-flex">
                <div tabIndex={0} role="button" className="btn btn-ghost btn-circle avatar">
                <div className="w-10  rounded-full">
                <div>
                  <img src={user?.photoURL || "https://i.postimg.cc/q7V3Q9ZV/user-3177440.png" } />
                  </div>
                </div>
                <ul tabIndex={0} className="mt-20 z-[1] p-2 shadow menu menu-sm dropdown-content bg-base-100 rounded-box w-52">
                  <li>
                    <a className="justify-between">
                    {user?.displayName||'user name not found'}

                     
                    </a>
                  </li>
  
                </ul>
                </div>
                <div className='mt-2 bg-green-400 text-white btn '>
                             <button
                             onClick={handleLogOut}
                                className=" btn-sm   ">Logout</button>

                </div>
              </div> :
                <div>
               
                <Link to='/login'> <button className=' btn bg-green-400 text-white'>LogIn</button></Link>
                </div>
               
                   
            }
</div>
</div>
    </div>
   
    );
};

export default Navbar;