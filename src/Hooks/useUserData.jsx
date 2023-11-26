import { useQuery } from "@tanstack/react-query";
import useAuth from "./useAuth";
import useAxiosSecure from "./useAxiosSecure";

const useUserData = () => {
    const {user} = useAuth()
    const axiosSecure = useAxiosSecure()
    const { data, isPending } = useQuery({
        queryKey: ['single_user'],
        queryFn: async () => {
            const res = await axiosSecure.get(`/users/${user?.email}`)
            return res.data
        }
    })

    return {data, userRole: data?.role, isPending}
};

export default useUserData;