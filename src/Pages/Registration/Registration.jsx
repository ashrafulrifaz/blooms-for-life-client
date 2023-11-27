import { useContext, useState } from 'react';
import registrationImage from '../../assets/registration.jpg'
import { useForm } from 'react-hook-form';
import { AuthContext } from '../../Provider/Provider';
import { Link, useNavigate } from 'react-router-dom';
import useAxiosPublic from '../../Hooks/useAxiosPublic';
import { updateProfile } from 'firebase/auth';
import axios from 'axios';

const Registration = () => {
    const [selectedDistrict, setSelectedDistrict] = useState(null)
    const [passError, setPassError] = useState(null)
    const [loadingRegister, setLoadingRegister] = useState(false);
    const { register, handleSubmit, formState: { errors } } = useForm()
    const {RegisterUser, user, setUser, auth, districts, upazilas} = useContext(AuthContext)
    const navigate = useNavigate()
    const axiosPublic = useAxiosPublic()

    const image_hosting_key = import.meta.env.VITE_IMAGE_HOSTING_API_KEY
    const image_hosting_url = `https://api.imgbb.com/1/upload?key=${image_hosting_key}`

    const selectedDistrictId = districts.find(district => district.name === selectedDistrict) || {}
    const currentUpazilas = upazilas.filter(upazila => selectedDistrictId.id === upazila.district_id) || []


    const onSubmit = async(data) => {
        setLoadingRegister(true)
        if(data.password !== data.confirm){
            setPassError('password not matching')
            setLoadingRegister(false)
            return
        }
        setPassError(null)

        const imageFile = {image: data.image[0]}
        const res = await axios.post(image_hosting_url, imageFile, {
            headers: {
                'Content-Type': 'multipart/form-data',
            }
        })
        if(res.data.success){
            const userInfo = {
                name: data.name,
                email: data.email,
                blood_group: data.blood, 
                district: data.district,
                upazila: data.upazila,
                image: res.data.data.display_url,
                password: data.password,
                role: 'donor',
                status: 'active'
            }
            RegisterUser(data.email, data.password)
            .then(() => {
                updateProfile(auth.currentUser, {
                   displayName: data.name, photoURL: res.data.data.display_url
                })
                setUser({...user, displayName: data.name, photoURL: res.data.data.display_url})
                axiosPublic.post('/users', userInfo)
                .then(res => {
                    if(res.data.success){
                        navigate('/')
                        setLoadingRegister(false)
                    }
                })
            })
            .catch(error => {
                console.log(error.message)
                setLoadingRegister(false)
                return
            })
        }
        setLoadingRegister(false)
        
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
                            <input {...register("name", { required: true })} type="text" placeholder='Enter your name'/>
                            {errors.name && <span className='text-red-500 font-medium text-sm'>Name is required</span>}
                        </div>
                        <div className='space-y-2'>
                            <label>Blood Group*</label>
                            <select {...register("blood", { required: true })}>
                                <option value='' selected disabled>Blood Group</option>                                
                                <option value="A+">A+</option>                                
                                <option value="A-">A-</option>                                
                                <option value="B+">B+</option>                                
                                <option value="B-">B-</option>                                
                                <option value="AB+">AB+</option>                                
                                <option value="AB-">AB-</option>                                
                                <option value="O+">O+</option>                                
                                <option value="O-">O-</option>                                
                            </select>
                            {errors.blood && <span className='text-red-500 font-medium text-sm'>Blood Group is required</span>}
                        </div>
                    </div>  
                    <div className='space-y-2'>
                        <label>Email*</label>
                        <input {...register("email", { required: true })} type="text" placeholder='Enter your email'/>
                        {errors.email && <span className='text-red-500 font-medium text-sm'>Email is required</span>}
                    </div>    
                    <div className="grid grid-cols-2 gap-5">
                        <div className='space-y-2'>
                            <label>District*</label>
                            <select {...register("district", { required: true })} onChange={(e) => setSelectedDistrict(e.target.value)} value={selectedDistrict}>
                                <option value='' selected disabled>District</option>
                                {
                                    districts && districts.map(district => 
                                    <option key={district.id} value={district.name}>{district.name}</option>)
                                }
                            </select>
                            {errors.district && <span className='text-red-500 font-medium text-sm'>District is required</span>}
                        </div>
                        <div className='space-y-2'>
                            <label>Upazila*</label>
                           <select {...register("upazila", { required: true })}>
                                <option value='' selected disabled>Upazila</option>
                                {
                                    currentUpazilas.length > 0 ? 
                                    currentUpazilas.map(upazila => 
                                    <option key={upazila.id} value={upazila.name}>{upazila.name}</option>)
                                    :
                                    upazilas.map(upazila => 
                                    <option key={upazila.id} value={upazila.name}>{upazila.name}</option>)
                                }
                            </select>
                            {errors.upazila && <span className='text-red-500 font-medium text-sm'>Upazila is required</span>}
                        </div>
                    </div>      
                    <div className='space-y-2'>
                        <label>Image*</label>
                        <input {...register("image", { required: true })} type="file" accept=".jpg, .jpeg, .png, .webp" style={{width: '50%', border: 'none', padding: '5px'}} />
                        {errors.image && <span className='text-red-500 font-medium text-sm'>Image is required</span>} 
                    </div>        
                    <div className="grid grid-cols-2 gap-5">
                        <div className='space-y-2'>
                            <label>Password*</label>
                            <input {...register("password", { required: true })} type="password" placeholder='Enter your password' />
                            {errors.password && <span className='text-red-500 font-medium text-sm'>Password is required</span>}
                        </div>  
                        <div className='space-y-2'>
                            <label>Confirm Password*</label>
                            <input {...register("confirm", { required: true })} type="password" placeholder='Confirm your password' />
                            {errors.confirm && <span className='text-red-500 font-medium text-sm'>Confirm your Password</span>}
                        </div>  
                    </div>    
                    {passError && <span className='text-red-500 font-medium text-sm block'>{passError}</span>}  
                    <button className='px-10 flex items-center gap-3'>
                        <span>Register</span>
                        {loadingRegister && <span className="loading loading-spinner loading-sm"></span>}
                    </button>
                    <p className='font-medium'>Already have an account? <Link to="/login" className='font-bold text-primary hover:underline'>Login</Link></p>
                </form>
            </div>
        </div>
    );
};

export default Registration;