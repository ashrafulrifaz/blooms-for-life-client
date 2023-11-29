import useAxiosSecure from './useAxiosSecure';
import { useQuery } from '@tanstack/react-query';

const useAllDonationRequests = () => {    
    const axiosSecure = useAxiosSecure()
    const { data, isPending, refetch } = useQuery({
        queryKey: ['all_requests'],
        queryFn: async () => {
            const res = await axiosSecure.get(`/donation-requests`)
            return res.data
        }
    })
    return {data, isPending, refetch}
};

export default useAllDonationRequests;