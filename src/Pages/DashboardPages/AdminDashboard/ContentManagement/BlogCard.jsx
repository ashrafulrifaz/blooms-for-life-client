import { Link } from "react-router-dom";
import useAxiosSecure from "../../../../Hooks/useAxiosSecure";

const BlogCard = ({item, refetch}) => {
    const {_id, thumbnail_image, title, status} = item
    const axiosSecure = useAxiosSecure()

    const handleUserStatus = e => {
        console.log(e.target.textContent);
    }

    return (
        <tr>
            <th>
                <img src={thumbnail_image} className="w-40 h-auto rounded-xl" alt="" />
            </th>
            <th>
                <h3 className="font-medium text-[15px]">{title}</h3>
            </th>
            <th>
                <h3 className={`font-medium text-[15px] ${status === 'draft' ? 'text-primary' : 'text-green-600'}`}>{status}</h3>
            </th>
            <th className="space-x-2">
                <a onClick={(e) => handleUserStatus(e)} className={`cursor-pointer border rounded-md py-1 px-2 capitalize hover:text-white transition-all text-xs ${status === 'draft' ? 'text-green-700 border-green-700 hover:bg-green-700' : 'text-primary border-primary hover:bg-primary'}`}>{status === 'draft' ? "publish" : "draft"}</a>
                <Link to={`/dashboard/edit/${_id}`}>
                    <a className="cursor-pointer text-[#39A7FF] border border-[#39A7FF] rounded-md py-1 px-2 capitalize hover:bg-[#39A7FF] hover:text-white transition-all text-xs">Edit</a>
                </Link>
                <a className="cursor-pointer text-primary border border-primary rounded-md py-1 px-2 capitalize hover:bg-primary hover:text-white transition-all text-xs">Delete</a>
            </th>
            {
                status === 'inprogress' &&
                <th className="space-y-3 text-center">
                    <div>
                        <a  className="cursor-pointer text-green-700 border border-green-700 rounded-md py-1 px-2 capitalize hover:bg-green-700 hover:text-white transition-all text-xs">Done</a>
                    </div>
                    <div>
                        <a  className="cursor-pointer text-red-500 border border-red-500 rounded-md py-1 px-2 capitalize hover:bg-red-500 hover:text-white transition-all text-xs">Cancel</a>
                    </div>
                </th>
            }
        </tr>
    );
};

export default BlogCard;