import { useQuery } from "@tanstack/react-query";
import useAuth from "../../../Hooks/useAuth";
import useAxiosPublic from "../../../Hooks/useAxiosPublic";
import { useForm } from "react-hook-form";
import { useContext, useState } from "react";
import { CiEdit } from "react-icons/ci";
import { AuthContext } from "../../../Provider/Provider";

const UserProfile = () => {
    const {user} = useAuth()
    const axiosSecure = useAxiosPublic()
    const [isEdit, setIsEdit] = useState(false)
    const [selectedDistrict, setSelectedDistrict] = useState(null)
    const {districts, upazilas} = useContext(AuthContext)
    const [updateLoading, setUpdateLoding] = useState(false)
    const { register, handleSubmit, formState: { errors } } = useForm()

    const { isPending, error, data } = useQuery({
        queryKey: ['single_user'],
        queryFn: async () => {
            const res = await axiosSecure.get(`/users/${user?.email}`)
            return res.data
        }
    })
    const {_id, name, email, image, blood_group, district, upazila, password} = data || {}
    const selectedDistrictId = districts.find(district => district.name === selectedDistrict) || {}
    const currentUpazilas = upazilas.filter(upazila => selectedDistrictId.id === upazila.district_id) || []

    const onSubmit = data => {
        console.log(data);
    }


    return (
        <div className={`p-10 bg-white ${isEdit ? 'profile_update' : 'profile'}`}>
            <h1 className="text-xl font-second">My Profile</h1>
            <div className="flex items-center border border-slate-200 p-5 mt-6 rounded-lg gap-5">
                <img src={image} className="w-16 h-16 rounded-3xl" alt="" />
                <div>
                    <h3 className="capitalize text-xl">{name}</h3>
                    <p>Email: <span className="font-medium">{email}</span></p>
                </div>
            </div>

            <div className="border border-slate-200 px-10 py-5 mt-6 rounded-lg">
                <div className="flex items-center justify-between">
                    <h3 className="capitalize text-xl font-second">Personal Information</h3>
                    <a className={`flex items-center gap-2 cursor-pointer border rounded-md px-2 py-1 hover:border-primary hover:text-primary transition-all ${isEdit ? 'border-primary text-primary' : 'border-slate-300'}`} onClick={() => setIsEdit(!isEdit)}>
                        <CiEdit />   
                        <span className="text-sm">Edit</span>
                    </a>
                </div>
                <form onSubmit={handleSubmit(onSubmit)} className='space-y-4 my-8'>
                    <div className="grid grid-cols-2 gap-5">
                        <div className='space-y-2'>
                            <label>Name</label>
                            <input disabled={!isEdit} {...register("name", { required: true })} defaultValue={name} type="text" placeholder='Enter your name' className="capitalize"/>
                            {errors.name && <span className='text-red-500 font-medium text-sm'>Name is required</span>}
                        </div>
                        <div className='space-y-2'>
                            <label>Blood Group</label>
                            <select disabled={!isEdit} defaultValue={blood_group} {...register("blood", { required: true })}>
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
                        <label>Email</label>
                        <input disabled defaultValue={email} {...register("email", { required: true })} type="text" placeholder='Enter your email'/>
                        {errors.email && <span className='text-red-500 font-medium text-sm'>Email is required</span>}
                    </div>    
                    <div className="grid grid-cols-2 gap-5">
                        <div className='space-y-2'>
                            <label>District</label>
                            <select disabled={!isEdit} defaultValue={district} {...register("district", { required: true })} onChange={(e) => setSelectedDistrict(e.target.value)} value={selectedDistrict}>
                                {
                                    districts && districts.map(district => 
                                    <option key={district.id} value={district.name}>{district.name}</option>)
                                }
                            </select>
                            {errors.district && <span className='text-red-500 font-medium text-sm'>District is required</span>}
                        </div>
                        <div className='space-y-2'>
                            <label>Upazila</label>
                           <select disabled={!isEdit} defaultValue={upazila} {...register("upazila", { required: true })}>
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
                    <div className={`space-y-2 ${isEdit ? 'block' : 'hidden'}`}>
                        <label>Image</label>
                        <input {...register("image", { required: true })} type="file" accept=".jpg, .jpeg, .png, .webp" style={{width: '50%', border: 'none', padding: '5px'}} />
                        {errors.image && <span className='text-red-500 font-medium text-sm'>Image is required</span>} 
                    </div>        
                    <div className="grid grid-cols-2 gap-5">
                        <div className='space-y-2'>
                            <label>Password</label>
                            <input disabled={!isEdit} defaultValue={password} {...register("password", { required: true })} type={`${isEdit ? 'password' : 'text'}`} placeholder='Enter your password' />
                            {errors.password && <span className='text-red-500 font-medium text-sm'>Password is required</span>}
                        </div>  
                        <div className={`space-y-2 ${isEdit ? 'block' : 'hidden'}`}>
                            <label>Confirm Password</label>
                            <input {...register("confirm", { required: true })} type="password" placeholder='Confirm your password' />
                            {errors.confirm && <span className='text-red-500 font-medium text-sm'>Confirm your Password</span>}
                        </div>  
                    </div>    
                    {/* {passError && <span className='text-red-500 font-medium text-sm block'>{passError}</span>}   */}
                    {
                        isEdit && 
                        <button className='px-10 flex items-center gap-3'>
                            <span>Update Profile</span>
                            {updateLoading && <span className="loading loading-spinner loading-sm"></span>}
                        </button>
                    }                    
                </form>
            </div>
        </div>
    );
};

export default UserProfile;