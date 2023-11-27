import { useQuery } from "@tanstack/react-query";
import useAxiosSecure from "./useAxiosSecure";

const useBlogData = () => {    
    const axiosSecure = useAxiosSecure()
    const { data, isPending, refetch } = useQuery({
        queryKey: ['all_blogs'],
        queryFn: async () => {
            const res = await axiosSecure.get(`/blogs`)
            return res.data
        }
    })
    return {data, isPending, refetch}
};

export default useBlogData;