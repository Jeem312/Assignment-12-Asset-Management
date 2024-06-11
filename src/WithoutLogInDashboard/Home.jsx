import React, { useContext } from 'react';
import Navbar from '../Shared/Navbar';
import { useNavigation } from 'react-router-dom';
import { Helmet } from 'react-helmet-async';
import Banner from './Banner/Banner';
import About from './About/About';
import Package from './Package/Package';
import useEmplyee from '../Hooks/useEmplyee';
import useHr from '../Hooks/useHr';
import { AuthContext } from '../Provider/Provider';
import HrHome from '../HrDashboard/HrHome/HrHome';

import HomeEmploye from '../EmployeeDashboard/EmployeeHome/HomeEmploye';



const Home = () => {
  const [isEmployee,isEmployeeLoading]=useEmplyee();
  const [isHr,isHrLoading]=useHr();
  const {user}= useContext(AuthContext);
  return (
    <div>
      <Helmet>
        <title>PrimeFunds || Home</title>
      </Helmet>
    {
      !user && <div>
        <div className='container mx-auto my-24'>
      <Banner></Banner>
    </div>
    <div className='container mx-auto my-24'>
      <Package></Package>
    </div>
    <div className='container mx-auto my-24'>
      <About></About>
    </div>
      </div>
    }
         {
          isHr && <div>
            <HrHome></HrHome>
          </div>
         }
         {
          isEmployee && <div>
              <HomeEmploye></HomeEmploye>
          </div>
         }
      </div>

  );
};

export default Home;