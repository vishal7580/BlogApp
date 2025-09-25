import { Client ,Storage ,ID} from "appwrite";
import conf from "../config/config";

class StorageService {
    client = new Client()
    storage;
    constructor() {
        this.client.setEndpoint(conf.appwriteUrl)
        .setProject(conf.appwriteProjectId)
        
        this.storage = new Storage(this.client)
    }

    async uploadFile(file){
        try {
            const uploadedFile = await this.storage.createFile(
                conf.appwriteBucketId,
                ID.unique(),
                file,
            )
            return uploadedFile //what to return if no file is uploaded
        } catch (error) {
            console.log('uploadFile Error: ',error)
        }
    }
    async getFile(fileId){
        try {
            const receviedFile = await this.storage.getFile(
                conf.appwriteBucketId,
                fileId
            )
            return receviedFile
        } catch (error) {
            console.log('getFile Error: ',error)
        }
    }
    async deleteFile(fileId){
        try {
            const deletedFile = await this.storage.deleteFile(
                conf.appwriteBucketId,
                fileId
            )
            return deletedFile
        } catch (error) {
            console.log('deletedFile Error: ',error)
        }
    }
     getFileView(fileId){
        try {
            const imgPreview =  this.storage.getFileView(
                conf.appwriteBucketId,
                 fileId
                //what more can be added here CHEKC
            )
            return imgPreview
        } catch (error) {
            console.log('getFilePreview Error: ',error)
        }
    }
}

export const fileService = new StorageService();