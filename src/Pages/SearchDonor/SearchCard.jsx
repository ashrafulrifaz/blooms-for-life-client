
const SearchCard = ({user}) => {
    const {image, name, email, blood_group, district, upazila} = user || {}
    return (
        <tr>
            <th>
                <img src={image} className="w-14 h-14 rounded-2xl" alt="" />
            </th>
            <th>
                <h3 className="text-base capitalize font-medium">{name}</h3>
            </th>
            <th>
                <h3 className="text-base font-medium">{email}</h3>
            </th>
            <th>
                <h3 className="text-base capitalize font-medium">{blood_group}</h3>
            </th>
            <th>
                <h3 className="text-base font-medium">{district}</h3>
            </th>
            <th>
                <h3 className="text-base capitalize font-medium">{upazila}</h3>
            </th>
        </tr>
    );
};

export default SearchCard;