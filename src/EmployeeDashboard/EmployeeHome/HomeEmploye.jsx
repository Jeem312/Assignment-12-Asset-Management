import React, { useContext } from 'react';
import MyPendingReq from './MyPendingReq';
import MyMonthlyReq from './MyMonthlyReq';
import NoticeBoard from './NoticeBoard';
import useUser from '../../Hooks/useUser';
import { AuthContext } from '../../Provider/Provider';

import Review from './Review';


const HomeEmploye = () => {
    const [users] = useUser();
    const { user } = useContext(AuthContext);
    const myInfo = users?.filter(p => p.email === user?.email);
    const myHr = users?.find(u => u.Hr_email === myInfo[0]?.Hr_email);
    
    return (
        <div>
            {
                myHr ?  
               <div>
                 <div>
                  <MyPendingReq></MyPendingReq> 
               </div>
               <div>
                <MyMonthlyReq></MyMonthlyReq>
               </div>
               <div>
                   <NoticeBoard></NoticeBoard>
               </div>
               <div>
                <Review></Review>
               </div>
               </div> 
               :
               <div className='my-72'>
                <h1 className='text-3xl flex justify-center items-center text-red-600'>You Are Not Afflicted With Any Company.Contact with your HR</h1>
               </div>
            }
        </div>
    );
};

export default HomeEmploye;