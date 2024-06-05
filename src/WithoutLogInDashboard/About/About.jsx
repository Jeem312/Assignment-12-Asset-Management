import React from 'react';
import { BsLaptop } from 'react-icons/bs';
import { FaGear, FaHandshake, FaHeart } from 'react-icons/fa6';

const About = () => {
  return (
    <div className='p-8'>
      <h1 className='flex justify-center items-center text-4xl text-green-400 font-bold my-8'>About Us</h1>

      <div className='flex flex-col md:flex-row  '>
        <div className='flex-1'>
          <h1 className='text-5xl my-8'>Our team’s goal is <br />  to provide you  <br />  management plan <br />  <span className='text-green-400'> that secures and <br /> grows your wealth</span></h1>

          <p className='tex-2xl text-gray-400 w-96'>Our team is led by seasoned professionals with a passion for financial excellence and a commitment to helping clients achieve their financial goals. We currently have seven team members with a diverse range of skills and expertise, each bringing something unique to the table. </p>
          <h1 className='my-10 text-2xl  w-96'>Our #1 goal is to ensure your financial success and security.</h1>




        </div>
        <div className='flex-1'>
          <img src="https://i.ibb.co/SvDmBC2/austin-distel-Dfj-JMVhw-H-8-unsplash.jpg" alt="" className='rounded-lg' />
        </div>
      </div>
      <div className='flex my-4 gap-4 '>
        <div className='p-8 flex-1 border border-green-400 rounded-lg'>

          <BsLaptop className='h-8 w-8' />

          <h1 className='my-4 text-3xl font-bold'>What we do</h1>
          <p className=' text-gray-500'>
            We empower local churches by providing them with creative and functional websites that are easy to set up and manage. Understanding that most churches lack a dedicated web developer, we streamline the process so that pastors, laypeople, youth leaders, or sound technicians can effectively communicate their church's message to both their local community and the world. Our mission is to simplify web management, enabling churches to focus on their spiritual outreach while we handle the technical details, ensuring a smooth and stress-free experience for everyone involved.</p>
        </div>
        <div className='p-8 flex-1 border border-green-400 rounded-lg '>

          <FaHeart className='h-8 w-8' />

          <h1 className='my-4 text-3xl font-bold'>Why we do it</h1>
          <p className=' text-gray-500'>
            We believe God has called us with a purpose to equip local churches to use the web effectively, allowing them to spread their message far and wide. Recognizing that most churches lack a dedicated web developer, we understand the challenges pastors, laypeople, youth leaders, or sound technicians face in managing a website. Our mission is to simplify this arduous task, providing a seamless path for church leadership teams to effectively communicate their message to both their local community and the world. By handling the technical details and offering ongoing support, we enable churches to focus on their spiritual outreach, community engagement, and fulfilling their mission without the added stress of web management.</p>
        </div>
       
      </div>
      <div className='flex my-4 gap-4'>
        <div className='p-8 flex-1 border border-green-400 rounded-lg'>

          <FaGear className='h-8 w-8' />

          <h1 className='my-4 text-3xl font-bold'>How We Do It</h1>
          <p className=' text-gray-500'>
          We use a streamlined process that begins with understanding the unique needs and goals of each church. Our team of experienced web designers and developers then creates a customized, user-friendly website that aligns with the church's vision. We provide comprehensive training and ongoing support to ensure that the church staff can easily manage and update the site. Additionally, we offer resources and tools to enhance online engagement, such as integrated social media, event calendars, and sermon archives.</p>
        </div>
        <div className='p-8 flex-1 border border-green-400 rounded-lg'>

          <FaHandshake className='h-8 w-8' />

          <h1 className='my-4 text-3xl font-bold'>Our Commitment</h1>
          <p className=' text-gray-500'>
          Our commitment is to deliver high-quality, reliable, and aesthetically pleasing websites that truly reflect the heart and soul of each church. We are dedicated to being a partner in the church's mission, offering continuous support and updates to keep their online presence fresh and effective. We believe in the power of technology to expand a church's reach and impact, and we are passionate about helping churches connect with their communities and beyond in meaningful ways.</p>
        </div>
       
      </div>
    </div>

  );
};

export default About;