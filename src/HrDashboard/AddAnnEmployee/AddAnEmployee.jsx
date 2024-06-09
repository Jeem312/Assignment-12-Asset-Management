import React, { useContext, useState } from 'react';
import useUser from '../../Hooks/useUser';
import { AuthContext } from '../../Provider/Provider';
import { Link } from 'react-router-dom';
import { FaUser } from 'react-icons/fa';
import useAxiosSecure from '../../Hooks/useAxiosSecure';
import toast from 'react-hot-toast';
import Swal from 'sweetalert2';

const AddAnEmployee = () => {
    const { user } = useContext(AuthContext);
    const [users, refetch] = useUser();
    const hrinfo = users?.find(u => u.email === user.email);
    const axiosSecure = useAxiosSecure();

    const [selectedEmployees, setSelectedEmployees] = useState([]);

    const employeeInfo = users.filter(employee => employee.companyStatus === 'none');
    const hrEmployee = users.filter(u => u.Hr_email === user?.email);
    const members_count = parseInt(hrinfo?.members_count || 0);

    const handleCheckboxChange = (email) => {
        setSelectedEmployees(prevSelected =>
            prevSelected.includes(email)
                ? prevSelected.filter(e => e !== email)
                : [...prevSelected, email]
        );
    };

    const handleAddSelectedMembers = () => {
        if (hrEmployee.length + selectedEmployees.length > members_count) {
            Swal.fire({
                icon: "error",
                title: "Oops...",
                text: "You have reached your employee limit",
            });
            return;
        }

        const updateInfo = selectedEmployees.map(email => ({
            email,
            Hr_email: user?.email,
            companyStatus: 'Yes',
            Company_logo: hrinfo?.Company_logo
        }));

        axiosSecure.patch('/users/bulk', { members: updateInfo })
            .then(res => {
                console.log('Bulk update response:', res.data);
                Swal.fire({
                    title: 'Success',
                    text: 'Added Employees Successfully',
                    icon: 'success',
                    confirmButtonText: 'Success'
                });
                refetch().then(() => {
                    console.log('Refetch completed');
                    setSelectedEmployees([]);
                });
            })
            
    };

    const handleAddMember = (email) => {
        if (hrEmployee.length >= members_count) {
            Swal.fire({
                icon: "error",
                title: "Oops...",
                text: "You have reached your employee limit",
            });
            return;
        }

        const updateInfo = {
            Hr_email: user?.email,
            companyStatus: 'Yes',
            Company_logo: hrinfo?.Company_logo
        };

        axiosSecure.patch(`/users/${email}`, updateInfo)
            .then(res => {
                console.log('Individual update response:', res.data);
                Swal.fire({
                    title: 'Success',
                    text: 'Added Employee Successfully',
                    icon: 'success',
                    confirmButtonText: 'Success'
                });
                refetch().then(() => {
                    console.log('Refetch completed');
                });
            })
           
    };

    return (
        <div>
            <div className="divider"></div>
            <div className='container mx-auto flex flex-col justify-center items-center'>
                <h1 className='text-xl text-green-400 justify-center items-center'>Your Employee Limit: {hrinfo?.members_count}</h1>
            </div>
            <div className='flex justify-center items-center'>
                <Link to='/package'>
                    <button className='text-green-400 border border-green-400 rounded-lg p-2 mt-4'>Increase Your Employee Limit</button>
                </Link>
            </div>
            <div className="divider"></div>
            <div className="overflow-x-auto">
                <table className="table">
                    <thead className='bg-green-400 text-white'>
                        <tr>
                            <th>#</th>
                            <th>Select</th>
                            <th>Image</th>
                            <th>Name</th>
                            <th>Email</th>
                            <th>Action</th>
                        </tr>
                    </thead>
                    <tbody>
                        {employeeInfo.map((employee, index) => (
                            <tr key={employee._id}>
                                <th>{index + 1}</th>
                                <td>
                                    <input 
                                        type="checkbox" 
                                        checked={selectedEmployees.includes(employee.email)} 
                                        onChange={() => handleCheckboxChange(employee.email)} 
                                    />
                                </td>
                                <td>
                                    <div className="flex items-center gap-3">
                                        <div className="avatar">
                                            <div className="mask mask-squircle w-12 h-12">
                                                <img src={employee?.image} alt="Avatar" />
                                            </div>
                                        </div>
                                    </div>
                                </td>
                                <td>{employee?.Name}</td>
                                <td>{employee?.email}</td>
                                <td>
                                    <button 
                                        onClick={() => handleAddMember(employee?.email)} 
                                        className="btn btn-ghost text-green-400 btn-xs"
                                    >
                                        Add To The Team <FaUser />
                                    </button>
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>
            <div className='flex justify-center items-center my-4'>
                <button 
                    className='btn bg-green-400 text-white'
                    onClick={handleAddSelectedMembers}
                    disabled={selectedEmployees.length === 0}
                >
                    Add Selected Members to the Team
                </button>
            </div>
        </div>
    );
};

export default AddAnEmployee;
