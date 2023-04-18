import axios from "axios";
import { ITodo } from "src/interfaces/todo";

const todoApiUrl = "https://www.pre-onboarding-selection-task.shop/todos"

const createTodo = async (todo:ITodo) =>{
  try{
    const res = await axios.post(todoApiUrl,todo);
    return res
  }catch(e:any){
    throw new Error(e.response.data.message)
  }
}

const getTodos = async () =>{
  try{
    const res = await axios.get(todoApiUrl);
    return res
  }catch(e:any){
    throw new Error(e.response.data.message)
  }
}



const todoApi = {
  createTodo,
  getTodos
}

export default todoApi