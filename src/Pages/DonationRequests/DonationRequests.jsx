import DonationCard from "./DonationCard";
import { useEffect, useState } from "react";
import usePendingRequests from "../../Hooks/usePendingRequests";


const DonationRequests = () => {
    const { data, isLoading } = usePendingRequests()
    const [currentData, setCurrentData] = useState([])
    const [currentPage, setCurrentPage] = useState(0)
    const perPageItem = 4
    console.log(currentData);

    useEffect(() => {
        setCurrentData(data)
    }, [data])

    const lastItemIndex = perPageItem * currentPage;
    const firstItemIndex = lastItemIndex - perPageItem
    const totalPage = Math.ceil(currentData?.length / perPageItem) || 0
    const pages = currentData ? [...Array(totalPage).keys()] : []
    
    return (
        <div className="py-8 md:py-12 donation_requests max-w-[90%] md:max-w-[1150px] mx-auto">
            <h2 className="text-2xl font-second capitalize">list of all pending blood donation requests</h2>
            <div className="mt-5 md:mt-8">
                <div className="overflow-x-auto my-8 wrapper">
                    <table className="table">
                        <thead className="bg-[#D7EDFF] text-[#39A7FF] uppercase text-[13px]">
                            <tr>
                                <th>Serial</th>
                                <th>Requester name</th>
                                <th>location</th>
                                <th>Date</th>
                                <th>time</th>
                                <th>Action</th>
                            </tr>
                        </thead>
                        <tbody>
                            {
                                currentData?.length > 0 &&
                                currentData?.length > 4 ? 
                                currentData && currentData?.map((item, idx) => <DonationCard key={idx} item={item} id={idx}></DonationCard>).slice(firstItemIndex + 4, lastItemIndex + 4)
                                :
                                currentData && currentData?.map((item, idx) => <DonationCard key={idx} item={item} id={idx}></DonationCard>)
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

export default DonationRequests;