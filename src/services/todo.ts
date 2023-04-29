import axios from "axios";
import { ITodo} from "src/interfaces/todo";
import axiosInstance from "src/utils/fetch";

const todoApiUrl = "/todos"

const createTodo = async (todo:string) =>{
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

const updateTodo = async (todo:ITodo)=>{
    try{
        const res = await axiosInstance.put(`${todoApiUrl}/${todo.id}`,{todo:todo.todo,isCompleted:todo.isCompleted});
        return res
    }catch(e:any){
        throw new Error(e.response.data.message)
    }
}

const deleteTodo = async (todoId:number) =>{
  try{
    const res = await axiosInstance.delete(`${todoApiUrl}/${todoId}`);
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