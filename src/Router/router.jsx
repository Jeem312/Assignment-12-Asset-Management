import { createBrowserRouter } from "react-router-dom";
import Main from '../LayOut/Main.jsx'
import ErrorPage from '../ErrorPage/ErrorPage.jsx'
import Home from '../WithoutLogInDashboard/Home.jsx'
import JoinAsEmploy from "../Pages/JoinAsEmploy.jsx";
import JoinAsHr from "../Pages/JoinAsHr.jsx";
import LogIn from "../Pages/LogIn.jsx";

import AddAsset from '../HrDashboard/AddAsset.jsx'
import Payment from "../Pages/Payment/Payment.jsx";
import PaymentModal from "../Pages/Payment/PaymentModal.jsx";
import HrRoute from "../HrRoute/HrRoute.jsx";
import Profile from "../Shared/Profile.jsx";
import MyAsset from "../EmployeeDashboard/MyAsset/MyAsset.jsx";
import MyTeam from "../EmployeeDashboard/MyTeam/MyTeam.jsx";
import RequestForAsset from "../EmployeeDashboard/RequestForAsset/RequestForAsset.jsx";
import AddAnEmployee from "../HrDashboard/AddAnnEmployee/AddAnEmployee.jsx";
import AllRequest from "../HrDashboard/AllRequest/AllRequest.jsx";
import AssetList from "../HrDashboard/AssetList/AssetList.jsx";
import MyEmployee from "../HrDashboard/MyEmployee/MyEmployee.jsx";
import AssetUpdate from "../HrDashboard/AssetList/AssetUpdate.jsx";
const router = createBrowserRouter([
    {
      path: "/",
      element: <Main></Main>,
      errorElement:<ErrorPage></ErrorPage>,
      children:[
        {
            path:'/',
            element: <Home></Home>
        },
        {
            path:'/joinAsEmploy',
            element: <JoinAsEmploy></JoinAsEmploy>
        },
        {
            path:'/joinAsHr',
            element: <JoinAsHr></JoinAsHr>
        },
        {
            path:'/login',
            element: <LogIn></LogIn>,
        },

        // employee routes
       
        {
            path:'/myAsset',
            element: <MyAsset></MyAsset>
        },
        {
            path:'/myteam',
            element: <MyTeam></MyTeam>
        },
        {
            path:'/requestForAsset',
            element: <RequestForAsset></RequestForAsset>
        },
        {
            path:'/profile',
            element: <Profile></Profile>
        },

        // hr routes
       
        {
            path:'/addAsset',
            element: <HrRoute><AddAsset></AddAsset></HrRoute>,
        },
        {
            path:'/addEmployee',
            element: <HrRoute><AddAnEmployee></AddAnEmployee></HrRoute>,
        },
        {
            path:'/allRequest',
            element: <HrRoute><AllRequest></AllRequest></HrRoute>,
        },
        {
            path:'/updateAsset/:id',
            element: <HrRoute><AssetUpdate></AssetUpdate></HrRoute>,
        },
        {
            path:'/assetList',
            element: <HrRoute><AssetList></AssetList></HrRoute>,
        },
        {
            path:'/myEmployee',
            element: <HrRoute><MyEmployee></MyEmployee></HrRoute>,
        },
        
        
        
      ]
    },
    {
        path:'/package',
        element: <PaymentModal></PaymentModal>,
    },
    {
        path:'/payment/:id',
        element: <Payment></Payment>,
    }
  ]);
  export default router