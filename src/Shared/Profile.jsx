import { Helmet } from "react-helmet-async";
import useUser from "../Hooks/useUser";
import { useContext } from "react";
import { AuthContext } from "../Provider/Provider";
import ProfileModal from "./ProfileModal";


const Profile = () => {
    const {user} = useContext(AuthContext);
const [users]=useUser();
   const person = users.find(p=> p.email === user?.email);
//    console.log(person.Company_logo)

    return (
      <div>
         <div>
           <Helmet>
        <title>PrimeFunds || Profile</title>
        </Helmet></div> 
          <div className="container mx-auto flex justify-center items-center my-24">
          <div className="flex flex-col justify-center max-w-xs p-6 shadow-md rounded-xl sm:px-12  dark:bg-gray-50 dark:text-gray-800">
       <div className='my-2'>
       <img src={person?.Company_logo
? person?.Company_logo : 'https://i.postimg.cc/q7V3Q9ZV/user-3177440.png' } alt="" className="w-32 h-32 mx-auto rounded-full dark:bg-gray-500 aspect-square" />
       </div>
        <div className="space-y-4 text-center divide-y dark:divide-gray-300">
            <div className="my-2 space-y-1">
                <h2 className="text-xl font-semibold sm:text-2xl">{person?.Name}</h2>
                <p className="px-5 text-xs sm:text-base dark:text-gray-600">{person?.email}</p>
                <p className="px-5 text-xs sm:text-base dark:text-gray-600">{person?.role}</p>
            </div>
            <div className=" my-4">
               <ProfileModal></ProfileModal>
            </div>
    
          </div>
          </div>
          </div>
      </div>
    );
};

export default Profile;