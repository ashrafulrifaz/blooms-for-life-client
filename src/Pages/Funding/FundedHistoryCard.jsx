
const FundedHistoryCard = ({item}) => {
    const {donor_image, donor_name, donor_email, amount} = item

    return (
        <tr className="text-base">
            <th>
                <img src={donor_image} className="w-12 rounded-xl" alt="" />
            </th>
            <th>
                <h3 className="font-medium capitalize">{donor_name}</h3>
            </th>
            <th>
                <h3 className="font-medium">{donor_email}</h3>
            </th>
            <th>
                <h3 className="font-medium">${amount}</h3>
            </th>
        </tr>
    );
};

export default FundedHistoryCard;