import { Outlet, useNavigation } from "react-router-dom";
import Navbar from "../Shared/Navbar";
import { Hourglass } from "react-loader-spinner";
import Footer from "../WithoutLogInDashboard/Footer";


const Main = () => {
    const navigation = useNavigation();
    return (
        <div className="">
             <div className='container my-34 mx-auto'>
            <Navbar></Navbar>
           
     
      
            {
        navigation.state === "loading"?  <div className='flex justify-center items-center' >
        
 <Hourglass
  visible={true}
  height="80"
  width="80"
  ariaLabel="hourglass-loading"
  wrapperStyle={{}}
  wrapperClass=""
  colors={['#306cce', '#72a1ed']}
  />
        </div> :  <Outlet></Outlet> 
       }
           <div>
            <Footer></Footer>
           </div>
            
        </div>
           </div>

    );
};

export default Main;