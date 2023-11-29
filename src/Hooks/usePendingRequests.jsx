import { useQuery } from "@tanstack/react-query";
import axios from "axios";

const usePendingRequests = () => {
    const { data, isLoading } = useQuery({
        queryKey: ['pending_requests'],
        queryFn: async () => {
            const res = await axios.get("https://blood-donation-server-side.vercel.app/donation-requests/pending")
            return res.data
        }
    })
    return {data, isLoading}
};

export default usePendingRequests;