import { AiOutlineFileAdd } from "react-icons/ai";
import { Link } from "react-router-dom";
import { useEffect, useState } from "react";
import BlogCard from "./BlogCard";
import useBlogData from "../../../../Hooks/useBlogData";

const ContentManagement = () => {
    const {data, isPending, refetch} = useBlogData()
    const [currentData, setCurrentData] = useState(data || [])
    const [currentPage, setCurrentPage] = useState(0)
    const perPageItem = 4

    useEffect(() => {
        setCurrentData(data)
    }, [data]) 

    // filtering data
    const draftBlog = data?.filter(item => item.status === 'draft')
    const publishedBlog = data?.filter(item => item.status === 'published')


    // pagination calculation
    const lastItemIndex = perPageItem * currentPage;
    const firstItemIndex = lastItemIndex - perPageItem
    const totalPage = Math.ceil(currentData?.length / perPageItem) || 0    
    const pages = currentData ? [...Array(totalPage).keys()] : []
    

    const handleFiltering = e => {
        const filterValue = e.target.value;
        setCurrentPage(0)
        if(filterValue === 'all'){
            setCurrentData(data)
        } else if(filterValue === 'draft') {
            setCurrentData(draftBlog)
        } else if(filterValue === 'published') {
            setCurrentData(publishedBlog)
        } else {
            setCurrentData(data)
        }
    }
    
    return (
        <div className="p-5 lg:p-10 bg-white rounded-lg blog">
            <div className="flex justify-between">
                <select onChange={handleFiltering} name="filter" className="capitalize border border-slate-300 rounded-lg focus:outline-none py-1 px-2">
                    <option value="all">all</option>
                    <option value="draft">draft</option>
                    <option value="published">published</option>
                </select>
                <Link to="/dashboard/content-management/add-blog">
                    <a className={`flex items-center gap-2 cursor-pointer rounded-md px-3 py-1.5 text-white bg-primary transition-all hover:scale-105`}>
                        <AiOutlineFileAdd />   
                        <span className="text-sm">Add Blog</span>
                    </a>
                </Link>
            </div>
            {
                isPending ? 
                <div className="text-center py-10">
                    <span className="loading loading-spinner loading-lg"></span>
                </div>
                :
                <div className="overflow-x-auto my-8 wrapper">
                    <table className="table">
                        <thead className="bg-[#D7EDFF] text-[#39A7FF] uppercase text-[13px]">
                            <tr>
                                <th>Thumbnail Image</th>
                                <th>Title</th>
                                <th>Status</th>
                                <th>Action</th>
                            </tr>
                        </thead>
                        <tbody>
                            {
                                currentData?.length > 0 &&
                                currentData?.length > 4 ? 
                                currentData && currentData?.map((item, idx) => <BlogCard key={idx} item={item} refetch={refetch}></BlogCard>).slice(firstItemIndex + 4, lastItemIndex + 4)
                                :
                                currentData && currentData?.map((item, idx) => <BlogCard key={idx} item={item} refetch={refetch}></BlogCard>)
                            }
                        </tbody>
                    </table>
                    {
                        currentData?.length === 0 &&
                        <p className="text-center py-5 text-xl capitalize font-second">no blog found</p>
                    }
                </div>
            }
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

export default ContentManagement;