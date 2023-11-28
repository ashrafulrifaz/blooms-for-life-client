import { Link } from 'react-router-dom';
import errorImage from '../../assets/404.jpg'

const ErrorPage = () => {
    return (
        <div>
            <img src={errorImage} alt="404" className='w-full md:w-4/5 lg:w-1/2 mx-auto' />
            <div className="text-center">
                <Link to="/">
                    <button>Back To Home</button>
                </Link>
            </div>
        </div>
    );
};

export default ErrorPage;