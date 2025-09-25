import { Client, Databases, ID } from "appwrite";
import conf from "../config/config";

class DbService {
  client = new Client();
  database;

  constructor() {
    this.client
        .setEndpoint(conf.appwriteUrl)
        .setProject(conf.appwriteProjectId)

    this.database = new Databases(this.client);
  }

  async createPost(slug,{title,content,featuredImage,status,userId}){
    try {
        const post =  await this.database.createDocument(
            conf.appwriteDatabaseId,
            conf.appwriteCollectionId,
            slug, //document id
            {
                title,
                content,
                featuredImage,
                status,
                userId
            }
        )
        return post
    } catch (error) {
        console.log('DB service createPost error: ',error)
    }
  }
  async getPost(slug){

    try {
        const post =  await this.database.getDocument(
            conf.appwriteDatabaseId,
            conf.appwriteCollectionId,
            slug, //document id
        )
        return post
    } catch (error) {
        console.log('DB service getPost error: ',error)
    }
  }
  async updatePost(slug,updatedData){
    try {
        const updatePostData = {}
       for(let [field,value] of Object.entries(updatedData)){
          updatePostData[field] = value
        }

        const updatedPost = await this.database.updateDocument(
            conf.appwriteDatabaseId,
            conf.appwriteCollectionId,
            slug,
            updatePostData
        )
        return updatedPost;
    } catch (error) {
        console.log('DB service updatePost error: ',error)
    }
  }
  async getAllPosts(){
    try {
        const allPosts = await this.database.listDocuments(
            conf.appwriteDatabaseId,
            conf.appwriteCollectionId,
        )
        return allPosts;
    } catch (error) {
        console.log('DB service getAllPosts error: ',error)
    }
  }
  async deletePost(slug){
    try {
        await this.database.deleteDocument(
            conf.appwriteDatabaseId,
            conf.appwriteCollectionId,
            slug
        )
        return true
    } catch (error) {
        console.log('DB service getAllPosts error: ',error)
    }
  }


}

export const dbService = new DbService();