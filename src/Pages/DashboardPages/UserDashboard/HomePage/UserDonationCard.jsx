import { useEffect } from "react";
import { Link } from "react-router-dom";


const UserDonationCard = ({item, setCurrentStatus, currentStatus}) => {
    const {_id, requester_name, requester_email, recipient_name, recipient_district, recipient_upazila, date, time, status} = item
    useEffect(() => {        
        setCurrentStatus('inprogress')
    }, [status, setCurrentStatus])

    return (
        <tr>
            <th>
                <h3 className="font-medium text-[15px]">{recipient_name}</h3>
            </th>
            <th>
                <h3 className="font-medium text-[15px]">District: {recipient_district}</h3>
                <h3 className="font-medium text-[15px]">Upazila: {recipient_upazila}</h3>
            </th>
            <th>
                <h3 className="font-medium text-[15px]">Date: {date}</h3>
                <h3 className="font-medium text-[15px]">Time: {time}</h3>
            </th>
            {
                currentStatus === 'inprogress' && 
                <th>
                    <h3 className="font-medium text-[15px]">Name: {requester_name}</h3>
                    <h3 className="font-medium text-[15px]">Email: {requester_email}</h3>
                </th>
            }
            <th>
                <h3 className="font-medium text-[15px]">{status}</h3>
            </th>
            {
                currentStatus === 'inprogress' &&
                <th className="space-y-3 text-center">
                    <div>
                        <Link>
                            <a className="cursor-pointer text-green-700 border border-green-700 rounded-md py-1 px-2 capitalize hover:bg-green-700 hover:text-white transition-all text-xs">Done</a>
                        </Link>
                    </div>
                    <div>
                        <Link>
                            <a className="cursor-pointer text-red-500 border border-red-500 rounded-md py-1 px-2 capitalize hover:bg-red-500 hover:text-white transition-all text-xs">Cancel</a>
                        </Link>
                    </div>
                </th>
            }
            <th className="space-y-3 text-center">
                <div>
                    <Link to={`/dashboard/donation-request/${_id}`}>
                        <a className="cursor-pointer text-[#39A7FF] border border-[#39A7FF] rounded-md py-1 px-2 capitalize hover:bg-[#39A7FF] hover:text-white transition-all text-xs">View</a>
                    </Link>
                </div>
                <div>
                    <Link to={`/dashboard/edit/${_id}`}>
                        <a className="cursor-pointer text-green-700 border border-green-700 rounded-md py-1 px-2 capitalize hover:bg-green-700 hover:text-white transition-all text-xs">Edit</a>
                    </Link>
                </div>
                <div>
                    <Link>
                        <a className="cursor-pointer text-primary border border-primary rounded-md py-1 px-2 capitalize hover:bg-primary hover:text-white transition-all text-xs">Delete</a>
                    </Link>
                </div>
            </th>
        </tr>
    );
};

export default UserDonationCard;