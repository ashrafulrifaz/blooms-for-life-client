import { Link } from "react-router-dom";
import Swal from "sweetalert2";
import useAxiosSecure from "../../../../Hooks/useAxiosSecure";
import useUserData from "../../../../Hooks/useUserData";
import PropTypes from 'prop-types';


const AllDonationCard = ({item, refetch}) => {
    const {_id, requester_name, requester_email, recipient_name, recipient_district, recipient_upazila, date, time, status} = item
    const axiosSecure = useAxiosSecure()
    const {userRole} = useUserData()

    const handleDelete = () => {
        if(userRole === 'volunteer'){
            return Swal.fire({
                title: "You are not able to delete it",
                icon: "error"
                })
        }
        Swal.fire({
        title: "Are you sure?",
        icon: "warning",
        showCancelButton: true,
        confirmButtonText: "Yes, delete it!",
        cancelButtonText: "No, cancel!",
        reverseButtons: true
        }).then((result) => {
        if (result.isConfirmed) {
            axiosSecure.delete(`/donation-requests/${_id}`)
            .then(() => {
                refetch()
                Swal.fire({
                    title: "Your Request has been deleted.",
                    icon: "success"
                    })
            })            
        }
        });
    }

    const handleDone = () => {
        axiosSecure.put(`/donation-requests/${_id}`, {status: 'done'})
            .then(() => {
                refetch()
                Swal.fire({
                    title: "Your Donation Request Approved",
                    icon: "success"
                    })
            })
    }

    const handleCancel = () => {
        axiosSecure.put(`/donation-requests/${_id}`, {status: 'canceled'})
            .then(() => {
                refetch()
                Swal.fire({
                    title: "Your Donation Request Approved",
                    icon: "success"
                    })
            })
    }

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
            <th>
                <h3 className="font-medium text-[15px]">{status}</h3>
            </th>
            <th className="space-y-3 text-center">
                <div>
                    <Link to={`/dashboard/all-donation-request/${_id}`}>
                        <a className="cursor-pointer text-[#39A7FF] border border-[#39A7FF] rounded-md py-1 px-2 capitalize hover:bg-[#39A7FF] hover:text-white transition-all text-xs">View</a>
                    </Link>
                </div>
                <div>
                    <Link to={`${userRole === 'volunteer' ? '/dashboard' : `/dashboard/edit/${_id}`}`}>
                        <a className="cursor-pointer text-green-700 border border-green-700 rounded-md py-1 px-2 capitalize hover:bg-green-700 hover:text-white transition-all text-xs">Edit</a>
                    </Link>
                </div>
                <div>
                    <Link>
                        <a onClick={handleDelete} className="cursor-pointer text-primary border border-primary rounded-md py-1 px-2 capitalize hover:bg-primary hover:text-white transition-all text-xs">Delete</a>
                    </Link>
                </div>
            </th>
            {
                status === 'inprogress' && 
                <th>
                    <h3 className="font-medium text-[15px]">Name: {requester_name}</h3>
                    <h3 className="font-medium text-[15px]">Email: {requester_email}</h3>
                </th>
            }
            {
                status === 'inprogress' &&
                <th className="space-y-3 text-center">
                    <div>
                        <a onClick={handleDone} className="cursor-pointer text-green-700 border border-green-700 rounded-md py-1 px-2 capitalize hover:bg-green-700 hover:text-white transition-all text-xs">Done</a>
                    </div>
                    <div>
                        <a onClick={handleCancel} className="cursor-pointer text-red-500 border border-red-500 rounded-md py-1 px-2 capitalize hover:bg-red-500 hover:text-white transition-all text-xs">Cancel</a>
                    </div>
                </th>
            }
        </tr>
    );
};

AllDonationCard.propTypes = {
    item: PropTypes.object,
    refetch: PropTypes.object
}

export default AllDonationCard;