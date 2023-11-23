import { NavLink } from "react-router-dom";

const Header = () => {
    return (
        <div className="py-2 max-w-[1200px] mx-auto">
            <div className="navbar">
                <div className="flex-1">
                    <a className="text-2xl font-bold">BloomsForLife</a>
                </div>
            <div className="flex-none">
                <ul className="flex gap-5 transition-all">
                    <li>
                        <NavLink to="/" className="hover:text-red-700">Home</NavLink>    
                    </li>
                    <li>
                        <NavLink to="/donation-requests" className="hover:text-red-700">Donation Requests</NavLink>    
                    </li>
                    <li>
                        <NavLink to="/blog" className="hover:text-red-700">Blog</NavLink>    
                    </li>
                    <li>
                        <NavLink to="/login" className="hover:text-red-700">Login</NavLink>    
                    </li>
                </ul>
            </div>
            </div>
        </div>
    );
};

export default Header;