import React, { useContext } from 'react';
import { AuthContext } from '../../Provider/Provider';

// Import Swiper React components
import { Swiper, SwiperSlide } from 'swiper/react';
import 'swiper/css';
import 'swiper/css/navigation';
import 'swiper/css/pagination';

import { Navigation, Autoplay, Pagination } from 'swiper/modules';
import useReview from '../../Hooks/useReview';
import { Rating } from '@smastrom/react-rating';
import '@smastrom/react-rating/style.css';

const MyReview = () => {
    const [review, refetch] = useReview();
    const { user } = useContext(AuthContext);
    const myreviews = review.filter(item => item.Hr_email === user?.email);
    
    return (
        <div className=''> <div>
        <div className="divider"></div>
               <h1 className='text-2xl text-yellow-400  flex justify-center items-center my-4'>------Reviews-----</h1>
               <div className="divider "></div>
        </div>

          <div className='border border-green-100 rounded-lg justify-center items-center p-10 '>
          <Swiper
               
               pagination={{ clickable: true }}
               autoplay={{ delay: 3000, disableOnInteraction: false }}
               modules={[ Autoplay, Pagination]}
               className="mySwiper "
           >
               {myreviews.map(review => (
                   <SwiperSlide key={review._id}>
                       <div className='m-24 flex flex-col mx-24 my-16 items-center'>
                           <Rating
                               className='text-green-400'
                               style={{ maxWidth: 180 }}
                               value={review?.rating}
                               readOnly
                           />
                           <p className='py-14'>{review?.review}</p>
                           <h3 className='text-2xl text-green-400'>Review From:{review?.reviewer}</h3>
                       </div>
                   </SwiperSlide>
               ))}
           </Swiper>
          </div>
        </div>
    );
};

export default MyReview;
