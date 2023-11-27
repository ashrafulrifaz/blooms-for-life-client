import { Link } from "react-router-dom";

const DonationCard = ({item, id}) => {
    const {_id, requester_name, requester_email, recipient_name, recipient_district, recipient_upazila, date, time, status} = item

    return (
        <tr className="text-base">
            <th>
                <h3 className="font-medium capitalize">{id + 1}</h3>
            </th>
            <th>
                <h3 className="font-medium capitalize">{requester_name}</h3>
            </th>
            <th>
                <h3 className="font-medium">District: {recipient_district}</h3>
                <h3 className="font-medium">Upazila: {recipient_upazila}</h3>
            </th>
            <th>
                <h3 className="font-medium">{date}</h3>
            </th>
            <th>
                <h3 className="font-medium">{time}</h3>
            </th>
            <th className="space-y-3">
                <Link to={`/blood-donation-request/${_id}`}>
                    <a className="cursor-pointer text-[#39A7FF] border border-[#39A7FF] rounded-md py-1 px-2 capitalize hover:bg-[#39A7FF] hover:text-white transition-all text-sm">View</a>
                </Link>
            </th>
        </tr>
    );
};

export default DonationCard;