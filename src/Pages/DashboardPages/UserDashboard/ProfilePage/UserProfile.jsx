import { useForm } from "react-hook-form";
import { useContext, useState } from "react";
import { CiEdit } from "react-icons/ci";
import { updateProfile } from "firebase/auth";
import axios from "axios";
import { AuthContext } from "../../../../Provider/Provider";
import useAxiosSecure from "../../../../Hooks/useAxiosSecure";
import useUserData from "../../../../Hooks/useUserData";
import useAuth from "../../../../Hooks/useAuth";

const UserProfile = () => {
    const {data} = useUserData()
    const {user} = useAuth()
    const axiosSecure = useAxiosSecure()
    const [isEdit, setIsEdit] = useState(false)
    const [selectedDistrict, setSelectedDistrict] = useState(null)
    const {districts, upazilas, auth, setUser} = useContext(AuthContext)
    const [updateLoading, setUpdateLoding] = useState(false)
    const { register, handleSubmit } = useForm()
    const {_id, name, email, image, blood_group, district, upazila} = data || {}
    const selectedDistrictId = districts.find(district => district.name === selectedDistrict) || {}
    const currentUpazilas = upazilas.filter(upazila => selectedDistrictId.id === upazila.district_id) || []
    const image_hosting_key = import.meta.env.VITE_IMAGE_HOSTING_API_KEY
    const image_hosting_url = `https://api.imgbb.com/1/upload?key=${image_hosting_key}`

    const onSubmit = async (data) => {        
        setUpdateLoding(true)
        let newImage;
        if(data.image.length > 0){
            const imageFile = {image: data.image[0]}
            const res = await axios.post(image_hosting_url, imageFile, {
                headers: {
                    'Content-Type': 'multipart/form-data',
                }
            })
            if(res.data.success){
                newImage = res.data.data.display_url
                console.log(res.data.data.display_url);
            } else {     
                newImage = image
                setUpdateLoding(true)
                return
            }
        }

        const newInfo = {
            name: data.name !== undefined ? data.name : name,
            blood_group: data.blood !== undefined ? data.blood : blood_group,
            district: data.district !== undefined ? data.district : district,
            upazila: data.upazila !== undefined ? data.upazila : upazila,
            image: newImage !== undefined ? newImage : image
        }
        updateProfile(auth.currentUser, {
            displayName: data.name !== undefined ? data.name : name, photoURL: data.image.length > 0 ? newImage: image
        })
        setUser({...user, displayName: data.name !== undefined ? data.name : name, photoURL: data.image.length > 0 ? newImage: image})
        
        axiosSecure.put(`/users/${_id}`, newInfo)
        .then(res => {
            console.log(res.data);
            setUpdateLoding(false)
        })
        setUpdateLoding(false)
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
                            <input disabled={!isEdit} {...register("name")} defaultValue={name} type="text" placeholder='Enter your name' className={`${isEdit ? 'normal-case' : 'capitalize'}`}/>
                        </div>
                        <div className='space-y-2'>
                            <label>Blood Group</label>
                            <select disabled={!isEdit} defaultValue={blood_group} {...register("blood")}>
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
                        <label>Email</label>
                        <p className="font-medium">{email}</p>
                    </div>    
                    <div className="grid grid-cols-2 gap-5">
                        <div className='space-y-2'>
                            <label>District</label>
                            <select disabled={!isEdit} defaultValue={district} {...register("district")} onChange={(e) => setSelectedDistrict(e.target.value)} value={selectedDistrict}>
                                {
                                    districts && districts.map(district => 
                                    <option key={district.id} value={district.name}>{district.name}</option>)
                                }
                            </select>
                        </div>
                        <div className='space-y-2'>
                            <label>Upazila</label>
                           <select disabled={!isEdit} defaultValue={upazila} {...register("upazila")}>
                                {
                                    currentUpazilas.length > 0 ? 
                                    currentUpazilas.map(upazila => 
                                    <option key={upazila.id} value={upazila.name}>{upazila.name}</option>)
                                    :
                                    upazilas.map(upazila => 
                                    <option key={upazila.id} value={upazila.name}>{upazila.name}</option>)
                                }
                            </select>
                        </div>
                    </div>      
                    <div className={`space-y-2 ${isEdit ? 'block' : 'hidden'}`}>
                        <label>Image</label>
                        <input {...register("image")} type="file" accept=".jpg, .jpeg, .png, .webp" style={{width: '50%', border: 'none', padding: '5px'}} />
                    </div>     
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