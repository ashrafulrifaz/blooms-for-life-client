import { useQuery } from "@tanstack/react-query";
import axios from "axios";

const usePublicBlogs = () => {
    const { data, isPending } = useQuery({
        queryKey: ['published_blog'],
        queryFn: async () => {
            const res = await axios.get('https://blood-donation-server-side.vercel.app/blogs/published')
            return res.data
        }
    })
    return {data, isPending}
};

export default usePublicBlogs;