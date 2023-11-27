import { Link } from "react-router-dom";
import useAxiosSecure from "../../../../Hooks/useAxiosSecure";
import Swal from "sweetalert2";

const BlogCard = ({item, refetch}) => {
    const {_id, thumbnail_image, title, status} = item
    const axiosSecure = useAxiosSecure()

    const handleBlogStatus = e => {
        const currentStatus = e.target.textContent
        const newStatus = currentStatus === 'draft' ? 'draft' : 'published'
        console.log(newStatus);
        axiosSecure.put(`/blogs/${_id}`, {status: newStatus})
        .then(() => {
            refetch()
            Swal.fire({
                title: "Blog Status Updated",
                icon: "success"
                })
        })
    }

    const handleBlogDelete = () => {
        axiosSecure.delete(`/blogs/${_id}`)
        .then(() => {
            refetch()
            Swal.fire({
                title: "Blog Deleted Successful",
                icon: "success"
                })
        })
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
                <a onClick={(e) => handleBlogStatus(e)} className={`cursor-pointer border rounded-md py-1 px-2 capitalize hover:text-white transition-all text-xs ${status === 'draft' ? 'text-green-700 border-green-700 hover:bg-green-700' : 'text-primary border-primary hover:bg-primary'}`}>{status === 'draft' ? "publish" : "draft"}</a>
                <Link to={`/dashboard/edit-blog/${_id}`}>
                    <a className="cursor-pointer text-[#39A7FF] border border-[#39A7FF] rounded-md py-1 px-2 capitalize hover:bg-[#39A7FF] hover:text-white transition-all text-xs">Edit</a>
                </Link>
                <a  onClick={handleBlogDelete} className="cursor-pointer text-primary border border-primary rounded-md py-1 px-2 capitalize hover:bg-primary hover:text-white transition-all text-xs">Delete</a>
            </th>
        </tr>
    );
};

export default BlogCard;