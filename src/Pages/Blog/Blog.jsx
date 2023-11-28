import { useState } from "react";
import usePublicBlogs from "../../Hooks/usePublicBlogs";
import BlogPageCard from "./BlogPageCard";
import { useEffect } from "react";

const Blog = () => {
    const {data, isPending} = usePublicBlogs()
    const [currentData, setCurrentData] = useState([])
    const [currentPage, setCurrentPage] = useState(0)
    const perPageItem = 6

    useEffect(() => {
        setCurrentData(data)
    }, [data])

    const lastItemIndex = perPageItem * currentPage;
    const firstItemIndex = lastItemIndex - perPageItem
    const totalPage = Math.ceil(currentData?.length / perPageItem)    
    const pages = currentData ? [...Array(totalPage).keys()] : []

    return (
        <div className="py-12 max-w-[1150px] mx-auto">
            <div className="grid grid-cols-3 gap-10">
                    
                {
                    currentData?.length > 0 &&
                    currentData?.length > 6 ? 
                    currentData && currentData?.map((post, idx) => <BlogPageCard key={idx} post={post}></BlogPageCard>).slice(firstItemIndex + 6, lastItemIndex + 6)
                    :
                    currentData && currentData?.map((post, idx) => <BlogPageCard key={idx} post={post}></BlogPageCard>)
                }
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
    );
};

export default Blog;