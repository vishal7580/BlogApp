import React, { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { useNavigate, useParams,Link } from "react-router-dom";
import { dbService } from "../appwrite/db";
import { fileService } from "../appwrite/storage";
import parse from "html-react-parser";


const Post = () => {
  const currentUser = useSelector((state) => state.auth.userData);
  let { slug } = useParams();
  // slug = slug.slice(1)

  const [post, setPost] = useState(null);
  const [imgUrl, setImgUrl] = useState(null);
  const navigate = useNavigate()

  let authorisedUser = false;
  if (currentUser && post) {
    authorisedUser = currentUser.$id === post.userId ? true : false;
  }
  // console.log(authorisedUser)
  useEffect(() => {
    dbService.getPost(slug).then((post) => {
      const url = fileService.getFileView(post.featuredImage);
      setImgUrl(url);
      setPost(post);
    });
  }, []);

  const deletePost = ()=> {
    fileService.deleteFile(post.featuredImage)
    .then(()=>{
      dbService.deletePost(slug)
      .then(()=> {
        navigate('/')
      })
    })
  }
  return post ? (
    <div className="p-6">
      <div className="h-[500px] w-full overflow-hidden rounded-lg relative">
        <img src={imgUrl} className="w-full h-full object-cover" />
        {
          authorisedUser && 
          <div className="flex gap-3 absolute top-4 right-4">
            {/* Edit Button */}
            <Link to= {`/edit-post/${slug}`}>

            <button
              className="px-4 py-2 rounded-lg bg-green-100 text-green-700 font-medium 
                hover:bg-green-200 hover:text-green-800 transition-colors duration-200"
            >
              Edit
            </button>
            </Link>
            {/* Delete Button */}
            <button
              className="px-4 py-2 rounded-lg bg-red-500 text-white font-medium 
            hover:bg-red-600 transition-colors duration-200"
            onClick={deletePost}
            >
              Delete
            </button>
          </div>
        }
      </div>
      <div className="mt-6">
        <div>
          <span className="font-semibold text-xl">Title: </span>
          <span> {post.title}</span>
        </div>
        <div className="">
          <span className="font-semibold text-xl">Content: </span>
          <span> {parse(post.content)}</span>
        </div>
      </div>
    </div>
  ) : null;
};

export default Post;
