import { createBrowserRouter } from "react-router-dom";
import Main from '../LayOut/Main.jsx'
import ErrorPage from '../ErrorPage/ErrorPage.jsx'
import Home from '../WithoutLogInDashboard/Home.jsx'
import JoinAsEmploy from "../Pages/JoinAsEmploy.jsx";
import JoinAsHr from "../Pages/JoinAsHr.jsx";
import LogIn from "../Pages/LogIn.jsx";
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
        }
      ]
    },
  ]);
  export default router