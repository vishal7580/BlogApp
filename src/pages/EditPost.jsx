import React, { useState ,useEffect} from 'react'
import { Input, PostForm, Select } from '../components'
import { useParams } from 'react-router-dom';
import { dbService } from '../appwrite/db';
const EditPost = () => {
  const {slug} = useParams();
  const [post,setPost] = useState(null);

  useEffect(() => {

    dbService.getPost(slug).then(data => {
      setPost(data)
    })
  }, [slug])
  
  return (
    <div className='border'>
      <PostForm post={{...post}}/>

    </div>
  )
}

export default EditPost