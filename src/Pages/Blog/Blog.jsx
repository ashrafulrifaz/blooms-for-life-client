import { useState } from "react";
import usePublicBlogs from "../../Hooks/usePublicBlogs";
import BlogPageCard from "./BlogPageCard";
import { useEffect } from "react";

const Blog = () => {
    const {data, isPending} = usePublicBlogs()
    const [currentBlogData, setCurrentBlogData] = useState([])
    const [currentPage, setCurrentPage] = useState(0)
    const perPageItem = 6
    console.log(data, currentBlogData);

    useEffect(() => {
        setCurrentBlogData(data)
    }, [data])

    const lastItemIndex = perPageItem * currentPage;
    const firstItemIndex = lastItemIndex - perPageItem
    const totalPage = Math.ceil(currentBlogData?.length / perPageItem) || 0
    const pages = currentBlogData ? [...Array(totalPage).keys()] : []

    return (
        <>
            {
                isPending && 
                <div className="text-center py-10">
                    <span className="loading loading-spinner loading-lg"></span>
                </div>
            }
            <div className="py-12 max-w-[90%] md:max-w-[95%] xl:max-w-[1150px] mx-auto">
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-10">
                        
                    {
                        currentBlogData?.length > 0 &&
                        currentBlogData?.length > 6 ? 
                        currentBlogData && currentBlogData?.map((post, idx) => <BlogPageCard key={idx} post={post}></BlogPageCard>).slice(firstItemIndex + 6, lastItemIndex + 6)
                        :
                        currentBlogData && currentBlogData?.map((post, idx) => <BlogPageCard key={idx} post={post}></BlogPageCard>)
                    }
                </div>
                <div className="pagination flex justify-center text-center gap-3 mt-5">
                    {
                        currentBlogData?.length > 6 &&
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
        </>
    );
};

export default Blog;