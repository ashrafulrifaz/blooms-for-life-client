// import { useQuery } from "@tanstack/react-query";
// import useAuth from "./useAuth";
// import useAxiosSecure from "./useAxiosSecure";

// const useAdmin = () => {
//     const {user} = useAuth()
//     const axiosSecure = useAxiosSecure()

//     const {data: isAdmin, isPending: isAdminPending} = useQuery({
//         queryKey: [user?.email, 'isAdmin'],
//         queryFn: async () => {
//             const res = await axiosSecure.get(`users/${user?.email}`)
//             return res.data.admin
//         }
//     })

//     return [isAdmin, isAdminPending]
    
// // };

// const useAdmin = () => {
//     const admin = 'admin';

//     return [admin]
// }

// export default useAdmin;