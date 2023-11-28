import { Link, NavLink, Outlet } from "react-router-dom";
import { RxDashboard } from "react-icons/rx";
import { VscGitPullRequestGoToChanges } from "react-icons/vsc";
import { IoCreateOutline } from "react-icons/io5";
import { FiUsers } from "react-icons/fi";
import { CiCircleList } from "react-icons/ci";
import { MdContentCopy } from "react-icons/md";
import { CgProfile } from "react-icons/cg";
import useUserData from "../../Hooks/useUserData";
import { useEffect, useState } from "react";

const Dashboard = () => {
    const [isAdmin, setIsAdmin] = useState(false)
    const [isVolunteer, setIsVolunteer] = useState(false)
    const {userRole} = useUserData()
    const [isLoading, setIsLoading] = useState(true);
    const isCurrentPath = window.location.pathname === '/dashboard';
    const activeClassName = isCurrentPath ? 'active' : '';
    console.log(isCurrentPath);
    

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
        return <span className="loading loading-spinner loading-sm"></span>
    }

    return (
        <div className="flex flex-col md:flex-row min-h-screen bg-slate-100 dashboard">
            <div className="py-5 md:py-7 px-4 min-h-full w-full md:w-[22%] bg-white text-[#151515]">
                <Link to="/" className="hidden md:block text-2xl font-bold"><span className="text-primary">Blooms</span>ForLife</Link>
                <div className="flex md:flex-col items-center justify-center">
                    <ul className="flex md:flex-col mt-0 lg:mt-8 space-y-0 md:space-y-2">
                        <li>
                            <Link to="/dashboard" className={`${activeClassName && 'active'} flex gap-2 cursor-pointer transition-colors hover:text-[#39A7FF] hover:bg-[#39a6ff34] p-2 rounded-lg`} exact>
                                <RxDashboard className="mt-[2px] text-xl md:text-lg" />
                                <span className="capitalize font-main font-medium text-[15px] hidden md:block">Dashboard</span>
                            </Link>
                        </li>
                        <li>
                            <NavLink to="/dashboard/my-donation-requests" className="flex gap-2 cursor-pointer transition-colors hover:text-[#39A7FF] hover:bg-[#39a6ff34] p-2 rounded-lg">
                                <VscGitPullRequestGoToChanges className="mt-[2px] text-xl md:text-lg" />
                                <span className="capitalize font-main font-medium text-[15px] hidden md:block">My Donation Requests</span>
                            </NavLink>
                        </li>
                        <li>
                            <NavLink to="/dashboard/create-donation-request" className="flex gap-2 cursor-pointer transition-colors hover:text-[#39A7FF] hover:bg-[#39a6ff34] p-2 rounded-lg">
                                <IoCreateOutline className="mt-[2px] text-xl md:text-lg" />
                                <span className="capitalize font-main font-medium text-[15px] hidden md:block">Create Donation Request</span>
                            </NavLink>
                        </li>
                        <li>
                            <NavLink to="/dashboard/profile" className="flex gap-2 cursor-pointer transition-colors hover:text-[#39A7FF] hover:bg-[#39a6ff34] p-2 rounded-lg">
                                <CgProfile className="mt-[2px] text-xl md:text-lg" />
                                <span className="capitalize font-main font-medium text-[15px] hidden md:block">My Profile</span>
                            </NavLink>
                        </li>
                        {
                            isAdmin &&
                            <li>
                                <NavLink to="/dashboard/all-users" className="flex gap-2 cursor-pointer transition-colors hover:text-[#39A7FF] hover:bg-[#39a6ff34] p-2 rounded-lg">
                                    <FiUsers className="mt-[2px] text-xl md:text-lg" />
                                    <span className="capitalize font-main font-medium text-[15px] hidden md:block">all users</span>
                                </NavLink>
                            </li>
                        }
                    </ul>
                    {
                        (isAdmin || isVolunteer) &&
                        <ul className="mt-1 flex md:flex-col space-y-0 md:space-y-2">                        
                            <li>                            
                                <NavLink to="/dashboard/all-blood-donation-request" className="flex gap-2 cursor-pointer transition-colors hover:text-[#39A7FF] hover:bg-[#39a6ff34] p-2 rounded-lg">
                                    <CiCircleList className="mt-[2px] text-xl md:text-lg" />
                                    <span className="capitalize font-main font-medium text-[15px] hidden md:block">All Blood Donation Request</span>
                                </NavLink>
                            </li>
                            <li>                            
                                <NavLink to="/dashboard/content-management" className="flex gap-2 cursor-pointer transition-colors hover:text-[#39A7FF] hover:bg-[#39a6ff34] p-2 rounded-lg">
                                    <MdContentCopy className="mt-[2px] text-xl md:text-lg" />
                                    <span className="capitalize font-main font-medium text-[15px] hidden md:block">Content Management</span>
                                </NavLink>
                            </li>
                        </ul>
                    }
                </div>
            </div>
            <div className="w-full md:w-[75%] p-3 md:p-10">
                <Outlet></Outlet>
            </div>
        </div>
    );
};

export default Dashboard;