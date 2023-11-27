import usePublicBlogs from "../../Hooks/usePublicBlogs";
import BlogPageCard from "./BlogPageCard";

const Blog = () => {
    const {data, isPending} = usePublicBlogs()
    console.log(data);

    return (
        <div className="py-12">
            <div className="grid grid-cols-3 gap-10">
                {
                    data && data?.map((post, idx) => <BlogPageCard key={idx} post={post}></BlogPageCard>)
                }
            </div>
        </div>
    );
};

export default Blog;