import React, { useState ,useEffect} from "react";
import Input from "./Input";
import Select from "./Select";
import Button from "./Button";
import { useForm } from "react-hook-form";
import RTE from "./RTE";
import {useSelector} from 'react-redux'
import { dbService } from "../appwrite/db";
import { fileService } from "../appwrite/storage";
import { useNavigate } from "react-router-dom";


const PostForm = ({post}) => {
    // console.log('post: ',post?.title)
    const { control, register, handleSubmit, getValues, setValue, reset } = useForm({
      defaultValues: {
        title: '',
        slug: '',
        featuredImage: '',
        status: 'active',
        content: ''
      }
    });
    const navigate = useNavigate()
    const createPost = async (formData)=> {
      console.log('create Post: ',formData)
      
      if(!post){
        let file = {}
        try {
          file = await fileService.uploadFile(formData.featuredImage[0])
          const createdPost = await dbService.createPost(formData.slug,{
            ...formData,
            featuredImage: file.$id,
            userId: userData.$id
          })
          console.log('createdPost :',createdPost)

        } catch (error) {
          fileService.deleteFile(file?.$id)
          console.log(error)
        }
         
      } else{
        let file = {}
        delete formData.slug
        if(formData.featuredImage !== post.featuredImage){
          fileService.deleteFile(post.featuredImage)
          try {
             file = await fileService.uploadFile(formData.featuredImage[0])
          } catch (error) {
            console.log(error)
          }
        }
          try {
            const updatePost = await dbService.updatePost(post.$id,{
              ...formData,
              featuredImage: file?.$id || post.featuredImage,
            })
            console.log('updatedPost: ',updatePost)
            
          } catch (error) {
            fileService.deleteFile(file.$id)
            console.log(error)
          }
      }
      navigate('/')

    }


  const slugTransform = (e)=> {
    let slug = e.target.value.replace(/[^a-zA-Z0-9 ]/g,'');
    slug = slug.replace(/\s+/g, '-').trim()
    slug = slug[slug.length - 1] === '-' ? slug.slice(0,-1) : slug
    setValue('slug',slug)
  }
  const userData = useSelector((state)=> state.auth.userData)
useEffect(() => {
  if (post) {
    reset({
      title: post.title || '',
      slug: post.$id || '',
      featuredImage: post.featuredImage || '',
      status: post.status || 'active',
      content: post.content || ''
    });
  }
}, [post, reset]);
  return (
    <form onSubmit={handleSubmit(createPost)}>
      <div className="p-6 flex gap-7 ">
        <div className="w-2/3 ">
          <Input
            type="text"
            placeholder="Enter title"
            label="Title"
            labelClass="text-lg"
            {...register('title',{
              required: true,
              })}
            onInput={slugTransform}
            
          />
          <Input
            type="text"
            placeholder="Enter slug"
            label="Slug"
            labelClass="text-lg"
            {...register('slug')}
          />

 
        </div>

        <div className="w-2/3">
          <Input
            label="Image"
            type="file"
            accept="image/*"
            labelClass="text-lg"
            {...register('featuredImage')}
          />


    
            <Select options={["active", "inactive"]} {...register('status')}/>

            {
                post ? 
              <div className=" flex justify-end">
                <Button type="submit"
                  classname=" text-white bg-green-500 font-semibold px-6 py-3 rounded-lg shadow hover:bg-green-600 hover:shadow-md transition duration-200"
                  > Update Post
                </Button> 
              </div>
              :
              <div className=" flex justify-end">
                <Button type="submit" classname=" text-white bg-blue-500 font-semibold px-6 py-3 rounded-lg shadow hover:bg-blue-600 hover:shadow-md transition duration-200">
                Create Post
                </Button>
              </div>
            }
        
        </div>

      </div>
     <div className="p-5">
        <RTE control={control} currentContent={getValues('content') || ''}></RTE>

      </div>

    </form>
  );
};

export default PostForm;
