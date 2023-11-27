import { Link } from "react-router-dom";

const BlogPageCard = ({post}) => {
    const {thumbnail_image, title, content, _id} = post || {}
    const description = content.slice(0, 165).replace('</', '').concat('....')

    return (        
        <div className="">
            <img src={thumbnail_image} alt="" className="w-full h-60 rounded-t-lg" />
            <div className="p-4 border border-slate-300 border-t-0 rounded-b-lg space-y-2.5">
                <h3 className="text-xl">{title}</h3>
                <p dangerouslySetInnerHTML={{__html: description}} className="font-medium" />
                <Link to={`/blog/${_id}`}>
                    <button className="mt-3 text-sm py-1.5 px-3">Read More</button>
                </Link>
            </div>
        </div>
    );
};

export default BlogPageCard;