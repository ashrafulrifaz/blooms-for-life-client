import { useContext } from "react";
import { Link, NavLink } from "react-router-dom";
import { AuthContext } from "../../Provider/Provider";

const Header = () => {
    const {user, LogOutUser} = useContext(AuthContext)

    return (
        <div className="border-b border-slate-200 py-1">
            <div className="max-w-[1150px] mx-auto">
                <div className="navbar">
                    <div className="flex-1">
                        <Link to="/" className="text-2xl font-bold transition-all"><span className="text-primary">Blooms</span>ForLife</Link>
                    </div>
                <div className="flex-none">
                    <ul className="flex gap-5 transition-all">
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
                                <a className="cursor-pointer" onClick={() => LogOutUser()}>Log Out</a>    
                            </li>
                        }
                    </ul>
                </div>
                </div>
            </div>
        </div>
    );
};

export default Header;