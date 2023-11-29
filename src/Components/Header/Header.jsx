import { useContext } from "react";
import { Link, NavLink } from "react-router-dom";
import { AuthContext } from "../../Provider/Provider";
import useAxiosPublic from "../../Hooks/useAxiosPublic";
import { FaBarsStaggered } from "react-icons/fa6";

const Header = () => {
    const {user, LogOutUser} = useContext(AuthContext)
    const axiosPublic = useAxiosPublic()

    const handleLogOutUser = () => {
        LogOutUser()
        .then(() => {            
            const userInfo = {email: user?.email}
            axiosPublic.post('/logout', userInfo, {withCredentials: true})
            .then(res => {
                console.log(res.data);
            })
        })
    }

    return (
        <div className="border-b border-slate-200 py-1">
            <div className="max-w-[1150px] mx-auto flex justify-between">
                <div className="navbar justify-between">
                    <div className="flex-1">
                        <Link to="/" className="text-2xl font-bold transition-all"><span className="text-primary">Blooms</span>ForLife</Link>
                    </div>
                    <ul className="gap-5 transition-all hidden lg:flex">
                        <li>
                            <NavLink to="/">Home</NavLink>    
                        </li>
                        <li>
                            <NavLink to="/blood-donation-requests">Donation Requests</NavLink>    
                        </li>
                        <li>
                            <NavLink to="/blog">Blog</NavLink>    
                        </li>
                        {
                            user && 
                            <li>
                                <NavLink to="/dashboard">Dashboard</NavLink>    
                            </li>
                        }
                        {
                            user && 
                            <li>
                                <NavLink to="/fundings">Fundings</NavLink>    
                            </li>
                        }
                        {
                            !user &&  
                            <li>
                                <NavLink to="/login">Login</NavLink>    
                            </li>
                        }
                        {
                            !user &&  
                            <li>
                                <NavLink to="/registration">Registration</NavLink>    
                            </li>
                        }
                        {
                            user && 
                            <li>
                                <a className="cursor-pointer" onClick={handleLogOutUser}>Log Out</a>    
                            </li>
                        }
                    </ul>
                    <div className="drawer drawer-end lg:hidden z-10">
                        <input id="my-drawer-4" type="checkbox" className="drawer-toggle" />
                        <div className="drawer-content">
                            <label htmlFor="my-drawer-4" className="drawer-button mt-0 flex justify-end">
                            <FaBarsStaggered className="text-xl" />
                            </label>
                        </div> 
                        <div className="drawer-side">
                            <label htmlFor="my-drawer-4" aria-label="close sidebar" className="drawer-overlay mt-0">
                            </label>
                            <ul className="flex flex-col menu w-60 md:w-72 px-8 min-h-full bg-white text-base-content" id="nav_item">
                                <li>
                                    <NavLink to="/">Home</NavLink> 
                                </li>
                                <li>
                                    <NavLink to="/blood-donation-requests">Donation Requests</NavLink>    
                                </li>
                                <li>
                                    <NavLink to="/blog">Blog</NavLink>    
                                </li>
                                {
                                user && 
                                <li>
                                    <NavLink to="/dashboard">Dashboard</NavLink>    
                                </li>
                                }
                                {
                                    user && 
                                    <li>
                                        <NavLink to="/fundings">Fundings</NavLink>    
                                    </li>
                                }
                                {
                                    !user &&  
                                    <li>
                                        <NavLink to="/login">Login</NavLink>    
                                    </li>
                                }
                                {
                                    !user &&  
                                    <li>
                                        <NavLink to="/registration">Registration</NavLink>    
                                    </li>
                                }
                                {
                                    user && 
                                    <li>
                                        <a className="cursor-pointer" onClick={handleLogOutUser}>Log Out</a>    
                                    </li>
                                }
                            </ul>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Header;