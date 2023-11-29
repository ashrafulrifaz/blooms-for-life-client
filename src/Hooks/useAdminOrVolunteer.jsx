import { useQuery } from "@tanstack/react-query";
import useAuth from "./useAuth";
import useAxiosSecure from "./useAxiosSecure";

const useAdminOrVolunteer = () => {
    const {user} = useAuth()
    const axiosSecure = useAxiosSecure()

    const {data: isAdminOrVolunteer, isPending: isAdminOrVolunteerPending} = useQuery({
        queryKey: [user?.email, 'isAdminOrVolunteer'],
        queryFn: async () => {
            const res = await axiosSecure.get(`users/${user?.email}`)
            return res.data?.role === 'admin' || res.data?.role === 'volunteer'
        }
    })
    return {isAdminOrVolunteer, isAdminOrVolunteerPending}
};

export default useAdminOrVolunteer;