import { useQuery } from "@tanstack/react-query";
import axios from "axios";

const usePublicBlogs = () => {
    const { data, isPending } = useQuery({
        queryKey: ['published_blog'],
        queryFn: async () => {
            const res = await axios.get('http://localhost:5000/blogs/published')
            return res.data
        }
    })
    return {data, isPending}
};

export default usePublicBlogs;