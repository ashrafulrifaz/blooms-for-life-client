import { Link, useNavigate } from 'react-router-dom';
import loginImage from '../../assets/login.jpg'
import { useContext } from 'react';
import { AuthContext } from '../../Provider/Provider';
import { useForm } from 'react-hook-form';

const Login = () => {
    const {LoginUser} = useContext(AuthContext)
    const { register, handleSubmit, formState: { errors } } = useForm()
    const navigate = useNavigate()

    const onSubmit = data => {
        LoginUser(data.email, data.password)
            .then(result => {
                navigate('/')
                console.log('result', result);
            })
            .catch(error => console.log(error.message))
    }
 

    return (
        <div className="py-7 grid grid-cols-5 items-center max-w-[90%] md:max-w-[1150px] mx-auto login">
            <div className='col-span-0 md:col-span-2 hidden md:block'>
                <img src={loginImage} alt="" />
            </div>
            <div className="col-span-5 md:col-span-3">
                <h2 className='text-2xl text-center'>Login</h2>
                <form onSubmit={handleSubmit(onSubmit)} className='space-y-4 py-10 px-0 md:px-20'>
                    <div className='space-y-2'>
                        <label>Email*</label>
                        <input {...register("email", { required: true })} type="text" placeholder='Enter your email'/>
                    </div>           
                    <div className='space-y-2'>
                        <label>Password*</label>
                        <input {...register("password", { required: true })} type="password" placeholder='Enter your password' />
                    </div>  
                    <button className='px-10 bg-[#007CFF] hover:bg-[#007bffc0] transition-all'>Login</button>
                    <p className='font-medium'>Dont{"'"}t have an account? <Link to="/registration" className='font-bold text-[#007CFF] hover:underline'>Register</Link></p>
                </form>
            </div>
        </div>
    );
};

export default Login;