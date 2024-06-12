import React, { useContext } from 'react';
import PendingRequest from './PendingRequest';
import LimitedStock from './LimitedStock';
import TopMostReq from './TopMostReq';
import AddNotice from './AddNotice';
import MyReview from './MyReview';



const HrHome = () => {
   
    return (
        <div className='container mx-auto my-24'>
        
            <div>
              <PendingRequest></PendingRequest>
            </div>
            <div>
                <TopMostReq></TopMostReq>
            </div>
           <div className=''>
            <LimitedStock></LimitedStock>
           </div>
           <div>
            <AddNotice></AddNotice>
           </div>
           <div>
            <MyReview></MyReview>
           </div>
    
        </div>
    );
};

export default HrHome;