import { IReqSignin } from "src/interfaces/auth";
import axios from 'axios';

const authApiUrl = "https://www.pre-onboarding-selection-task.shop/auth"

const signin =  async (info:IReqSignin)=> {
  try{
    const res = await axios.post(`${authApiUrl}/signin`,info);
    return res;
  }catch(e:any){
    throw new Error(e.response.data.message);
  }
} 

const signup = async (info:IReqSignin) => {
  try{
    const res = await axios.post(`${authApiUrl}/signup`,info);
    return res;
  }catch(e:any){
    throw new Error(e.response.data.message);
  }
}

const authApi = {
  signin,
  signup
}

export default authApi