import React from 'react';
import { BsLaptop } from 'react-icons/bs';
import { FaHeart } from 'react-icons/fa6';

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
                    <img src="https://i.ibb.co/SvDmBC2/austin-distel-Dfj-JMVhw-H-8-unsplash.jpg" alt="" className='rounded-lg'/>
                </div>
                </div>
                <div className='flex my-4'>
                      <div className='p-8 flex-1 '>
                    
                     <BsLaptop className='h-8 w-8' />
                   
                        <h1 className='my-4 text-3xl font-bold'>What we do</h1>
                        <p className=' text-gray-500'>We believe God has called us with a purpose to equip local churches to use the web effectively by getting them set up with creative and functional websites they can use right away. We know that the average church doesn’t have a web developer on staff; It’s Pastors, lay people, youth leaders or the sound guy who is in charge of the church website. We also know by experience that getting it right is an arduous task. We partner with church leadership teams by giving them a simple, effective path to getting the message of their church to the local area and the world!</p>
                      </div>
                      <div className='p-8 flex-1 '>
                    
                      <FaHeart className='h-8 w-8' />
                   
                        <h1 className='my-4 text-3xl font-bold'>Why we do it</h1>
                        <p className=' text-gray-500'>Our heart and desire is to see people become disciples of Jesus Christ. Our non-profit’s role in this  is to equip local churches to fulfill the Great Commission. Our world has never been more connected as now and technology never more advanced. We believe the message of the Gospel can be more readily available to people all over the world through Church websites. The average American spends 32 hours per month on the Internet, imagine if you could reach them for just a few minutes to share the Gospel. It’s more than a possibility. Your church can begin to use the Internet as a ministry and tool to reach thousands of unsaved people. That’s what we’re all about and that’s why we do it!</p>
                      </div>
                </div>
            </div>
      
    );
};

export default About;