import { IReqSignin } from "src/interfaces/auth";
import axios from 'axios';

const apiUrl = "https://www.pre-onboarding-selection-task.shop"

const signin =  async (info:IReqSignin)=> {
  try{
    const res = await axios.post(`${apiUrl}/auth/signin`,info);
    return res;
  }catch(e:any){
    throw new Error(e);
  }
} 

const authApi = {
  signin
}

export default authApi