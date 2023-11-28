import phoneIcon from '../../../assets/phone.png'
import emailIcon from '../../../assets/envelope-plus.png'
import { toast } from 'react-toastify';

const Contact = () => {

    const handleContact = e => {
        e.preventDefault()
        console.log('clicked');
        toast("Wow so easy !")
    }
 
    return (
        <div className="py-10 grid grid-cols-1 lg:grid-cols-2 items-center contact max-w-[90%] lg:max-w-[1150px] mx-auto">
            <div className="space-y-4">
                <h2 className="font-second font-bold text-3xl md:text-4xl">Get In Touch</h2>
                <div className="flex items-center gap-4">
                    <div className='w-9 p-2.5 bg-[#AACBFF] rounded-lg rotate-45'>
                        <img src={phoneIcon} className='-rotate-45' alt="" />
                    </div>
                    <div>
                        <h3 className='text-lg'>Phone</h3>
                        <p className='font-medium'>+880 01643876985</p>
                    </div>
                </div>
                <div className="flex items-center gap-4">
                    <div className='w-9 p-2.5 bg-[#E5D4FF] rounded-lg rotate-45'>
                        <img src={emailIcon} className='-rotate-45' alt="" />
                    </div>
                    <div>
                        <h3 className='text-lg'>E-mail</h3>
                        <p className='font-medium'>bloomsforlife@gmail.com</p>
                    </div>
                </div>
            </div>
            <div className='mt-8 lg:mt-0'>
                <form onSubmit={handleContact} className='space-y-4 p-4 md:p-7 border border-slate-300 rounded-lg'>
                    <div className='space-y-2'>
                        <label>Name</label>
                        <input type="text" placeholder='Enter your name'/>
                    </div>           
                    <div className='space-y-2'>
                        <label>Email</label>
                        <input type="email" placeholder='Enter your email'/>
                    </div>           
                    <div className='space-y-2'>
                        <label>Subject</label>
                        <input type="text" placeholder='Enter your subject'/>
                    </div>           
                    <div className='space-y-2'>
                        <label>Message</label>
                        <textarea type="text" placeholder='Enter your message' />
                    </div>  
                    <button className='px-10'>Send</button>
                </form>
            </div>
        </div>
    );
};

export default Contact;