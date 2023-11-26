import { useQuery } from "@tanstack/react-query";
import useAxiosSecure from "../../../../Hooks/useAxiosSecure";
import { useEffect, useState } from "react";
import UserDonationCard from "../../UserDashboard/HomePage/UserDonationCard";


const AllDonationRequest = () => {
    const axiosSecure = useAxiosSecure()
    const { data, isPending, refetch } = useQuery({
        queryKey: ['all_requests'],
        queryFn: async () => {
            const res = await axiosSecure.get(`/donation-requests`)
            return res.data
        }
    })
    console.log(data);
    const [currentData, setCurrentData] = useState(data || [])
    const [currentPage, setCurrentPage] = useState(0)
    const perPageItem = 4
    
    const isInProgress = data?.some(item => item.status == 'inprogress')

    useEffect(() => {
        setCurrentData(data)
    }, [data]) 

    // filtering data
    const pendingData = data?.filter(item => item.status === 'pending')
    const inprogressData = data?.filter(item => item.status === 'inprogress')
    const doneData = data?.filter(item => item.status === 'done')
    const canceledData = data?.filter(item => item.status === 'canceled')


    // pagination calculation
    const lastItemIndex = perPageItem * currentPage;
    const firstItemIndex = lastItemIndex - perPageItem
    const totalPage = Math.ceil(currentData?.length / perPageItem)    
    const pages = currentData ? [...Array(totalPage).keys()] : []    

    const handleFiltering = e => {
        const filterValue = e.target.value;
        setCurrentPage(0)
        if(filterValue === 'all'){
            setCurrentData(data)
        } else if(filterValue === 'pending') {
            setCurrentData(pendingData)
        } else if(filterValue === 'inprogress') {
            setCurrentData(inprogressData)
        } else if(filterValue === 'done') {
            setCurrentData(doneData)
        } else if(filterValue === 'canceled') {
            setCurrentData(canceledData)
        } else {
            setCurrentData(data)
        }
    }


    return (
        <div className="mt-8 bg-white rounded-xl p-5">
                <div className="flex items-center justify-between">
                    <h3 className="text-lg capitalize">Your all donation requests</h3>
                    <select onChange={handleFiltering} name="filter" className="capitalize border border-slate-300 rounded-lg focus:outline-none py-1 px-2">
                        <option value="all">all</option>
                        <option value="pending">pending</option>
                        <option value="inprogress">inprogress</option>
                        <option value="done">done</option>
                        <option value="canceled">canceled</option>
                    </select>
                </div>
                <div className="overflow-x-auto my-8 wrapper">
                    <table className="table">
                        <thead className="bg-[#D7EDFF] text-[#39A7FF] uppercase text-[13px]" style={{borderRadius: '50px'}}>
                            <tr>
                                <th>recipient name</th>
                                <th>recipient location</th>
                                <th>Date & Time</th>
                                <th>Status</th>
                                <th>Action</th>
                                { isInProgress && <th>donor info</th> }
                                { isInProgress && <th>Update Status</th> }
                            </tr>
                        </thead>
                        <tbody>
                            {
                                currentData?.length > 0 &&
                                currentData?.length > 4 ? 
                                currentData && currentData?.map((item, idx) => <UserDonationCard key={idx} item={item} refetch={refetch}></UserDonationCard>).slice(firstItemIndex + 4, lastItemIndex + 4)
                                :
                                currentData && currentData?.map((item, idx) => <UserDonationCard key={idx} item={item} refetch={refetch}></UserDonationCard>)
                            }
                        </tbody>
                    </table>
                    {
                        currentData?.length === 0 &&
                        <p className="text-center py-5 text-xl capitalize font-second">no {isInProgress} data found</p>
                    }
                </div>
                {currentData?.length > 0 && <p className="text-xs uppercase -mt-5">slide right to see full table</p>}
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
    );
};

export default AllDonationRequest;