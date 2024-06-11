import React, { useContext } from 'react';
import useAssets from '../../Hooks/useAssets';
import { AuthContext } from '../../Provider/Provider';

// Import Swiper React components
import { Swiper, SwiperSlide } from 'swiper/react';

// Import Swiper styles
import 'swiper/css';
import 'swiper/css/pagination';



// import required modules
import { Autoplay, Pagination } from 'swiper/modules';
const TopMostReq = () => {
    const [assets] =useAssets();
    const  {user} = useContext(AuthContext);
    
    const myAssets = assets.filter(item=>item.HrEmail===user?.email);
    // console.log(myAssets);
   
    const sortedAsset = myAssets.sort((a,b)=>b.requestedCount-a.requestedCount);
    
   
    
    return (
        <div>
             <div className="overflow-x-auto flex-1">
            <div className="divider"></div>
                <h1 className='text-2xl text-yellow-400  flex justify-center items-center my-4'>------Most Requested Items-----</h1>
                <div className="divider "></div></div>
             <Swiper
        slidesPerView={3}
        spaceBetween={30}
        autoplay={{
            delay: 2500,
            disableOnInteraction: false,
          }}
        pagination={{
          clickable: true,
         
        }}
        modules={[Pagination,Autoplay]}
        className="mySwiper"
      >
        {
                sortedAsset.slice(0,4).map(
                    item=>  <SwiperSlide key={item._id}>
                    <div className="card w-96 bg-base-100 shadow-xl my-8">
  <div className="card-body bg-green-50">
    <h2 className="card-title text-green-400 flex justify-center items-center">{item?.productName}</h2>
    <p className='text-green-400'>Requested:{item?.requestedCount}Times</p>
    <div className="card-actions justify-end">
      
    </div>
  </div>
</div>
                    </SwiperSlide>
                )
            }
       
      </Swiper>
        </div>
    );
};

export default TopMostReq;