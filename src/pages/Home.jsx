import React, { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { dbService } from '../appwrite/db'
import { PostCard } from '../components'
import { login, logout } from '../store/authSlice'
import { authService } from '../appwrite/auth'
import Loader from '../components/Loader'
import { useNavigate } from 'react-router-dom'


const Home = () => {

  const [posts,setPosts] = useState(null)
  const authStatus = useSelector(state => state.auth.status)
  const dispatch = useDispatch()
  const navigate = useNavigate()

  async function allPosts(){
    console.log('getting all Posts')
    try {
      const posts = await dbService.getAllPosts()
      setPosts(posts.documents)
    } catch (error) {
      console.log(error)
    } 
    
  }
  useEffect(()=> {
    authService.getCurrentAccount()
    .then(user => {
      console.log(user)
      if(user){
        allPosts()
        dispatch(login(user))
      } else{
        dispatch(logout())
        navigate('/logout')
      }
    })
  },[authStatus])


  return (
    <div className='px-10 py-8 '>
      {
       authStatus &&
        posts ?
          <div className='flex gap-6 flex-wrap  w-full justify-center'>
          {
            posts.map(post=> (
              <PostCard key={post.$id} post={post} fileId = {post.featuredImage}/>
            ))
          }
        </div> : <Loader />


     
      }
    </div>
  )
}

export default Home

// Bbbb3@nksdlf
// amitkumar@gmail.com

//Cblksdj$4435
//one@gmail.com
//