import { Link, useNavigate } from 'react-router-dom';
import bannerImg from '../../../assets/banner.png'
import bannerBgImg from '../../../assets/banner-bg.png'
import useAuth from '../../../Hooks/useAuth';

const Banner = () => {
    const {user} = useAuth()
    const navigate = useNavigate()
    const bannerStyle = {
        background: `url('${bannerBgImg}')`,
        backgroundSize: 'cover',
        backgroundPosition: 'center left'
    }

    const handleNewDonor = () => {
        if(user){
            return console.log('you already a donor');
        } 
        navigate('/registration')
    }

    return (
        <div style={bannerStyle}>
            <div className="min-h-screen w-full grid grid-cols-2 gap-6 items-center max-w-[1150px] mx-auto" id='banner'>
                <div className='space-y-3'>
                    <p className='capitalize text-lg'>donate blood, save life</p>
                    <h2 className='uppercase text-5xl leading-normal'>your <span className='text-primary'>blood</span> can bring smile in other person face</h2>
                    <div className="flex gap-3">
                        <button onClick={handleNewDonor} style={{border: '1px solid #FF4F5A'}} className='donor_button'>Join as a Donor</button>
                        <Link to="/search-donor">
                            <button style={{border: '1px solid #FF4F5A'}} className='search_button'>Search Donor</button>
                        </Link>
                    </div>
                </div>
                <div>
                    <img src={bannerImg} className='w-full' alt="" />
                </div>
            </div>
        </div>
    );
};

export default Banner;