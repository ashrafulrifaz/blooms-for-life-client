import { Link } from 'react-router-dom';
import footerImage from '../../assets/footer-bg.png'
import paymentImage from '../../assets/payment.png'

const Footer = () => {
    const footerBg = {
        background: `url('${footerImage}')`,
        backgroundSize: 'cover',
        backgroundPosition: 'bottom center'
    }

    return (
        <div className="border-t border-slate-200" style={footerBg}>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 md:gap-12 py-5 max-w-[90%] md:max-w-[95%] xl:max-w-[1150px] mx-auto">
                <div>
                    <Link to="/" className="text-2xl font-bold"><span className="text-primary">Blooms</span>ForLife</Link>
                    <p className='text-slate-700 font-medium mt-2'>At BloomsForLife, we envision a world where every beat is a beacon of hope. We strive to build a community that understands the significance of each drop, a community united by the purpose of giving the gift of life.</p>
                </div>
                <div>
                    <h3 className='text-lg'>Links</h3>
                    <ul className='space-y-2 mt-3'>
                        <li>
                            <Link to="/" className="hover:text-red-700">Home</Link>    
                        </li>
                        <li>
                            <Link to="/donation-requests" className="hover:text-red-700">Donation Requests</Link>    
                        </li>
                        <li>
                            <Link to="/blog" className="hover:text-red-700">Blog</Link>    
                        </li>
                        <li>
                            <Link to="/login" className="hover:text-red-700">Login</Link>    
                        </li>
                        <li>
                            <Link to="/login" className="hover:text-red-700">Search Donor</Link>    
                        </li>
                    </ul>
                </div>
                <div className="cols-span-1 md:col-span-2">
                    <h1 className='font-second text-xl'>Our Supported Payment Method</h1>
                    <img src={paymentImage} className='w-full md:w-1/2 lg:w-full' alt="" />
                </div>
            </div>
        </div>
    );
};

export default Footer;