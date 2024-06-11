import React, { useContext } from 'react';
import useNotice from '../../Hooks/useNotice';
import useUser from '../../Hooks/useUser';
import { AuthContext } from '../../Provider/Provider';

const NoticeBoard = () => {
    const [notice,refetch] = useNotice();
    const [users] = useUser();
    const { user } = useContext(AuthContext);
    const myInfo = users?.filter(p => p.email === user?.email);
    const myHr = users?.find(u => u.email === myInfo[0]?.Hr_email);
    const mynotice  = notice.filter(n=> n.Hr_email === myHr?.email);
    // console.log(mynotice)
    // console.log(myHr)
    // console.log(notice)
    return (
        <div>
              <div>
         <div className="divider"></div>
                <h1 className='text-2xl text-yellow-400  flex justify-center items-center my-4'>------Notice Board-----</h1>
                <div className="divider "></div>
         </div>

         <div className='border border-green-100 rounded-lg my-14 p-6 '>
        
             <div className='flex '>
             <div className=' flex-1 '>
             <img src="https://i.ibb.co/GP5FcbH/notice-free-vector-734448-5.jpg" alt="" />
            </div>
            <div className='border border-yellow-400 p-10 rounded-lg flex-1'>
                <h2 className='text-2xl flex justify-center items-center text-yellow-500'>Your Notice</h2>
             {
                mynotice.map((n,index)=> <div className='my-4' key={n._id}>
                    <p  className='text-gray-500' key={n._id}><span className='text-yellow-500 font-bold'>{index+1}.Notice:</span>{n.notice}</p>
                    <p className=''><span className='font-bold'>Published Date:</span>{n.date}</p>
                </div>

                )
             }
                </div> 
            </div>
                </div> 
        </div>
    );
};

export default NoticeBoard;