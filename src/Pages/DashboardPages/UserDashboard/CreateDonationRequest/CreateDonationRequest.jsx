import { useContext, useState } from "react";
import { useForm } from "react-hook-form";
import { AuthContext } from "../../../../Provider/Provider";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import moment from "moment/moment";
import useAxiosSecure from "../../../../Hooks/useAxiosSecure";


const CreateDonationRequest = () => {
    const {user, districts, upazilas} = useContext(AuthContext)
    const [selectedDistrict, setSelectedDistrict] = useState(null)
    const { register, handleSubmit, formState: { errors }, reset } = useForm()
    const [startDate, setStartDate] = useState(new Date());
    const [selectedTime, setSelectedTime] = useState(null);
    const axiosSecure = useAxiosSecure()

    const time = selectedTime?.toString().slice(16, 21)
    const time12 = moment(time, "HH:mm").format("h:mm A");

    const selectedDistrictId = districts.find(district => district.name === selectedDistrict) || {}
    const currentUpazilas = upazilas.filter(upazila => selectedDistrictId.id === upazila.district_id) || []

    const onSubmit = (data) => {
        const newRequest = {
            requester_name: user?.displayName,
            requester_email: user?.email,
            recipient_name: data.name, 
            recipient_district: data.district,
            recipient_upazila: data.upazila,
            hospital: data.hospital,
            full_address: data.address,
            date: startDate.toDateString().slice(4, 15),
            time: time12,
            details: data.details,
            status: 'pending'
        }
        axiosSecure.post('/donation-requests', newRequest)
        .then(res => {
            reset()
            console.log(res.data);
        })
    }

    return (
        <div className="p-10 bg-white rounded-lg donation_request">
            <h2 className="font-second text-xl">Create Your Donation Request</h2>
            <form onSubmit={handleSubmit(onSubmit)} className="mt-8 space-y-4">
                <div className="grid grid-cols-2 gap-x-8 gap-y-5">                    
                    <div className="space-y-1">
                        <h3>Requester Name*</h3>
                        <p className="capitalize font-medium">{user?.displayName}</p>
                    </div>
                    <div className="space-y-1">
                        <h3>Requester Email*</h3>
                        <p className="font-medium">{user?.email}</p>
                    </div>
                    <div className="space-y-2">
                        <label>Recipient Name*</label>
                        <input {...register("name", { required: true })} type="text" placeholder='Enter recipient name'/>   
                        {errors.name && <span className='text-red-500 font-medium text-sm'>Recipient Name is required</span>}                     
                    </div>
                    <div className="space-y-2">
                        <label>Recipient District*</label>                        
                        <select {...register("district", { required: true })} onChange={(e) => setSelectedDistrict(e.target.value)} value={selectedDistrict}>
                            <option value="District" selected disabled>District</option>
                            {
                                districts && districts.map(district => 
                                <option key={district.id} value={district.name}>{district.name}</option>)
                            }
                        </select>  
                        {errors.district && <span className='text-red-500 font-medium text-sm'>Recipient District is required</span>}                     
                    </div>
                    <div className="space-y-2">
                        <label>Recipient Upazila*</label> 
                        <select {...register("upazila", { required: true })}>
                            <option value="Upazila" selected disabled>Upazila</option>
                            {
                                currentUpazilas.length > 0 ? 
                                currentUpazilas.map(upazila => 
                                <option key={upazila.id} value={upazila.name}>{upazila.name}</option>)
                                :
                                upazilas.map(upazila => 
                                <option key={upazila.id} value={upazila.name}>{upazila.name}</option>)
                            }
                        </select>     
                        {errors.upazila && <span className='text-red-500 font-medium text-sm'>Recipient Upazila is required</span>}              
                    </div>
                    <div className="space-y-2">
                        <label>Hospital Name*</label>
                        <input {...register("hospital", { required: true })} type="text" placeholder='Enter hospital name'/>
                        {errors.hospital && <span className='text-red-500 font-medium text-sm'>Hospital Name is required</span>}  
                    </div>
                </div>
                <div className="space-y-2">
                    <label>Full Address Line*</label>
                    <input {...register("address", { required: true })} type="text" placeholder='Enter full address line'/>
                    {errors.address && <span className='text-red-500 font-medium text-sm'>Full Address is required</span>}  
                </div>
                <div className="grid grid-cols-2 gap-5">
                    <div className="space-y-2">
                        <label className="block">Donation Date*</label>
                        <DatePicker 
                            placeholderText="Click to select a date" 
                            selected={startDate} 
                            onChange={(date) => setStartDate(date)}  
                            className="focus:outline-none w-full" />
                    </div>
                    <div className="space-y-2">
                        <label className="block">Donation Time*</label>
                        <DatePicker
                            placeholderText="Enter donation time" 
                            selected={selectedTime}
                            onChange={(date) => setSelectedTime(date)}
                            showTimeSelect
                            showTimeSelectOnly
                            timeIntervals={15}
                            timeCaption="Time"
                            dateFormat="h:mm aa" />
                    </div>                    
                </div>
                <div className="space-y-2">
                    <label>Details*</label>
                    <textarea rows={4} {...register("details", { required: true })} type="text" placeholder='Enter full address line'/>
                    {errors.details && <span className='text-red-500 font-medium text-sm'>Details is required</span>}  
                </div>
                <button>Create Request</button>
            </form>
        </div>
    );
};

export default CreateDonationRequest;