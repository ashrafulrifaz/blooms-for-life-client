import { Link } from "react-router-dom";
import PropTypes from 'prop-types';

const BlogPageCard = ({post}) => {
    const {thumbnail_image, title, content, _id} = post || {}
    const description = content.slice(0, 160).replace('</', '').concat('....')

    return (        
        <div className="">
            <img src={thumbnail_image} alt="" className="w-full h-auto lg:h-60 rounded-t-lg" />
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

BlogPageCard.propTypes = {
    post: PropTypes.object
}

export default BlogPageCard;