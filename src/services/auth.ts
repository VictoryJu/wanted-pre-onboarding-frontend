import { IUser } from "src/interfaces/auth";
import axios from 'axios';
import axiosInstance from "src/utils/fetch";

const authApiUrl = "https://www.pre-onboarding-selection-task.shop/auth"

const signin =  async (info:IUser)=> {
  try{
    const res = await axiosInstance.post(`${authApiUrl}/signin`,info);
    return res;
  }catch(e:any){
    throw new Error(e.response.data.message);
  }
} 

const signup = async (info:IUser) => {
  try{
    const res = await axiosInstance.post(`${authApiUrl}/signup`,info);
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