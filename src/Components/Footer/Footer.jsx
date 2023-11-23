import { Link, NavLink } from 'react-router-dom';
import footerImage from '../../assets/footer-bg.png'

const Footer = () => {
    const footerBg = {
        background: `url('${footerImage}')`,
        backgroundSize: 'cover',
        backgroundPosition: 'bottom center'
    }

    return (
        <div className="border-t border-slate-200" style={footerBg}>
            <div className="grid grid-cols-4 gap-12 py-5 max-w-[1200px] mx-auto">
                <div>
                    <Link to="/" className="text-2xl font-bold"><span className="text-primary">Blooms</span>ForLife</Link>
                    <p className='text-slate-700 font-medium mt-2'>At BloomsForLife, we envision a world where every beat is a beacon of hope. We strive to build a community that understands the significance of each drop, a community united by the purpose of giving the gift of life.</p>
                </div>
                <div>
                    <h3 className='text-lg'>Links</h3>
                    <ul className='space-y-2 mt-3'>
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

export default Footer;