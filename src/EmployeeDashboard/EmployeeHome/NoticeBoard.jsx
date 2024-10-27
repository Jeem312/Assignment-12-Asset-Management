import React, { useContext } from 'react';
import useNotice from '../../Hooks/useNotice';
import useUser from '../../Hooks/useUser';
import { AuthContext } from '../../Provider/Provider';

const NoticeBoard = () => {
    const [notice,] = useNotice();
    const [users] = useUser();
    const { user } = useContext(AuthContext);
    const myInfo = users?.filter(p => p.email === user?.email);
    const myHr = users?.find(u => u.email === myInfo[0]?.Hr_email);
    const mynotice  = notice.filter(n=> n.Hr_email === myHr?.email);
    const sortedNotice = mynotice?.sort(
        (a, b) => new Date(`${b.date} `) - new Date(`${a.date} `)
      );
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
                {sortedNotice.map((n, index) => (
              <div className="my-6 p-4 border-b border-gray-300" key={n._id}>
                <h3 className="text-lg font-semibold text-yellow-400 mb-2 flex justify-center items-center underline">
                  Notice: {index + 1}.
                </h3>
                <p className="text-gray-800 text-base mb-2">
                  Dear Employee,
                </p>
                <p className="text-gray-800 text-base mb-2">
                  {n.notice}
                </p>
                <p className="text-sm text-gray-500">
                  <span className="font-bold">Published Date :</span> {n.date} 
                </p>
              </div>
            ))}
                </div> 
            </div>
                </div> 
        </div>
    );
};

export default NoticeBoard;