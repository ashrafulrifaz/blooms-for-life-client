import { Link, NavLink, Outlet } from "react-router-dom";
import { RxDashboard } from "react-icons/rx";
import { VscGitPullRequestGoToChanges } from "react-icons/vsc";
import { IoCreateOutline } from "react-icons/io5";
import { FiUsers } from "react-icons/fi";
import { CiCircleList } from "react-icons/ci";
import { MdContentCopy } from "react-icons/md";
import { CgProfile } from "react-icons/cg";
import useUserData from "../../Hooks/useUserData";

const Dashboard = () => {
    const {userRole} = useUserData()

    return (
        <div className="flex min-h-screen bg-slate-100 dashboard">
            <div className="py-7 px-4 min-h-full w-[22%] bg-white text-[#151515]">
                <Link to="/" className="text-2xl font-bold"><span className="text-primary">Blooms</span>ForLife</Link>
                <ul className="mt-8 space-y-2">
                    <li>
                        <NavLink to="/dashboard" className="flex gap-2 cursor-pointer transition-colors hover:text-[#39A7FF] hover:bg-[#39a6ff34] p-2 rounded-lg">
                            <RxDashboard className="mt-[2px] text-lg" />
                            <span className="capitalize font-main font-medium text-[15px]">Dashboard</span>
                        </NavLink>
                    </li>
                    <li>
                        <NavLink to="/dashboard/my-donation-requests" className="flex gap-2 cursor-pointer transition-colors hover:text-[#39A7FF] hover:bg-[#39a6ff34] p-2 rounded-lg">
                            <VscGitPullRequestGoToChanges className="mt-[2px] text-lg" />
                            <span className="capitalize font-main font-medium text-[15px]">My Donation Requests</span>
                        </NavLink>
                    </li>
                    <li>
                        <NavLink to="/dashboard/create-donation-request" className="flex gap-2 cursor-pointer transition-colors hover:text-[#39A7FF] hover:bg-[#39a6ff34] p-2 rounded-lg">
                            <IoCreateOutline className="mt-[2px] text-lg" />
                            <span className="capitalize font-main font-medium text-[15px]">Create Donation Request</span>
                        </NavLink>
                    </li>
                    <li>
                        <NavLink to="/dashboard/profile" className="flex gap-2 cursor-pointer transition-colors hover:text-[#39A7FF] hover:bg-[#39a6ff34] p-2 rounded-lg">
                            <CgProfile className="mt-[2px] text-lg" />
                            <span className="capitalize font-main font-medium text-[15px]">My Profile</span>
                        </NavLink>
                    </li>
                </ul>
                { userRole === 'admin' ? 
                <ul className="space-y-2 mt-1">
                    <li>
                        <NavLink to="/dashboard/all-users" className="flex gap-2 cursor-pointer transition-colors hover:text-[#39A7FF] hover:bg-[#39a6ff34] p-2 rounded-lg">
                            <FiUsers className="mt-[2px] text-lg" />
                            <span className="capitalize font-main font-medium text-[15px]">all users</span>
                        </NavLink>
                    </li>
                    <li>                            
                        <NavLink to="/dashboard/all-blood-donation-request" className="flex gap-2 cursor-pointer transition-colors hover:text-[#39A7FF] hover:bg-[#39a6ff34] p-2 rounded-lg">
                            <CiCircleList className="mt-[2px] text-lg" />
                            <span className="capitalize font-main font-medium text-[15px]">All Blood Donation Request</span>
                        </NavLink>
                    </li>
                    <li>                            
                        <NavLink to="/dashboard/content-management" className="flex gap-2 cursor-pointer transition-colors hover:text-[#39A7FF] hover:bg-[#39a6ff34] p-2 rounded-lg">
                            <MdContentCopy className="mt-[2px] text-lg" />
                            <span className="capitalize font-main font-medium text-[15px]">Content Management</span>
                        </NavLink>
                    </li>
                </ul>
                :
                <div className="space-y-2">
                    
                </div>}
            </div>
            <div className="w-[75%] p-10">
                <Outlet></Outlet>
            </div>
        </div>
    );
};

export default Dashboard;