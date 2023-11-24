import loginImage from '../../assets/login.jpg'

const Login = () => {
    return (
        <div className="py-7 grid grid-cols-5 items-center mx-auto login">
            <div className='col-span-2'>
                <img src={loginImage} alt="" />
            </div>
            <div className="col-span-3">
                <h2 className='text-2xl text-center'>Login</h2>
                <form className='space-y-4 py-10 px-20'>
                    <div className='space-y-2'>
                        <label>Email*</label>
                        <input type="text" placeholder='Enter your email'/>
                    </div>           
                    <div className='space-y-2'>
                        <label>Password*</label>
                        <input type="password" placeholder='Enter your password' />
                    </div>  
                    <button className='px-10'>Login</button>
                </form>
            </div>
        </div>
    );
};

export default Login;