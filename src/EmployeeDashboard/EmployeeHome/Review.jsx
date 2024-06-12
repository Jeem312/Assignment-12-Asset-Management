import { Rating } from 'flowbite-react';
import React, { useContext, useState } from 'react';
import Swal from 'sweetalert2';
import useUser from '../../Hooks/useUser';
import { AuthContext } from '../../Provider/Provider';
import useAxiosSecure from '../../Hooks/useAxiosSecure';

const Review = () => {
    const [users] = useUser();
    const { user } = useContext(AuthContext);
    const [rating,setrating]=useState('');
    const axiosSecure = useAxiosSecure();

    const myInfo = users?.filter(p => p.email === user?.email);
    const myHr = users?.find(u => u.email === myInfo[0]?.Hr_email);

    const handleRating= (e)=>{
        const r=e.target.value;
        setrating(r);

    }
    const handleFeedback = e => {
        e.preventDefault();
        const review = e.target.review.value
        const data ={
            review,
            rating,
            Hr_email:myHr.email,
            reviewer:myInfo.Name

        }
  axiosSecure.post('/review',data)
  .then(res=>{
    console.log(res.data);
   
  })


        Swal.fire({
            icon: "success",
            title: "Thanks For Your Feedback",
            showConfirmButton: false,
            timer: 1500
          });
          e.target.reset();
    }
    return (
        <div className='container mx-auto'>
            <h1 className='text-yellow-400  mt-6 text-4xl font-bold flex justify-center items-center'> Your opinion matters!
            </h1>
            <div className=" container mx-auto my-14 flex flex-col border border-green-100 max-w-xl p-8 shadow-sm rounded-xl lg:p-12 dark:bg-gray-50 dark:text-gray-800">
                <div className="flex flex-col items-center w-full">
                    <h2 className="text-3xl font-semibold text-center"> FeedBack</h2>
                    <div className="flex flex-col items-center py-6 space-y-3">
                        <span className="text-center text-green-400">How was your experience?</span>
                        <div className="flex space-x-3 text-yellow-500">
                            <Rating>
                                <Rating.Star />
                                <Rating.Star />
                                <Rating.Star />
                                <Rating.Star />
                                <Rating.Star filled={false} />
                            </Rating>
                        </div>
                    </div>
                    <div className="flex flex-col w-full">
                        <form
                            onSubmit={handleFeedback}>
                            <div className='container mx-auto w-1/2 gap-4 my-6 '>
         
         

            <select className="select select-bordered w-full max-w-xs"  onChange={handleRating} required >
              <option disabled selected>Rating</option>
              <option></option>
              
              <option>1</option>
              <option>2</option>
              <option>3</option>
              <option>4</option>
              <option>5</option>
            </select>
          

        </div>
                            <textarea rows="3" placeholder="Message..." name='review' className="p-4 border border-green-400 rounded-md resize-none dark:text-gray-800 dark:bg-gray-50 w-full my-4 " required></textarea>
                            <div className=' flex justify-center items-center'>
                                <button className="btn py-4 my-8 font-semibold rounded-md bg-green-400 text-white dark:text-gray-50 dark:bg-violet-600">Leave feedback</button>
                            </div>
                        </form>
                    </div>
                </div>
                <div className="flex items-center justify-center">
                    <a rel="noopener noreferrer" href="#" className="text-sm text-blue-500 underline dark:text-gray-600">Maybe later</a>
                </div>
            </div>
        </div>
    );
};

export default Review;