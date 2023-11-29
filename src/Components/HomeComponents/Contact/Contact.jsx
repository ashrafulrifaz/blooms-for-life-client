import phoneIcon from '../../../assets/phone.png'
import emailIcon from '../../../assets/envelope-plus.png'
import Swal from 'sweetalert2';
import { FaFacebookF, FaTwitter, FaInstagram } from "react-icons/fa";

const Contact = () => {

    const handleContact = e => {
        e.preventDefault()
        const form = e.target
        Swal.fire({
            title: "Form Submitted",
            icon: "success"
            })
            form.reset()
    }
 
    return (
        <div className="py-10 grid grid-cols-1 lg:grid-cols-2 items-center contact max-w-[90%] xl:max-w-[1150px] mx-auto">
            <div className="space-y-4">
                <h2 className="font-second font-bold text-3xl md:text-4xl">Get In Touch</h2>
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-1 space-y-4">
                    <div className='space-y-4'>
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
                    <div className='space-y-4'>
                        <h3>Social Links:</h3>
                        <div className='flex gap-6 items-center'>
                            <a href='https://facebook.com' className='w-9 p-2.5 bg-[#0867ff36] rounded-lg rotate-45 cursor-pointer hover:scale-110 transition-all' id='social'>
                                <FaFacebookF className='-rotate-45 text-[#0866FF]'/>
                            </a>
                            <a href='https://x.com' className='w-9 p-2.5 bg-[#1DA1F236] rounded-lg rotate-45 cursor-pointer hover:scale-110 transition-all' id='social'>
                                <FaTwitter className='-rotate-45 text-[#1DA1F2]'/>
                            </a>
                            <a href='https://instagram.com' className='w-9 p-2.5 bg-[#C837AB36] rounded-lg rotate-45 cursor-pointer hover:scale-110 transition-all' id='social'>
                                <FaInstagram className='-rotate-45 text-[#C837AB]'/>
                            </a>
                        </div>
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