

const UserDonationCard = () => {
    return (
        <tr>
            <th>{id + 1}</th>
            <th>
                <h3 className="font-medium text-base">{name}</h3>
            </th>
            <th>
                <h3 className="font-medium text-base">{email}</h3>
            </th>
            <th>
                { role ? <span className="uppercase">{role}</span> : <FontAwesomeIcon onClick={handleCreateAdmin} icon={faUserGroup} className="text-base bg-[#D1A054] text-white p-2.5 rounded-md cursor-pointer" />}
            </th>
            <th>
                <FontAwesomeIcon onClick={handleDeleteItem} icon={faTrashCan} className="text-base bg-red-600 text-white p-2.5 rounded-md cursor-pointer" />
            </th>
        </tr>
    );
};

export default UserDonationCard;