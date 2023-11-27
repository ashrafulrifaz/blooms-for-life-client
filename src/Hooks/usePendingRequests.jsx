import { useQuery } from "@tanstack/react-query";
import axios from "axios";

const usePendingRequests = () => {
    const { data, isLoading } = useQuery({
        queryKey: ['pending_requests'],
        queryFn: async () => {
            const res = await axios.get("http://localhost:5000/donation-requests/pending")
            return res.data
        }
    })
    return {data, isLoading}
};

export default usePendingRequests;