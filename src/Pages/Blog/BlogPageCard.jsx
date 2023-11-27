
const BlogPageCard = ({post}) => {
    const {thumbnail_image, title, content} = post || {}
    const description = content.slice(0, 165).replace('</', '').concat('....')

    return (        
        <div className="">
            <img src={thumbnail_image} alt="" className="w-full h-60 rounded-t-lg" />
            <div className="p-4 border border-slate-300 border-t-0 rounded-b-lg space-y-2.5">
                <h3 className="text-xl">{title}</h3>
                <p dangerouslySetInnerHTML={{__html: description}} className="font-medium" />
                <button>Read More</button>
            </div>
        </div>
    );
};

export default BlogPageCard;