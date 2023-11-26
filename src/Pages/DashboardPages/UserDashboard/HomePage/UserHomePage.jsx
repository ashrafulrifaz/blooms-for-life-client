import useDonationRequests from "../../../../Hooks/useDonationRequests";
import UserDonationCard from "./UserDonationCard";
import { Link } from "react-router-dom";

const UserHomePage = () => {
    const {data, isPending, user, refetch} = useDonationRequests()
    const isInProgress = data?.some(item => item.status == 'inprogress')

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
                                <th>Status</th>
                                <th>Action</th>
                                { isInProgress && <th>donor info</th> }
                                { isInProgress && <th>Update Status</th> }
                            </tr>
                        </thead>
                        <tbody>
                            {
                                data && data.map((item, idx) => <UserDonationCard key={idx} item={item} refetch={refetch}></UserDonationCard>).slice(0, 3)
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