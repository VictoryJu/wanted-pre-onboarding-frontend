import axios from "axios";
import { IPutTodo, IReqTodo } from "src/interfaces/todo";
import axiosInstance from "src/utils/fetch";

const todoApiUrl = "https://www.pre-onboarding-selection-task.shop/todos"



const createTodo = async (todo:IReqTodo) =>{
  try{
    const res = await axiosInstance.post(todoApiUrl,todo);
    return res
  }catch(e:any){
    throw new Error(e.response.data.message)
  }
}

const getTodos = async () =>{
  try{
    const res = await axiosInstance.get(todoApiUrl);
    return res
  }catch(e:any){
    throw new Error(e.response.data.message)
  }
}

const updateTodo = async (updateTodo:IPutTodo)=>{
    try{
        const res = await axiosInstance.put(`${todoApiUrl}/${updateTodo.id}`,{todo:updateTodo.todo,isCompleted:updateTodo.isCompleted});
        return res
    }catch(e:any){
        throw new Error(e.response.data.message)
    }
}

const deleteTodo = async (todoId:number) =>{
  try{
    const res = await axios.delete(`${todoApiUrl}/${todoId}`);
    return res
  }catch(e:any){
    throw new Error(e.response.data.message)
  }
}



const todoApi = {
  createTodo,
  getTodos,
  updateTodo,
  deleteTodo
}

export default todoApi