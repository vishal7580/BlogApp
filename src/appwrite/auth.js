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
    }
  }


  async login ({email,password}){
    try {
        // await this.logout ()
        await this.account.createEmailPasswordSession(email,password)
        return await this.getCurrentAccount()

    } catch (error) {
        console.log('createSession error: ',error)
        
    }
  }
    async  checkAllSessions() {
      const response = await this.account.listSessions();
      console.log('active sessions:',response)
      response?.sessions.forEach(session => {
        console.log(session.providerUid)
      });
  }


  async logout(){
    try {
      await this.account.deleteSession('current');
      return true
    } catch (error) {
        console.log('Appwrite deleteSessions error: ',error)
    }
    return false
  }


}

export const authService = new AuthService();
 