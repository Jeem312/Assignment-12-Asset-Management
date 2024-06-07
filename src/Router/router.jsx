import { createBrowserRouter } from "react-router-dom";
import Main from '../LayOut/Main.jsx'
import ErrorPage from '../ErrorPage/ErrorPage.jsx'
import Home from '../WithoutLogInDashboard/Home.jsx'
import JoinAsEmploy from "../Pages/JoinAsEmploy.jsx";
import JoinAsHr from "../Pages/JoinAsHr.jsx";
import LogIn from "../Pages/LogIn.jsx";
import EmployeeHome from "../EmployeeDashboard/EmployeeHome.jsx";
import HrHome from "../HrDashboard/HrHome/HrHome.jsx";
import AddAsset from '../HrDashboard/AddAsset.jsx'
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
        {
            path:'/employeeHome',
            element: <EmployeeHome></EmployeeHome>
        },
        {
            path:'/hrHome',
            element: <HrHome></HrHome>,
        },
        {
            path:'/addAsset',
            element: <AddAsset></AddAsset>,
        }
      ]
    },
  ]);
  export default router