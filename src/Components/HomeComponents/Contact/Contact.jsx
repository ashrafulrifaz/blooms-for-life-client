import phoneIcon from '../../../assets/phone.png'
import emailIcon from '../../../assets/envelope-plus.png'

const Contact = () => {
    return (
        <div className="py-10 grid grid-cols-2 items-center contact">
            <div className="space-y-4">
                <h2 className="font-second font-bold text-2xl">Get In Touch</h2>
                <div className="flex items-center gap-4">
                    <div className='w-8 p-2 bg-[#AACBFF] rounded-lg rotate-45'>
                        <img src={phoneIcon} className='-rotate-45' alt="" />
                    </div>
                    <div>
                        <h3>Phone</h3>
                        <p className='font-medium text-sm'>+880 01643876985</p>
                    </div>
                </div>
                <div className="flex items-center gap-4">
                    <div className='w-8 p-2 bg-[#E5D4FF] rounded-lg rotate-45'>
                        <img src={emailIcon} className='-rotate-45' alt="" />
                    </div>
                    <div>
                        <h3>E-mail</h3>
                        <p className='font-medium text-sm'>bloomsforlife@gmail.com</p>
                    </div>
                </div>
            </div>
            <div>
                <form className='space-y-4 py-10 px-20 border border-slate-200 rounded-lg'>
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

export default Contact;