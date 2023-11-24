import { Link } from 'react-router-dom';
import bannerImg from '../../../assets/banner.png'

const Banner = () => {

    return (
        <div className="min-h-screen w-full grid grid-cols-2 gap-6 items-center" id='banner'>
            <div className='space-y-3'>
                <p className='capitalize text-lg'>donate blood, save life</p>
                <h2 className='uppercase text-5xl leading-normal'>your <span className='text-primary'>blood</span> can bring smile in other person face</h2>
                <div className="flex gap-3">
                    <Link to="/registration">
                        <button style={{border: '1px solid #FF4F5A'}} className='donor_button'>Join as a Donor</button>
                    </Link>
                    <Link to="/search-donor">
                        <button style={{border: '1px solid #FF4F5A'}} className='search_button'>Search Donor</button>
                    </Link>
                </div>
            </div>
            <div>
                <img src={bannerImg} className='w-full' alt="" />
            </div>
        </div>
    );
};

export default Banner;