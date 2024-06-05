import React from 'react';
import Navbar from '../Shared/Navbar';
import { useNavigation } from 'react-router-dom';
import { Helmet } from 'react-helmet-async';
import Banner from './Banner/Banner';
import About from './About/About';
import Package from './Package/Package';


const Home = () => {

  return (
    <div>
      <Helmet>
        <title>PrimeFunds || Home</title>
      </Helmet>
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

  );
};

export default Home;