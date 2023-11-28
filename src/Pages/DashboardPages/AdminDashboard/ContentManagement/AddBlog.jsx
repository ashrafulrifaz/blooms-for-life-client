import { useMemo, useRef, useState } from "react";
import useAxiosSecure from "../../../../Hooks/useAxiosSecure";
import axios from "axios";
import { useForm } from "react-hook-form";
import JoditEditor from 'jodit-react';

const AddBlog = ({placeholder}) => {
    const [loadingBlog, setLoadingBlog] = useState(false);
    const { register, handleSubmit, formState: { errors }, reset } = useForm()
    const axiosSecure = useAxiosSecure()
	const editor = useRef(null);
	const [content, setContent] = useState('');
    const [requiredContent, setRequiredContent] = useState(false)

	const config = useMemo(
		() => ({
            readonly: false,
            placeholder: placeholder || 'Start typing...'
        }),
        [placeholder]
	);


    const image_hosting_key = import.meta.env.VITE_IMAGE_HOSTING_API_KEY
    const image_hosting_url = `https://api.imgbb.com/1/upload?key=${image_hosting_key}`

    const onSubmit = async(data) => {
        if(!content) {
            setRequiredContent(true)
        }
        setRequiredContent(false)

        setLoadingBlog(true)
        
        const imageFile = {image: data.image[0]}
        const res = await axios.post(image_hosting_url, imageFile, {
            headers: {
                'Content-Type': 'multipart/form-data',
            }
        })
        if(res.data.success){
            const blogInfo = {
                title: data.title,
                thumbnail_image: res.data.data.display_url,
                content: content,
                status: 'draft'
            }
            axiosSecure.post('/blogs', blogInfo)
                .then(() => {
                    reset()
                    setLoadingBlog(false)
                })
        }
        setLoadingBlog(false)
        
    }

    return (
        <div className="bg-white p-4 md:p-10 rounded-lg add_blog">
            <h2 className="font-second text-xl">Add a New Blog</h2>
            <form onSubmit={handleSubmit(onSubmit)} className='space-y-4 py-10'>
                <div className='space-y-2'>
                    <label>Title*</label>
                    <textarea {...register("title", { required: true })} type="text" placeholder='title of the blog'/>
                    {errors.title && <span className='text-red-500 font-medium text-sm'>Title is required</span>}
                </div>   
                <div className='space-y-2'>
                    <label>Thumbnail Image*</label>
                    <input {...register("image", { required: true })} type="file" accept=".jpg, .jpeg, .png, .webp" style={{border: 'none', padding: '5px'}} />
                    {errors.image && <span className='text-red-500 font-medium text-sm'>Image is required</span>} 
                </div>   
                <div className='space-y-2'>
                    <label>Content*</label>
                    <JoditEditor
                        className="font-medium"
                        ref={editor}
                        value={content}
                        config={config}
                        tabIndex={1} 
                        onBlur={newContent => setContent(newContent)}
                        onChange={newContent => setContent(newContent)}
                    />
                    {requiredContent && <span className='text-red-500 font-medium text-sm'>Content is required</span>}
                </div>      
                <button className='px-10 flex items-center gap-3'>
                    <span>Create Blog</span>
                    {loadingBlog && <span className="loading loading-spinner loading-sm"></span>}
                </button>
            </form>
        </div>
    );
};

export default AddBlog;