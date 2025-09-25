import { Client, Account, ID } from "appwrite";
import conf from "../config/config";

class AuthService {
  client = new Client();
  account;

  constructor() {
    this.client
        .setEndpoint(conf.appwriteUrl)
        .setProject(conf.appwriteProjectId)

    this.account = new Account(this.client);
  }

  async createAccount({email,password,name}){
    
        try {
            const user = await this.account.create(
                ID.unique(),
                email,
                password,
                name
            )
            return user
        } catch (error) {
            console.log('Appwrite createAccount error: ',error)
            //TODO: handle multiple account creation error
        }
        
  }

  async getCurrentAccount(){
    try {
        const user = await this.account.get()
        return user;
    } catch (error) {
            console.log('Appwrite getCurrentAccount error: ',error)
            console.log('No active session found')
    }
    return null
  }

  async login ({email,password}){
    try {
      if(await this.checkAllSessions()){
        await this.logout()
      }
        const session = await this.account.createEmailPasswordSession(email,password)
          if(session){
           return await this.getCurrentAccount()
          }

    } catch (error) {
            console.log('createSession error: ',error)
        
    }
  }
    async  checkAllSessions() {
    try {
      const sessions = await this.account.listSessions();
      console.log("All sessions:", sessions); 
      return true
    } catch (err) {
      console.log("Error fetching sessions:", err.message);
    }
  }


  async logout(){
    try {
        await this.account.deleteSessions();
        return true
    } catch (error) {
        console.log('Appwrite deleteSessions error: ',error)
        
    }
    return false
  }


}

export const authService = new AuthService();
 