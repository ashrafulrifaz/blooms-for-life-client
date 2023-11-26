// import { useQuery } from "@tanstack/react-query";
import { useState } from "react";
import useDonationRequests from "../../../../Hooks/useDonationRequests";
import UserDonationCard from "./UserDonationCard";
import { Link } from "react-router-dom";

const UserHomePage = () => {
    const {data, isPending, user} = useDonationRequests()
    const [currentStatus, setCurrentStatus] = useState(null)
    console.log(currentStatus);

    return (
        <div className="user_home">
            <h1 className="capitalize text-2xl font-second">Welcome {user?.displayName}. Thank you for joining BloomsForLife</h1>
            <div className="mt-8 bg-white rounded-xl p-5">
                <h3 className="text-lg capitalize">Your recent donation requests</h3>
                <div className="overflow-x-auto my-8 wrapper">
                    <table className="table">
                        <thead className="bg-[#D7EDFF] text-[#39A7FF] uppercase text-[13px]" style={{borderRadius: '50px'}}>
                            <tr>
                                <th>recipient name</th>
                                <th>recipient location</th>
                                <th>Date & Time</th>
                                { currentStatus === 'inprogress' && <th>donor info</th> }
                                <th>Status</th>
                                { currentStatus === 'inprogress' && <th>Update Status</th> }
                                <th>Action</th>
                            </tr>
                        </thead>
                        <tbody>
                            {
                                data && data.map((item, idx) => <UserDonationCard key={idx} item={item} currentStatus={currentStatus} setCurrentStatus={setCurrentStatus}></UserDonationCard>).slice(0, 3)
                            }
                        </tbody>
                    </table>
                </div>
                {data?.length > 0 && <p className="text-xs uppercase -mt-5">slide right to see full table</p>}
                {
                    data?.length > 3 && 
                    <div className="text-center">
                        <Link to="/dashboard/my-donation-requests">
                            <button>View My All Requests</button>
                        </Link>
                    </div>
                }
            </div>
        </div>
    );
};

export default UserHomePage;