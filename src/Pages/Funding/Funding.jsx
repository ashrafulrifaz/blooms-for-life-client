import FundingCard from "./FundingCard";
import funding1 from '../../assets/funding-1.png'
import funding2 from '../../assets/funding-2.png'
import funding3 from '../../assets/funding-3.png'
import useFundedData from "../../Hooks/useFundedData";
import { useState } from "react";
import { useEffect } from "react";
import FundedHistoryCard from "./FundedHistoryCard";

const Funding = () => {
    const des1 = 'Empower minds, transform futures. Together, let us break down barriers and ensure every child has access to quality education.'
    const des2 = 'Support our mission to bring clean water to children in need. Your small act of kindness can create a big ripple of change.'
    const des3 = 'Cultivate a sustainable future! Our Green Revolution initiative aims to sow the seeds of environmental change.'
    const {data, isPending} = useFundedData()
    const [currentData, setCurrentData] = useState([])
    const [currentPage, setCurrentPage] = useState(0)
    const perPageItem = 6
    console.log(currentData);

    useEffect(() => {
        setCurrentData(data)
    }, [data])

    const lastItemIndex = perPageItem * currentPage;
    const firstItemIndex = lastItemIndex - perPageItem
    const totalPage = Math.ceil(currentData?.length / perPageItem) || 0    
    const pages = currentData ? [...Array(totalPage).keys()] : []

    return (
        <div className="py-10 max-w-[90%] lg:max-w-[1150px] mx-auto">
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                <FundingCard donation_id={1} image={funding1} title={'Education for all'} description={des1}></FundingCard>
                <FundingCard donation_id={2} image={funding2} title={'Bring water to the children'} description={des2}></FundingCard>
                <FundingCard donation_id={3} image={funding3} title={'Green Revolution'} description={des3}></FundingCard>
            </div>
            <div className="py-7 funding">
                <h3 className="mt-3 capitalize font-second text-xl">Funding History</h3>
                <div className="overflow-x-auto my-8 wrapper">
                    <table className="table">
                        <thead className="bg-[#D7EDFF] text-[#39A7FF] uppercase text-[13px]">
                            <tr>
                                <th>Donor image</th>
                                <th>donor name</th>
                                <th>donor email</th>
                                <th>Funded Amount</th>
                            </tr>
                        </thead>
                        <tbody>
                            {
                                currentData?.length > 0 &&
                                currentData?.length > 6 ? 
                                currentData && currentData?.map((item, idx) => <FundedHistoryCard key={idx} item={item}></FundedHistoryCard>).slice(firstItemIndex + 6, lastItemIndex + 6)
                                :
                                currentData && currentData?.map((item, idx) => <FundedHistoryCard key={idx} item={item}></FundedHistoryCard>)
                            }
                        </tbody>
                    </table>
                </div>
                <div className="pagination flex justify-center text-center gap-3 mt-5">
                    {
                        currentData?.length > 6 &&
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

export default Funding;