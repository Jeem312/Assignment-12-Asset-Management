import React from 'react';
import useRequestAssets from '../../Hooks/useRequestAssets';

const PendingRequest = () => {
    const [requstedAssets,refetch] = useRequestAssets();
   const pendingData = requstedAssets.filter(p=>p.status==='pending');
   console.log(pendingData);
    return (
        <div>
            
        </div>
    );
};

export default PendingRequest;