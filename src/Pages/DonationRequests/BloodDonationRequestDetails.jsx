import { useParams } from "react-router-dom";
import usePendingRequests from "../../Hooks/usePendingRequests";

const BloodDonationRequestDetails = () => {
    const {data} = usePendingRequests()
    const {id} = useParams()
    const currentRequest = data.find(item => item._id === id)
    const {requester_name, requester_email, recipient_name, recipient_district, recipient_upazila, date, time, hospital, full_address, details} = currentRequest || {}

    return (
        <div className="py-12 bg-white rounded-lg donation_request">
            <h2 className="font-second text-xl">Donation Request Details</h2>
            <div className="mt-8 space-y-4">
                <div className="grid grid-cols-3 gap-x-8 gap-y-5">                    
                    <div>
                        <h3>Requester Name:</h3>
                        <p className="capitalize font-medium">{requester_name}</p>
                    </div>
                    <div className="space-y-2">
                        <h3>Requester Email:</h3>
                        <p className="font-medium">{requester_email}</p>
                    </div>
                    <div className="space-y-2">
                        <h3>Recipient Name:</h3>
                        <p className="font-medium">{recipient_name}</p>
                    </div>
                    <div className="space-y-2">
                        <h3>Recipient District:</h3>
                        <p className="font-medium">{recipient_district}</p>               
                    </div>
                    <div className="space-y-2">
                        <h3>Recipient Upazila:</h3>
                        <p className="font-medium">{recipient_upazila}</p>          
                    </div>
                    <div className="space-y-2">
                        <h3>Hospital Name:</h3>
                        <p className="font-medium">{hospital}</p>
                    </div>
                    <div className="space-y-2">
                        <h3>Full Address:</h3>
                        <p className="font-medium">{full_address}</p>
                    </div>
                    <div className="space-y-2">
                        <h3>Donation Date:</h3>
                        <p className="font-medium">{date}</p>
                    </div>
                    <div className="space-y-2">
                        <h3>Donation Time:</h3>
                        <p className="font-medium">{time}</p>
                    </div>  
                </div>
                <div className="space-y-2">
                    <h3>Donation Details</h3>
                    <p className="font-medium">{details}</p>
                </div>
            </div>
        </div>
    );
};

export default BloodDonationRequestDetails;