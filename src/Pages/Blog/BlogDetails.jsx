import { useParams } from "react-router-dom";
import usePublicBlogs from "../../Hooks/usePublicBlogs";

const BlogDetails = () => {
    const {data} = usePublicBlogs()
    const {id} = useParams()
    const currentBlog = data?.find(item => item._id === id)
    const {thumbnail_image, title, content} = currentBlog || {}

    return (
        <div className="py-8 max-w-[90%] lg:max-w-[1150px] mx-auto">
            <img src={thumbnail_image} alt="" className="w-full h-auto lg:h-96 rounded-lg" />
            <h3 className="text-2xl mt-6 mb-4">{title}</h3>
            <p dangerouslySetInnerHTML={{__html: content}} className="font-medium" />
        </div>
    );
};

export default BlogDetails;