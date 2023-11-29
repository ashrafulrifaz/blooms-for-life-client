import PropTypes from 'prop-types';
import { useParams } from "react-router-dom";
import useBlogData from "../../../../Hooks/useBlogData";
import { useForm } from "react-hook-form";
import useAxiosSecure from "../../../../Hooks/useAxiosSecure";
import JoditEditor from 'jodit-react';
import { useMemo, useRef, useState } from "react";
import axios from "axios";

const EditBlog = ({placeholder}) => {
    const {data, refetch} = useBlogData()
    const {id} = useParams()
    const { register, handleSubmit } = useForm()
    const axiosSecure = useAxiosSecure()
    const currentData = data?.find(item => item._id === id)
	const editor = useRef(null);
	const [updateContent, setUpdateContent] = useState('');
    const [updatingBlog, setUpdatingBlog] = useState(false);
    const {_id, title, thumbnail_image, content} = currentData || {}

    const config = useMemo(
		() => ({
            readonly: false,
            placeholder: placeholder || content || ''
        }),
        [placeholder, content]
	);

    const image_hosting_key = import.meta.env.VITE_IMAGE_HOSTING_API_KEY
    const image_hosting_url = `https://api.imgbb.com/1/upload?key=${image_hosting_key}`

    const onSubmit = async(data) => {
        setUpdatingBlog(true)
        let newImage;
        if(data.image.length > 0){
            const imageFile = {image: data.image[0]}
            const res = await axios.post(image_hosting_url, imageFile, {
                headers: {
                    'Content-Type': 'multipart/form-data',
                }
            })
            if(res.data.success){
                newImage = res.data.data.display_url
                console.log(res.data.data.display_url);
            } else {     
                newImage = thumbnail_image
                setUpdatingBlog(true)
                return
            }
        }
        const updateBlogInfo = {
            title: data.title,
            thumbnail_image: newImage !== undefined ? newImage : thumbnail_image,
            content: updateContent
        }
        axiosSecure.put(`/blogs/${_id}`, updateBlogInfo)
        .then(res => {
            console.log(res.data);
            refetch()
            setUpdatingBlog(false)
        })
        setUpdatingBlog(false)
    }

    return (
        <div className="p-5 lg:p-10 bg-white rounded-lg donation_request">
            <h2 className="font-second text-xl">Edit This Blog</h2>
            <form onSubmit={handleSubmit(onSubmit)} className="mt-8 space-y-4">
                <div className='space-y-2'>
                    <label>Title*</label>
                    <textarea defaultValue={title} {...register("title")} type="text" placeholder='title of the blog'/>
                </div>   
                <div className='space-y-2'>
                    <label>Thumbnail Image*</label>
                    <div className="flex flex-col md:flex-row gap-4 items-left md:items-center">
                        <img src={thumbnail_image} className="w-full md:w-52 lg:w-60 rounded-xl" alt="" />
                        <input {...register("image")} type="file" accept=".jpg, .jpeg, .png, .webp" style={{border: 'none', padding: '5px'}} />
                    </div>
                </div>   
                <div className='space-y-2'>
                    <label>Content*</label>
                    <JoditEditor
                        className="font-medium"
                        ref={editor}
                        value={content}
                        config={config}
                        tabIndex={1} 
                        onBlur={newContent => setUpdateContent(newContent)}
                        onChange={newContent => setUpdateContent(newContent)}
                    />
                </div>      
                <button className='px-10 flex items-center gap-3'>
                    <span>Update Blog</span>
                    {updatingBlog && <span className="loading loading-spinner loading-sm"></span>}
                </button>
            </form>
        </div>
    );
};

EditBlog.propTypes = {
    placeholder: PropTypes.object
}

export default EditBlog;