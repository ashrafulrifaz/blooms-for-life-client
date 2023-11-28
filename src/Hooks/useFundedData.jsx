import { useQuery } from "@tanstack/react-query"
import useAxiosSecure from "./useAxiosSecure"

const useFundedData = () => {
    const axiosSecure = useAxiosSecure()
    const { isPending, data } = useQuery({
        queryKey: ['funding'],
        queryFn: async () => {
            const res = await axiosSecure.get(`/funding`)
            return res.data
        }          
    })

    return {data, isPending}
}

export default useFundedData