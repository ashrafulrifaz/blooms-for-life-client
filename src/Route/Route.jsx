import { createBrowserRouter } from "react-router-dom";
import MainLayout from "../Layout/MainLayout";
import ErrorPage from "../Pages/ErrorPage/ErrorPage";
import Home from "../Pages/Home/Home";
import Registration from "../Pages/Registration/Registration";
import Login from "../Pages/Login/Login";
import Dashboard from "../Pages/Dashboard/Dashboard";
import PrivateRoute from "./PrivateRoute";
import UserHomePage from "../Pages/DashboardPages/UserDashboard/HomePage/UserHomePage";
import UserProfile from "../Pages/DashboardPages/UserDashboard/ProfilePage/UserProfile";
import CreateDonationRequest from "../Pages/DashboardPages/UserDashboard/CreateDonationRequest/CreateDonationRequest";
import MyDonationRequests from "../Pages/DashboardPages/UserDashboard/MyDonationRequests/MyDonationRequests";

const Route = createBrowserRouter([
    {
        path: '/',
        element: <MainLayout></MainLayout>,
        errorElement: <ErrorPage></ErrorPage>,
        children: [
            {
                path: '/',
                element: <Home></Home>
            },
            {
                path: '/login',
                element: <Login></Login>
            },
            {
                path: '/registration',
                element: <Registration></Registration>
            }
        ]
    },
    {
        path: '/dashboard',
        element: <PrivateRoute><Dashboard></Dashboard></PrivateRoute>,
        errorElement: <ErrorPage></ErrorPage>,
        children: [
            {
                path: '/dashboard',
                element: <UserHomePage></UserHomePage>
            },
            {
                path: '/dashboard/profile',
                element: <UserProfile></UserProfile>
            },
            {
                path: '/dashboard/create-donation-request',
                element: <CreateDonationRequest></CreateDonationRequest>
            },
            {
                path: '/dashboard/my-donation-requests',
                element: <MyDonationRequests></MyDonationRequests>
            }
        ]
    }
])

export default Route;