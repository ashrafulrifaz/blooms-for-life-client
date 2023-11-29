import Swal from "sweetalert2";
import { useNavigate } from "react-router-dom";
import { useContext } from "react";
import { AuthContext } from "../../Provider/Provider";


const FundingCard = ({image, title, description, donation_id}) => {
    const {user, setFundingInfo} = useContext(AuthContext)
    const navigate = useNavigate()

    const handleDonation = () => {
        Swal.fire({
            html: `<p>Donor Name: ${user?.displayName}</p>
                   <p>Donor Email: ${user?.email}</p>`,
            input: 'text',
            inputPlaceholder: 'Donation Amount',
            inputAttributes: {
              autocapitalize: "off"
            },
            showCancelButton: true,
            confirmButtonText: "Donate",
            inputValidator: (value) => {
              return !value && 'You need to enter an amount';
            },
          }).then((result) => {
            if (result.isConfirmed) {
                const donationInfo = {
                    amount: parseFloat(result.value),
                    donation_id: donation_id,
                    donor_name: user?.displayName,
                    donor_email: user?.email,
                    donor_image: user?.photoURL
                }                
                navigate('/fundings/payment')
                setFundingInfo(donationInfo)
            }
          });
          
    }

    return (
        <div>
            <img src={image} className='w-full h-56 rounded-t-md' alt="" />
            <div className="p-3 border border-red-200 rounded-b-md border-t-0">
                <h2 className='font-second text-2xl mb-1.5'>{title}</h2>
                <p className='font-medium'>{description}</p>
                <div className="mt-3 flex items-center justify-between">
                    <button onClick={handleDonation}>Donate</button>
                    <p className='text-primary'>Total Raised - ${}</p>
                </div>
            </div>
        </div>
    );
};

export default FundingCard;