import { createBrowserRouter } from "react-router-dom";
import MainLayout from "../Layout/MainLayout";
import ErrorPage from "../Pages/ErrorPage/ErrorPage";
import Home from "../Pages/Home/Home";
import Registration from "../Pages/Registration/Registration";
import Login from "../Pages/Login/Login";
import Dashboard from "../Pages/Dashboard/Dashboard";
import PrivateRoute from "./PrivateRoute";
import UserProfile from "../Pages/DashboardPages/UserDashboard/ProfilePage/UserProfile";
import CreateDonationRequest from "../Pages/DashboardPages/UserDashboard/CreateDonationRequest/CreateDonationRequest";
import MyDonationRequests from "../Pages/DashboardPages/UserDashboard/MyDonationRequests/MyDonationRequests";
import EditDonationRequest from "../Pages/DashboardPages/UserDashboard/MyDonationRequests/EditDonationRequest";
import DonationRequestDetails from "../Pages/DashboardPages/UserDashboard/MyDonationRequests/DonationRequestDetails";
import DashboardHome from "../Pages/DashboardPages/DashboardHome/DashboardHome";
import AllUsers from "../Pages/DashboardPages/AdminDashboard/AllUsers/AllUsers";
import AllDonationRequest from "../Pages/DashboardPages/AdminDashboard/AllDonationRequest/AllDonationRequest";
import ContentManagement from "../Pages/DashboardPages/AdminDashboard/ContentManagement/ContentManagement";
import AddBlog from "../Pages/DashboardPages/AdminDashboard/ContentManagement/AddBlog";
import EditBlog from "../Pages/DashboardPages/AdminDashboard/ContentManagement/EditBlog";
import DonationRequests from "../Pages/DonationRequests/DonationRequests";
import BloodDonationRequestDetails from "../Pages/DonationRequests/BloodDonationRequestDetails";
import Blog from "../Pages/Blog/Blog";
import SearchDonor from "../Pages/SearchDonor/SearchDonor";
import BlogDetails from "../Pages/Blog/BlogDetails";
import Funding from "../Pages/Funding/Funding";

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
            },
            {
                path: '/blood-donation-requests',
                element: <DonationRequests></DonationRequests>
            },
            {
                path: '/blood-donation-request/:id',
                element: <PrivateRoute><BloodDonationRequestDetails></BloodDonationRequestDetails></PrivateRoute>
            },
            {
                path: '/blog',
                element: <Blog></Blog>
            },
            {
                path: '/blog/:id',
                element: <BlogDetails></BlogDetails>
            },
            {
                path: '/search-donor',
                element: <SearchDonor></SearchDonor>
            },
            {
                path: '/fundings',
                element: <Funding></Funding>
            }
        ]
    },
    {
        path: 'dashboard',
        element: <PrivateRoute><Dashboard></Dashboard></PrivateRoute>,
        errorElement: <ErrorPage></ErrorPage>,
        children: [
            {
                path: '/dashboard',
                element: <DashboardHome></DashboardHome>
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
            },
            {
                path: '/dashboard/edit/:id',
                element: <EditDonationRequest></EditDonationRequest>
            },
            {
                path: '/dashboard/donation-request/:id',
                element: <DonationRequestDetails></DonationRequestDetails>
            },
            {
                path: '/dashboard/all-users',
                element: <AllUsers></AllUsers>
            },
            {
                path: '/dashboard/all-blood-donation-request',
                element: <AllDonationRequest></AllDonationRequest>
            },
            {
                path: '/dashboard/content-management',
                element: <ContentManagement></ContentManagement>
            },
            {
                path: '/dashboard/content-management/add-blog',
                element: <AddBlog></AddBlog>
            },
            {
                path: '/dashboard/edit-blog/:id',
                element: <EditBlog></EditBlog>
            }
        ]
    }
])

export default Route;