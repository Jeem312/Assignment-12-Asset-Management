import React, { useContext } from 'react';
import { AuthContext } from '../Provider/Provider';
import usePayments from '../Hooks/usePayments';
import { useNavigate } from 'react-router-dom';

const HrRoute = ({children}) => {
    const {user,loading} =useContext(AuthContext);
    const navigate = useNavigate();
    const [payments,isPending] =usePayments();
    // console.log(payments)
   const isPaid = payments?.find(p=>p.email===user?.email);
//    console.log(isPaid)
   if (isPending && loading){
   <div><span className="loading loading-dots loading-md"></span></div>
     }
   if(isPaid){
    return children
   }
   else{
    navigate('/package')
   }
};

export default HrRoute;