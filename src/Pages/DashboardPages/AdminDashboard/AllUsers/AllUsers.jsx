import { useQuery } from "@tanstack/react-query";
import useAxiosSecure from "../../../../Hooks/useAxiosSecure";
import UsersCard from "./UsersCard";
import { useEffect, useState } from "react";

const AllUsers = () => {
    const axiosSecure = useAxiosSecure()
    const { data, refetch } = useQuery({
        queryKey: ['all_users'],
        queryFn: async () => {
            const res = await axiosSecure.get(`/users`)
            return res.data
        }
    })

    useEffect(() => {
        setCurrentData(data)
    }, [data]) 

    
    const [currentPage, setCurrentPage] = useState(0)
    const [currentData, setCurrentData] = useState(data || [])
    const perPageItem = 4

    const lastItemIndex = perPageItem * currentPage;
    const firstItemIndex = lastItemIndex - perPageItem
    const totalPage = Math.ceil(currentData?.length / perPageItem) || 0    
    const pages = currentData ? [...Array(totalPage).keys()] : []

    return (
        <div className="p-4 md:p-10 bg-white all_users">
            <div className="bg-white rounded-xl">
                <h3 className="text-lg capitalize">Your recent donation requests</h3>
                <div className="overflow-x-auto my-8 wrapper">
                    <table className="table">
                        <thead className="bg-[#D7EDFF] text-[#39A7FF] uppercase text-[13px]">
                            <tr>
                                <th>User Avatar</th>
                                <th>user name</th>
                                <th>user email</th>
                                <th>Status</th>
                                <th>Action</th>
                            </tr>
                        </thead>
                        <tbody>
                            {
                                currentData?.length > 0 &&
                                currentData?.length > 4 ? 
                                currentData && currentData?.map((item, idx) => <UsersCard key={idx} item={item} refetch={refetch}></UsersCard>).slice(firstItemIndex + 4, lastItemIndex + 4)
                                :
                                currentData && currentData?.map((item, idx) => <UsersCard key={idx} item={item} refetch={refetch}></UsersCard>)
                            }
                        </tbody>
                    </table>
                </div>
                <div className="pagination flex justify-center text-center gap-3 mt-5">
                    {
                        currentData?.length > 4 &&
                        pages.map(page => 
                        <a
                            className={currentPage === page ? 'selected' : undefined}
                            onClick={() => {
                                setCurrentPage(page)
                            }}
                            key={page}
                        >{page + 1}</a>
                        )
                    }
                </div>
            </div>
        </div>
    );
};

export default AllUsers;