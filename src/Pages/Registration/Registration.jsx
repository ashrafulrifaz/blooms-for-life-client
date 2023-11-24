import { useContext, useEffect, useState } from 'react';
import registrationImage from '../../assets/registration.jpg'
import axios from 'axios';
import { useForm } from 'react-hook-form';
import { AuthContext } from '../../Provider/Provider';
import { Link, useNavigate } from 'react-router-dom';

const Registration = () => {
    const [selectedDistrict, setSelectedDistrict] = useState(null)
    const [districts, setDistrict] = useState([])
    const [upazilas, setUpazilas] = useState([])
    const { register, handleSubmit, formState: { errors } } = useForm()
    const {RegisterUser} = useContext(AuthContext)
    const navigate = useNavigate()

    const selectedDistrictId = districts.find(district => district.name === selectedDistrict) || {}
    const currentUpazilas = upazilas.filter(upazila => selectedDistrictId.id === upazila.district_id) || []

    useEffect(() => {
        axios.get('district.json')
        .then(res => setDistrict(res.data))

        axios.get('upazilas.json')
        .then(res => setUpazilas(res.data))
    }, [])


    const onSubmit = (data) => {
        console.log(data);
        RegisterUser(data.email, data.password)
            .then(result => {
                navigate('/')
                console.log('result', result);
            })
            .catch(error => console.log(error.message))
    }

    return (
        <div className="py-7 grid grid-cols-3 items-center mx-auto registration">
            <div>
                <img src={registrationImage} alt="" />
            </div>
            <div className="col-span-2">
                <h2 className='text-2xl text-center'>Register</h2>
                <form onSubmit={handleSubmit(onSubmit)} className='space-y-4 py-10 px-20'>
                    <div className="grid grid-cols-2 gap-5">
                        <div className='space-y-2'>
                            <label>Name*</label>
                            <input type="text" placeholder='Enter your name'/>
                        </div>
                        <div className='space-y-2'>
                            <label>Blood Group*</label>
                            <select>
                                <option value="Blood Group" selected disabled>Blood Group</option>                                
                                <option value="A+">A+</option>                                
                                <option value="A-">A-</option>                                
                                <option value="B+">B+</option>                                
                                <option value="B-">B-</option>                                
                                <option value="AB+">AB+</option>                                
                                <option value="AB-">AB-</option>                                
                                <option value="O+">O+</option>                                
                                <option value="O-">O-</option>                                
                            </select>
                        </div>
                    </div>  
                    <div className='space-y-2'>
                        <label>Email*</label>
                        <input {...register("email", { required: true })} type="text" placeholder='Enter your email'/>
                    </div>    
                    <div className="grid grid-cols-2 gap-5">
                        <div className='space-y-2'>
                            <label>District*</label>
                            <select onChange={(e) => setSelectedDistrict(e.target.value)} value={selectedDistrict}>
                                <option value="District" selected disabled>District</option>
                                {
                                    districts && districts.map(district => 
                                    <option key={district.id} value={district.name}>{district.name}</option>)
                                }
                            </select>
                        </div>
                        <div className='space-y-2'>
                            <label>Upazila*</label>
                           <select>
                                <option value="Upazila" selected disabled>Upazila</option>
                                {
                                    currentUpazilas && currentUpazilas.map(upazila => 
                                    <option key={upazila.id} value={upazila.name}>{upazila.name}</option>)
                                }
                            </select>
                        </div>
                    </div>      
                    <div className='space-y-2'>
                        <label>Image*</label>
                        <input type="file" accept=".jpg, .jpeg, .png, .webp" style={{width: '50%', border: 'none', padding: '5px'}} />
                    </div>         
                    <div className="grid grid-cols-2 gap-5">
                        <div className='space-y-2'>
                            <label>Password*</label>
                            <input {...register("password", { required: true })} type="password" placeholder='Enter your password' />
                        </div>  
                        <div className='space-y-2'>
                            <label>Confirm Password*</label>
                            <input type="password" placeholder='Confirm your password' />
                        </div>  
                    </div>      
                    <button className='px-10'>Register</button>
                    <p className='font-medium'>Already have an account? <Link to="/login" className='font-bold text-primary hover:underline'>Login</Link></p>
                </form>
            </div>
        </div>
    );
};

export default Registration;