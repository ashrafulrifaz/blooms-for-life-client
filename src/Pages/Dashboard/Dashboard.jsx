import { Link, NavLink, Outlet } from "react-router-dom";
import { RxDashboard } from "react-icons/rx";
import { VscGitPullRequestGoToChanges } from "react-icons/vsc";
import { IoCreateOutline } from "react-icons/io5";
import { FiUsers } from "react-icons/fi";
import { CiCircleList } from "react-icons/ci";
import { MdContentCopy } from "react-icons/md";
import { CgProfile } from "react-icons/cg";
import { HiOutlineHome } from "react-icons/hi2";
import useUserData from "../../Hooks/useUserData";
import { useEffect, useState } from "react";

const Dashboard = () => {
    const [isAdmin, setIsAdmin] = useState(false)
    const [isVolunteer, setIsVolunteer] = useState(false)
    const {userRole} = useUserData()
    const [isLoading, setIsLoading] = useState(true);
    const isCurrentPath = window.location.pathname === '/dashboard';
    const activeClassName = isCurrentPath ? 'active' : '';   
    

    useEffect(() => {
        const loadingTimeout = setTimeout(() => {
            setIsLoading(false);
        }, 1000);
        
        if(userRole === 'admin'){
            setIsAdmin(true)
            return
        }
        if(userRole === 'volunteer'){
            setIsVolunteer(true)
            return
        }

        return () => clearTimeout(loadingTimeout);
    }, [userRole]);

    if (isLoading) {
        return <div className="py-7 text-center">
                    <span className="loading loading-spinner loading-lg"></span>
                </div>
    }

    return (
        <div className="flex flex-col sm:flex-row min-h-screen bg-slate-100 dashboard">
            <div className="sidebar">
                <Link to="/" className="hidden md:block text-xl lg:text-2xl font-bold"><span className="text-primary">Blooms</span>ForLife</Link>
                <div className="flex sm:flex-col items-center justify-center">
                    <ul className="flex sm:flex-col mt-0 sm:mt-5 lg:mt-8 space-y-0 md:space-y-2">
                        <li>
                            <Link to="/dashboard" className={`${activeClassName && 'active'}`} exact>
                                <RxDashboard className="mt-0 lg:mt-[2px] text-xl md:text-lg" />
                                <span className="capitalize font-main font-medium md:text-sm lg:text-[15px] hidden sm:block">Dashboard</span>
                            </Link>
                        </li>
                        <li>
                            <NavLink to="/dashboard/my-donation-requests">
                                <VscGitPullRequestGoToChanges className="mt-0 lg:mt-[2px] text-xl md:text-lg" />
                                <span className="capitalize font-main font-medium md:text-sm lg:text-[15px] hidden sm:block">My Donation Requests</span>
                            </NavLink>
                        </li>
                        <li>
                            <NavLink to="/dashboard/create-donation-request">
                                <IoCreateOutline className="mt-0 lg:mt-[2px] text-xl md:text-lg" />
                                <span className="capitalize font-main font-medium md:text-sm lg:text-[15px] hidden sm:block">Create Donation Request</span>
                            </NavLink>
                        </li>
                        {
                            isAdmin &&
                            <li>
                                <NavLink to="/dashboard/all-users">
                                    <FiUsers className="mt-0 lg:mt-[2px] text-xl md:text-lg" />
                                    <span className="capitalize font-main font-medium md:text-sm lg:text-[15px] hidden sm:block">all users</span>
                                </NavLink>
                            </li>
                        }
                        {
                            (isAdmin || isVolunteer) &&                        
                            <li>                            
                                <NavLink to="/dashboard/all-blood-donation-request">
                                    <CiCircleList className="mt-0 lg:mt-[2px] text-xl md:text-lg" />
                                    <span className="capitalize font-main font-medium md:text-sm lg:text-[15px] hidden sm:block">All Blood Donation Request</span>
                                </NavLink>
                            </li>
                        }
                        {
                            (isAdmin || isVolunteer) &&            
                            <li>                            
                                <NavLink to="/dashboard/content-management">
                                    <MdContentCopy className="mt-0 lg:mt-[2px] text-xl md:text-lg" />
                                    <span className="capitalize font-main font-medium md:text-sm lg:text-[15px] hidden sm:block">Content Management</span>
                                </NavLink>
                            </li>
                        }
                        <li>
                            <NavLink to="/dashboard/profile">
                                <CgProfile className="mt-0 lg:mt-[2px] text-xl md:text-lg" />
                                <span className="capitalize font-main font-medium md:text-sm lg:text-[15px] hidden sm:block">My Profile</span>
                            </NavLink>
                        </li>
                        <li>
                            <Link to="/">
                                <HiOutlineHome className="mt-0 lg:mt-[2px] text-xl md:text-lg" />
                                <span className="capitalize font-main font-medium md:text-sm lg:text-[15px] hidden sm:block">back to home</span>
                            </Link>
                        </li>
                    </ul>
                </div>
            </div>
            <div className="w-full sm:ml-[32%] sm:top-0 sm:right-0 lg:ml-[22%] p-3 md:p-5 lg:p-10">
                <Outlet></Outlet>
            </div>
        </div>
    );
};

export default Dashboard;