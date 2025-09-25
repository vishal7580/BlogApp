import React, { useEffect, useState } from 'react'
import { fileService } from '../appwrite/storage'
import {Link} from 'react-router-dom'

const PostCard = ({post,fileId}) => {

    const[imgUrl,setImgUrl] = useState(null)

    useEffect(()=> {
       const url = fileService.getFileView(fileId)
       setImgUrl(url)
       
    },[fileId])
  return (
    <Link to={`/post/${post.$id}`}>
            
        <div className='rounded-lg bg-white p-3'>

            <div className='w-[300px] h-[150px] overflow-hidden rounded-md'>
                <img src={imgUrl}
                    className=' object-cover  w-full h-full'
                />
            </div>
            <p className='font-semibold mt-3'>{post.title}</p>
        </div>
    </Link>
  )
}

export default PostCard