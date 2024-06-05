
import React, { useRef, useState } from 'react';
// Import Swiper React components
import { Swiper, SwiperSlide } from 'swiper/react';

// Import Swiper styles
import 'swiper/css';
import 'swiper/css/navigation';

import './styles.css';

// import required modules
import { Autoplay, Navigation, Pagination } from 'swiper/modules';
import { Link } from 'react-router-dom';
import { FaArrowRightLong } from 'react-icons/fa6';


const Banner = () => {
   
    return (
      <>
   <div style={{height: '600px', borderRadius: '10px', overflow: 'hidden'}}>
   <Swiper 
     autoplay={{
      delay: 3500,
      disableOnInteraction: false,
    }}
   navigation={true}  
   modules={[Autoplay,Pagination]}
    className="mySwiper"  style={{height: ''}}>

  <SwiperSlide style={{backgroundImage: `url(https://i.ibb.co/qnKd46w/investment-business-budget-credit-costs-concept.jpg)`, backgroundRepeat: 'no-repeat', backgroundSize: 'cover',borderRadius:'10px',height: '100%'
}}>
  <div>
  <div className='text-5xl font-bold text-white my-4'>
      Welcome To PrimeFunds
    </div>
    <Link to='/joinAsHr'>
      <button className='btn bg-green-400 text-white border-green-400'>Join As Hr Manager<FaArrowRightLong /></button> 
    </Link>
  </div>
  </SwiperSlide>
  <SwiperSlide style={{backgroundImage: `url(https://i.ibb.co/hccv3Bn/business-people-working-with-ipad-high-angle.jpg)`, backgroundRepeat: 'no-repeat', backgroundSize: 'cover',borderRadius:'10px',height: '100%'
}}>
  <div>
    <div className='text-5xl font-bold text-white my-4'>
      Welcome To PrimeFunds
    </div>
    <Link to='/joinAsEmploy'>
   
      <button className='btn bg-green-400 text-white border-green-400'>Join As Employee<FaArrowRightLong /></button> 
    </Link>
  </div>
  </SwiperSlide>

</Swiper>

   </div>
    </>
    );
};

export default Banner;