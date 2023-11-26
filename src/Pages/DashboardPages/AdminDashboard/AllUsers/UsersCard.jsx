import { Link } from "react-router-dom";

const UsersCard = ({item}) => {
    const {image, name, email, status} = item
    console.log(item);

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
                <h3 className={`text-base capitalize font-medium ${status === 'active' ? '' : ''}`}>{status}</h3>
            </th>
            <th className="space-y-3 text-center">
                <div>
                    <a className={`cursor-pointer border rounded-md py-1 px-2 capitalize hover:text-white transition-all text-xs ${status === 'active' ? 'text-primary border-primary hover:bg-primary' : 'text-[#39A7FF] border-[#39A7FF] hover:bg-[#39A7FF]'}`}>{status === 'active' ? "Block" : "Active"}</a> 
                </div>
                <div>
                    <select className="text-[#39A7FF] border rounded-md p-1 text-sm font-medium hover:text-white focus:outline-none border-[#39A7FF] hover:bg-[#39A7FF]">
                        <option value="Role" selected disabled>Role</option>
                        <option value="donor">donor</option>
                        <option value="volunteer">volunteer</option>
                        <option value="admin">admin</option>
                    </select>
                </div>
            </th>
        </tr>
    );
};

export default UsersCard;