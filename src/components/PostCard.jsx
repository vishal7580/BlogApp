import React, { useEffect, useState } from 'react'
import { fileService } from '../appwrite/storage'
import {Link} from 'react-router-dom'
import parse from 'html-react-parser';
const PostCard = ({post,fileId}) => {

    const[imgUrl,setImgUrl] = useState(null)
    // console.log(typeof post.content)
    useEffect(()=> {
       const url = fileService.getFileView(fileId)
       setImgUrl(url)
       
    },[fileId])
  return (
      <div className='rounded-lg bg-white p-3 w-full md:max-w-[30%]'>
    <Link to={`/post/${post.$id}`}>

            <div className=' overflow-hidden rounded-md'>
                <img src={imgUrl}
                    className=' object-cover  w-full h-full'
                />
            </div>
            <div className='tracking-tight'>
                <p className='font-semibold mt-2 text-sm'>{post.title}</p>
                <span className='text-xs leading-3  opacity-90'>{parse(post.content.slice(0,50))}</span>
                {/* <p className='text-sm'>{post.$updatedAt}</p> */}
            </div>
    </Link>
        </div>
            
  )
}

export default PostCard