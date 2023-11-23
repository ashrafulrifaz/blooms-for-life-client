import { useEffect, useState } from 'react';
import registrationImage from '../../assets/registration.jpg'
import axios from 'axios';

const Registration = () => {
    const [selectedDistrict, setSelectedDistrict] = useState(null)
    const [districts, setDistrict] = useState([])
    const [upazilas, setUpazilas] = useState([])
    const bloodGroup = useState(['A+', 'A-', 'B+', 'B-', 'AB+', 'AB-', 'O+', 'O-'])

    const selectedDistrictId = districts.find(district => district.name === selectedDistrict) || {}
    const currentUpazilas = upazilas.filter(upazila => selectedDistrictId.id === upazila.district_id) || []
    console.log(currentUpazilas);

    useEffect(() => {
        axios.get('district.json')
        .then(res => setDistrict(res.data))

        axios.get('upazilas.json')
        .then(res => setUpazilas(res.data))
    }, [])

    return (
        <div className="py-10 grid grid-cols-3 registration">
            <div>
                <img src={registrationImage} alt="" />
            </div>
            <div className="col-span-2">
                <h2 className='text-2xl text-center'>Register</h2>
                <form className='space-y-3 py-10 px-20'>
                    <div className="grid grid-cols-2 gap-5">
                        <div className='space-y-2'>
                            <label>Name*</label>
                            <input type="text" placeholder='Enter your name'/>
                        </div>
                        <div className='space-y-2'>
                            <label>Blood Group*</label>
                            <select>
                                <option value="Blood Group" selected disabled>Blood Group</option>
                                {
                                    bloodGroup.map(blood => 
                                    <option key={blood.id} value={blood.name}>{blood.name}</option>)
                                }
                            </select>
                        </div>
                    </div>  
                    <div className='space-y-2'>
                        <label>Email*</label>
                        <input type="text" placeholder='Enter your email'/>
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
                </form>
            </div>
        </div>
    );
};

export default Registration;