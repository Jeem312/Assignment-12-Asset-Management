import React, { useContext } from 'react';
import useUser from '../../Hooks/useUser';
import { AuthContext } from '../../Provider/Provider';
import { Link } from 'react-router-dom';

import { FaUser } from 'react-icons/fa';
import useAxiosSecure from '../../Hooks/useAxiosSecure';
import toast from 'react-hot-toast';
import Swal from 'sweetalert2';

const AddAnEmployee = () => {
    const {user}=useContext(AuthContext);
const [users,refetch] = useUser();
const hrinfo = users?.find(u=>u.email===user.email);
const axiosSecure = useAxiosSecure();

// console.log (hrinfo)


const employeeInfo = users.filter(employee=> employee.companyStatus==='none');
console.log(employeeInfo);
const hrEmployee = users.filter(u=>u.Hr_email===user?.email);
// console.log(hrEmployee.length);
const members_count = parseInt(hrinfo.members_count);
// console.log(members_count);
const handleAddMember=(email)=>{
   if(hrEmployee.length >= members_count){
    Swal.fire({
        icon: "error",
        title: "Oops...",
        text: "You have Reached Your Employee Limit",
        
      });
   }
    
else{
    
    const updateInfo = {
        Hr_email:user?.email,
        companyStatus:'Yes',
        Company_logo:hrinfo.Company_logo
       }
       axiosSecure.patch(`/users/${email}`,updateInfo)
       .then(res=>{
        console.log(res.data);
        Swal.fire({
            title: 'success',
            text: 'Added Employee Successfully',
            icon: 'success',
            confirmButtonText: 'Success'
         
        })
        refetch();
       })
      
}
  
}

    return (
        <div>
              <div className="divider"></div>
           <div className='container mx-auto flex flex-col justify-center items-center'>
            <h1 className='text-xl text-green-400 justify-center items-center'>Your Employee Limit:{hrinfo?.members_count}</h1></div>
           <div className='flex justify-center items-center'> <Link to='/package'><button className=' text-green-400 border border-green-400 rounded-lg p-2 mt-4'>Increase Your Employee Limit</button></Link> </div>
            <div className="divider"></div>
         
           
            <div className="overflow-x-auto">
  <table className="table">
    {/* head */}
    <thead className='bg-green-400 text-white'>
      <tr>
        <th>
          #
        </th>
        <th>Image</th>
        <th>Name</th>
        <th>Email</th>
        <th>Action</th>
      </tr>
    </thead>
    <tbody>
      {/* row 1 */}
      {
        employeeInfo.map((employee,index)=> <tr key={employee._id}>
        <th>
         {index + 1}
        </th>
        <td>
          <div className="flex items-center gap-3">
            <div className="avatar">
              <div className="mask mask-squircle w-12 h-12">
                <img src={employee?.image} alt="Avatar Tailwind CSS Component" />
              </div>
            </div>
           
          </div>
        </td>
        <td>
         {employee?.Name}
          
        </td>
        <td>
         {employee?.email}
          
        </td>
        <td>
          <button onClick={()=>handleAddMember(employee?.email,employee?.image,employee?.Name)} className="btn btn-ghost text-green-400 btn-xs">Add To The Team <FaUser></FaUser></button>
        </td>
      </tr>)}
    
     
    
    </tbody>
   
    
  </table>
</div>

        </div>
    );
};

export default AddAnEmployee;