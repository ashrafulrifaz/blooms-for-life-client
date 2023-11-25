import { useQuery } from "@tanstack/react-query"
import useAuth from "./useAuth"
import useAxiosSecure from "./useAxiosSecure"

const useDonationRequests = () => {
    const {user} = useAuth()
    const axiosSecure = useAxiosSecure()
    const { isPending, data } = useQuery({
        queryKey: ['donation_requests'],
        queryFn: async () => {
            const res = await axiosSecure.get(`/donation-requests/${user?.email}`)
            return res.data
        }          
    })

    return {data, isPending, user}
}

export default useDonationRequests