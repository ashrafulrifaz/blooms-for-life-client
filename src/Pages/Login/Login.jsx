import { Link, useNavigate } from 'react-router-dom';
import loginImage from '../../assets/login.jpg'
import { useContext } from 'react';
import { AuthContext } from '../../Provider/Provider';
import { useForm } from 'react-hook-form';
import { useState } from 'react';
import { IoEyeOutline, IoEyeOffOutline } from "react-icons/io5";

const Login = () => {
    const {LoginUser} = useContext(AuthContext)
    const { register, handleSubmit, formState: { errors } } = useForm()
    const navigate = useNavigate()
    const [loadingLogin, setLoadingLogin] = useState(false);
    const [showPass, setShowPass] = useState(false)

    const onSubmit = data => {
        setLoadingLogin(true)
        LoginUser(data.email, data.password)
            .then(() => {
                navigate('/')
                setLoadingLogin(false)
            })
            .catch(error => console.log(error.message))
        setLoadingLogin(false)
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
                            {errors.email && <span className='text-red-500 font-medium text-sm'>Email is required</span>}
                    </div>           
                    <div className='space-y-2 relative'>
                        <label>Password*</label>
                        <div>
                            <input {...register("password", { required: true })} type={`${showPass ? 'text' : 'password'}`} placeholder='Enter your password' />
                            <span onClick={() => setShowPass(!showPass)}>
                                {
                                    showPass ? 
                                    <IoEyeOutline className={`h-8 w-5 absolute top-1/2 right-3 cursor-pointer`}/>
                                    :                                    
                                    <IoEyeOffOutline className={`h-8 w-5 absolute top-1/2 right-3 cursor-pointer`}/>
                                }
                            </span>
                        </div>
                        {errors.password && <span className='text-red-500 font-medium text-sm'>Password is required</span>}
                    </div>  
                    <button className='px-10 flex items-center gap-3 bg-[#007CFF] hover:bg-[#007bffc0]'>
                        <span>Login</span>
                        {loadingLogin && <span className="loading loading-spinner loading-sm"></span>}
                    </button>
                    <p className='font-medium'>Dont{"'"}t have an account? <Link to="/registration" className='font-bold text-[#007CFF] hover:underline'>Register</Link></p>
                </form>
            </div>
        </div>
    );
};

export default Login;