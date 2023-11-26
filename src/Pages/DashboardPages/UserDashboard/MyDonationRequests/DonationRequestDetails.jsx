import { useParams } from "react-router-dom";
import useDonationRequests from "../../../../Hooks/useDonationRequests";
import Swal from "sweetalert2";
import useAxiosSecure from "../../../../Hooks/useAxiosSecure";


const DonationRequestDetails = () => {
    const {id} = useParams()
    const {data} = useDonationRequests()
    const currentData = data?.find(item => item._id === id)
    const {requester_name, requester_email, recipient_name, recipient_district, recipient_upazila, date, time, hospital, full_address, details, status, _id} = currentData || {}
    const axiosSecure = useAxiosSecure()

    const handleDonate = () => {
        Swal.fire({
            html: `<p>Donor Name: ${requester_name}</p><p>Donor Email: ${requester_email}</p>`,
            showCancelButton: true,
            confirmButtonText: "Yes, Donate",
            cancelButtonText: "No!",
            reverseButtons: true
            }).then((result) => {
            if (result.isConfirmed) {
                axiosSecure.put(`/donation-requests/${_id}`, {status: 'inprogress'})
                .then(() => {
                    Swal.fire({
                        title: "Your Donation Request Approved",
                        icon: "success"
                        })
                })
                
            }
            });
    }

    return (
        <div className="p-10 bg-white rounded-lg donation_request">
            <h2 className="font-second text-xl">Edit Your Donation Request</h2>
            <div className="mt-8 space-y-4">
                <div className="grid grid-cols-2 gap-x-8 gap-y-5">                    
                    <div className="space-y-">
                        <h3>Requester Name</h3>
                        <p className="capitalize font-medium">{requester_name}</p>
                    </div>
                    <div className="space-y-1">
                        <h3>Requester Email</h3>
                        <p className="font-medium">{requester_email}</p>
                    </div>
                    <div className="space-y-2">
                        <h3>Recipient Name</h3>
                        <p className="font-medium">{recipient_name}</p>
                    </div>
                    <div className="space-y-2">
                        <h3>Recipient District</h3>
                        <p className="font-medium">{recipient_district}</p>               
                    </div>
                    <div className="space-y-2">
                        <h3>Recipient Upazila</h3>
                        <p className="font-medium">{recipient_upazila}</p>          
                    </div>
                    <div className="space-y-2">
                        <h3>Hospital Name</h3>
                        <p className="font-medium">{hospital}</p>
                    </div>
                </div>
                <div className="space-y-2">
                    <h3>Full Address</h3>
                    <p className="font-medium">{full_address}</p>
                </div>
                <div className="grid grid-cols-2 gap-5">
                    <div className="space-y-2">
                        <h3>Donation Date*</h3>
                        <p className="font-medium">{date}</p>
                    </div>
                    <div className="space-y-2">
                        <h3>Donation Time</h3>
                        <p className="font-medium">{time}</p>
                    </div>                    
                </div>
                <div className="space-y-2">
                    <h3>Donation Details</h3>
                    <p className="font-medium">{details}</p>
                </div>
                {
                    status === 'pending' && <button onClick={handleDonate}>Donate</button>
                }
            </div>
        </div>
    );
};

export default DonationRequestDetails;