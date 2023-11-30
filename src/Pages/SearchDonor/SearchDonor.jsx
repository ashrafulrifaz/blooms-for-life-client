import { useContext, useState } from "react";
import { useForm } from "react-hook-form";
import { AuthContext } from "../../Provider/Provider";
import axios from "axios";
import SearchCard from "./SearchCard";

const SearchDonor = () => {
    const { register, handleSubmit } = useForm()
    const {districts, upazilas} = useContext(AuthContext)    
    const [selectedDistrict, setSelectedDistrict] = useState(null)
    const [currentData, setCurrentData] = useState([])
    const [noData, setNoData] = useState(false)

    const selectedDistrictId = districts.find(district => district.name === selectedDistrict) || {}
    const currentUpazilas = upazilas.filter(upazila => selectedDistrictId.id === upazila.district_id) || []

    const onSubmit = async(data) => {
        const email = data.email
        const blood_group = encodeURIComponent(data.blood)
        const district = data.district
        const upazila = data.upazila
        console.log(email, blood_group, district, upazila);
        if(!email && !blood_group && !district && !upazila) {
            console.log('empty');
            return
        }
        axios.get(`https://blood-donation-server-side.vercel.app/users/search?email=${email}&blood_group=${blood_group}&district=${district}&upazila=${upazila}`)
            .then(res => {
                setCurrentData(res.data)
                if(res.data.length === 0) {
                    setNoData(true)
                } else {
                    setNoData(false)
                }
            })
    }
    console.log(currentData);
    
    const [currentPage, setCurrentPage] = useState(0)
    const perPageItem = 5

    const lastItemIndex = perPageItem * currentPage;
    const firstItemIndex = lastItemIndex - perPageItem
    const totalPage = Math.ceil(currentData?.length / perPageItem) || 0    
    const pages = currentData ? [...Array(totalPage).keys()] : []

    return (
        <div className="pt-16 pb-20 max-w-[90%] md:max-w-[95%] xl:max-w-[1150px] mx-auto search">
            <h2 className="text-xl font-second mb-4 text-center">Search a Donor</h2>
            <form onSubmit={handleSubmit(onSubmit)} >
                <div className="rounded-lg p-4 shadow-xl border border-slate-200 grid grid-cols-1 md:grid-cols-2 lg:flex justify-center gap-5 items-center md:justify-between">
                    <div>
                        <input {...register("email")} type="text" placeholder='Enter your email'/>
                    </div>
                    <div>
                        <select {...register("blood")}>
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
                    </div>
                    <div>
                        <select {...register("district")} onChange={(e) => setSelectedDistrict(e.target.value)} value={selectedDistrict}>
                            <option value='' selected disabled>District</option>
                            {
                                districts && districts.map(district => 
                                <option key={district.id} value={district.name}>{district.name}</option>)
                            }
                        </select>
                    </div>
                    <div>
                        <select {...register("upazila")}>
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
                    </div>
                    <button>Search</button>                   
                </div>
            </form>            
            {noData && <h3 className="mt-3 capitalize">0 donor found</h3>}
            {
                currentData?.length > 0 && 
            <div className="bg-white rounded-xl">
                <h3 className="mt-3 capitalize">{currentData?.length} donor found</h3>
                <div className="overflow-x-auto my-8 wrapper">
                    <table className="table">
                        <thead className="bg-[#D7EDFF] text-[#39A7FF] uppercase text-[13px]">
                            <tr>
                                <th>image</th>
                                <th>name</th>
                                <th>email</th>
                                <th>blood group</th>
                                <th>district</th>
                                <th>upazila</th>
                            </tr>
                        </thead>
                        <tbody>
                            {
                                currentData?.length > 0 &&
                                currentData?.length > 5 ? 
                                currentData && currentData?.map((user, idx) => <SearchCard key={idx} user={user}></SearchCard>).slice(firstItemIndex + 5, lastItemIndex + 5)
                                :
                                currentData && currentData?.map((user, idx) => <SearchCard key={idx} user={user}></SearchCard>)
                            }
                        </tbody>
                    </table>
                </div>
                <div className="pagination flex justify-center text-center gap-3 mt-5">
                    {
                        currentData?.length > 5 &&
                        pages.map(page => 
                        <a
                            className={currentPage === page ? 'selected' : undefined}
                            onClick={() => {
                                setCurrentPage(page)
                            }}
                            key={page}
                        >{page + 1}</a>
                        )
                    }
                </div>
            </div>
                }
        </div>
    );
};

export default SearchDonor;