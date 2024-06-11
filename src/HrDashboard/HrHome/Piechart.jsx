import React from 'react';

import useAssets from '../../Hooks/useAssets';

const Piechart = () => {
    const [assets] =useAssets();
    const nonReturnable= assets.filter(item=>item.productType==='NonReturnable') ;
    const nonReturnableLength = nonReturnable.length;
    const returnable= assets.filter(item=>item.productType==='ReturnAble') ;
    const returnableLength = returnable.length;
    console.log(returnableLength);
    return (
        <div>
            
        </div>
    );
};

export default Piechart;