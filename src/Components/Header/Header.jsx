import { Link, NavLink } from "react-router-dom";

const Header = () => {

    return (
        <div className="border-b border-slate-200 py-1">
            <div className="max-w-[1150px] mx-auto">
                <div className="navbar">
                    <div className="flex-1">
                        <Link to="/" className="text-2xl font-bold"><span className="text-primary">Blooms</span>ForLife</Link>
                    </div>
                <div className="flex-none">
                    <ul className="flex gap-5 transition-all">
                        <li>
                            <NavLink to="/">Home</NavLink>    
                        </li>
                        <li>
                            <NavLink to="/donation-requests">Donation Requests</NavLink>    
                        </li>
                        <li>
                            <NavLink to="/blog">Blog</NavLink>    
                        </li>
                        <li>
                            <NavLink to="/login">Login</NavLink>    
                        </li>
                        <li>
                            <NavLink to="/registration">Registration</NavLink>    
                        </li>
                    </ul>
                </div>
                </div>
            </div>
        </div>
    );
};

export default Header;