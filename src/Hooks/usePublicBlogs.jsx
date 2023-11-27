import { useQuery } from "@tanstack/react-query";
import useAxiosPublic from "./useAxiosPublic";

const usePublicBlogs = () => {
    const axiosPublic = useAxiosPublic()
    const { data, isPending } = useQuery({
        queryKey: ['single_user'],
        queryFn: async () => {
            const res = await axiosPublic.get('/blogs/published')
            return res.data
        }
    })
    return {data, isPending}
};

export default usePublicBlogs;