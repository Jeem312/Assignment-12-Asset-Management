import React, { useContext } from 'react';
import useUser from '../../Hooks/useUser';
import { AuthContext } from '../../Provider/Provider';
import { Helmet } from 'react-helmet-async';


const MyTeam = () => {
    const [users,refetch]=useUser();
    const {user} = useContext(AuthContext);
    const myInfo = users?.filter(p=>p.email === user.email);
    console.log(myInfo);
    const myHr = users?.filter(u=>u.email === myInfo[0].Hr_email);
    console.log(myHr)
    const myteam = users?.filter(u=>u.Hr_email === myInfo[0].Hr_email);
    console.log(myteam);
    const combinedTeam = [...(myHr || []), ...(myteam || [])];
    console.log(combinedTeam);
    return (
        <div>
        <Helmet>
            <title>PrimeFunds || My Team</title>
        </Helmet>
        {
           myHr.length === 0 ? 
            <div>
                <h1 className='flex justify-center items-center text-4xl my-36'>No team members found</h1>
            </div> : 
            <div className="container flex flex-col items-center justify-center p-4 mx-auto space-y-8 sm:p-10">
                <h1 className="text-4xl font-bold leading-none text-center sm:text-5xl text-green-400">My team</h1>
                <div className="flex flex-row flex-wrap-reverse justify-center">
                    {
                        combinedTeam.map(member => (
                            <div key={member._id} className="flex flex-col justify-center m-8 text-center">
                                <img src={member?.image? member.image : member?.Company_logo} className='self-center flex-shrink-0 w-24 h-24 mb-4 bg-center bg-cover rounded-full dark:bg-gray-500' alt={member?.Name} />
                                <p className="text-xl font-semibold leading-tight">{member?.Name}</p>
                                <p className="font-semibold leading-tight">{member.role}</p>
                            </div>
                        ))
                    }
                </div>
            </div>
        }
    </div>
        
    );
};

export default MyTeam;