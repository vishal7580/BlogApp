import React, { useEffect, useState } from 'react'
import { useSelector } from 'react-redux'
import { dbService } from '../appwrite/db'
import { PostCard } from '../components'


const Home = () => {

  const [posts,setPosts] = useState(null)
  const authStatus = useSelector((state)=> state.auth.status)

  function allPosts(){
     console.log('getting all Posts')
    dbService.getAllPosts()
    .then(allPosts => {
      setPosts(allPosts.documents)
    })

  }

  useEffect(()=> {
    if(authStatus){
      allPosts()
    }

  },[authStatus])


  return (
    <div className='px-10 py-8 '>
      {
       authStatus ? 
        posts ?
          <div className='flex gap-6 flex-wrap  '>
          {
            posts.map(post=> (
              <PostCard key={post.$id} post={post} fileId = {post.featuredImage}/>
            ))
          }
        </div> :
        <div className="flex items-center justify-center ">
          <div className="w-14 h-14 border-4 border-white border-dashed rounded-full animate-spin"></div>
        </div>

        : <div className='text-2xl mx-auto w-full text-white text-center font-semibold '> Login to See Blogs</div>
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