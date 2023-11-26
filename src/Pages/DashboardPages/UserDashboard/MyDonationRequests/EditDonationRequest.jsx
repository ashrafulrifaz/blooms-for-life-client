import { useContext, useState } from "react";
import { useForm } from "react-hook-form";
import { AuthContext } from "../../../../Provider/Provider";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import moment from "moment/moment";
import useAxiosSecure from "../../../../Hooks/useAxiosSecure";
import { useParams } from "react-router-dom";
import useDonationRequests from "../../../../Hooks/useDonationRequests";

const EditDonationRequest = () => {
    const {districts, upazilas} = useContext(AuthContext)
    const [selectedDistrict, setSelectedDistrict] = useState(null)
    const { register, handleSubmit } = useForm()
    const [startDate, setStartDate] = useState(null);
    const [selectedTime, setSelectedTime] = useState(null);
    const [updateLoading, setUpdateLoding] = useState(false)
    const axiosSecure = useAxiosSecure()
    

    const {id} = useParams()
    const {data} = useDonationRequests()
    const currentData = data?.find(item => item._id === id)
    const {_id, requester_name, requester_email, recipient_name, recipient_district, recipient_upazila, date, time, hospital, full_address, details} = currentData || {}

    const timeUTC = selectedTime?.toString().slice(16, 21)
    const time12 = moment(timeUTC, "HH:mm").format("h:mm A");

    const selectedDistrictId = districts.find(district => district.name === selectedDistrict) || {}
    const currentUpazilas = upazilas.filter(upazila => selectedDistrictId.id === upazila.district_id) || []

    const onSubmit = (data) => {
        setUpdateLoding(true)
        const editedRequest = {
            requester_name: requester_name,
            requester_email: requester_email,
            recipient_name: data.name, 
            recipient_district: data.district,
            recipient_upazila: data.upazila,
            hospital: data.hospital,
            full_address: data.address,
            date: startDate === null ? date :startDate.toDateString().slice(4, 15),
            time: selectedTime === null ? time: time12,
            details: data.details,
            status: 'pending'
        }
        console.log(editedRequest);
        axiosSecure.put(`/donation-requests/${_id}`, editedRequest)
        .then(res => {
            console.log(res.data);
            setUpdateLoding(false)
        })
        setUpdateLoding(false)
    }


    return (
        <div className="p-10 bg-white rounded-lg donation_request">
            <h2 className="font-second text-xl">Edit Your Donation Request</h2>
            <form onSubmit={handleSubmit(onSubmit)} className="mt-8 space-y-4">
                <div className="grid grid-cols-2 gap-x-8 gap-y-5">                    
                    <div className="space-y-1">
                        <h3>Requester Name*</h3>
                        <p className="capitalize font-medium">{requester_name}</p>
                    </div>
                    <div className="space-y-1">
                        <h3>Requester Email*</h3>
                        <p className="font-medium">{requester_email}</p>
                    </div>
                    <div className="space-y-2">
                        <label>Recipient Name*</label>
                        <input defaultValue={recipient_name} {...register("name")} type="text" placeholder='Enter recipient name'/>                  
                    </div>
                    <div className="space-y-2">
                        <label>Recipient District*</label>                        
                        <select defaultValue={recipient_district} {...register("district")} onChange={(e) => setSelectedDistrict(e.target.value)} value={selectedDistrict}>
                            <option value="District" selected disabled>District</option>
                            {
                                districts && districts.map(district => 
                                <option key={district.id} value={district.name}>{district.name}</option>)
                            }
                        </select>                     
                    </div>
                    <div className="space-y-2">
                        <label>Recipient Upazila*</label> 
                        <select defaultValue={recipient_upazila} {...register("upazila")}>
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
                    </div>
                    <div className="space-y-2">
                        <label>Hospital Name*</label>
                        <input defaultValue={hospital} {...register("hospital")} type="text" placeholder='Enter hospital name'/>
                    </div>
                </div>
                <div className="space-y-2">
                    <label>Full Address Line*</label>
                    <input defaultValue={full_address} {...register("address")} type="text" placeholder='Enter full address line'/>
                </div>
                <div className="grid grid-cols-2 gap-5">
                    <div className="space-y-2">
                        <label className="block">Donation Date*</label>
                        <DatePicker 
                            placeholderText={`${date}`} 
                            selected={startDate} 
                            onChange={(date) => setStartDate(date)}  
                            className="focus:outline-none w-full" />
                    </div>
                    <div className="space-y-2">
                        <label className="block">Donation Time*</label>
                        <DatePicker
                            placeholderText={`${time}`} 
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
                    <textarea defaultValue={details} rows={4} {...register("details")} type="text" placeholder='Enter full address line'/>
                </div>
                <button className='flex items-center gap-3'>
                    <span>Update Request</span>
                    {updateLoading && <span className="loading loading-spinner loading-sm"></span>}
                </button>
            </form>
        </div>
    );
};

export default EditDonationRequest;