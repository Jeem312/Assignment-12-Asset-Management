import React from 'react';
import PendingRequest from './PendingRequest';
import LimitedStock from './LimitedStock';
import TopMostReq from './TopMostReq';
import Piechart from './Piechart';

const HrHome = () => {
    return (
        <div className='container'>
            <div>
              <PendingRequest></PendingRequest>
            </div>
            <div>
                <TopMostReq></TopMostReq>
            </div>
           <div>
            <LimitedStock></LimitedStock>
           </div>
     <div>
        <Piechart></Piechart>
     </div>
        </div>
    );
};

export default HrHome;