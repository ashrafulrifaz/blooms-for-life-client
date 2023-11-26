import useAxiosSecure from "../../../../Hooks/useAxiosSecure";
import Swal from "sweetalert2";

const UsersCard = ({item, refetch}) => {
    const {_id, image, name, email, status, role} = item
    const axiosSecure = useAxiosSecure()
    console.log(role);

    const handleUserStatus = e => {
        if(role === 'admin'){
            Swal.fire({
                title: "Admin Status can't be update",
                icon: "error"
                })
            return
        }
        axiosSecure.put(`/users/${_id}`, {status: e.target.textContent})
        .then(() => {
            refetch()
            Swal.fire({
                title: "User Status Updated",
                icon: "success"
                })
        })
    }

    const handleRole = (e) => {
        Swal.fire({
            title: "Are you want to change role?",
            icon: "warning",
            showCancelButton: true,
            confirmButtonText: "Yes, Change it!",
            cancelButtonText: "No, cancel!",
            reverseButtons: true
            }).then((result) => {
            if (result.isConfirmed) {
                axiosSecure.put(`/users/${_id}`, {role: e.target.value})
                .then(() => {
                    refetch()
                    Swal.fire({
                        title: "User Role Changed.",
                        icon: "success"
                        })
                    
                })            
            }
            });
    }

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
            {
                role !== 'admin' ?
                <th className="space-y-3 text-center">
                    <div>
                        <a onClick={(e) => handleUserStatus(e)} className={`cursor-pointer border rounded-md py-1 px-2 capitalize hover:text-white transition-all text-xs ${status === 'active' ? 'text-primary border-primary hover:bg-primary' : 'text-[#39A7FF] border-[#39A7FF] hover:bg-[#39A7FF]'}`}>{status === 'active' ? "block" : "active"}</a>
                    </div>
                    <div>
                        <select defaultValue={role} onChange={(e) => handleRole(e)} className="text-[#39A7FF] border rounded-md p-1 text-sm font-medium hover:text-white focus:outline-none border-[#39A7FF] hover:bg-[#39A7FF]">
                            <option value="Role" selected disabled>Role</option>
                            <option value="donor">donor</option>
                            <option value="volunteer">volunteer</option>
                            <option value="admin">admin</option>
                        </select>
                    </div>
                </th>
                :
                <th>
                    <p className="text-[#39A7FF] text-base font-medium">Admin</p>
                </th>
            }
        </tr>
    );
};

export default UsersCard;