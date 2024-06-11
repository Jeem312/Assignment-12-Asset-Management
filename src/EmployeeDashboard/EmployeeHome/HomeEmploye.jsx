import React from 'react';
import MyPendingReq from './MyPendingReq';
import MyMonthlyReq from './MyMonthlyReq';
import NoticeBoard from './NoticeBoard';

const HomeEmploye = () => {
    return (
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
        </div>
    );
};

export default HomeEmploye;