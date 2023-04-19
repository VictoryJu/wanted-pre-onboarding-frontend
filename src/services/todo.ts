import axios from "axios";
import { IPutTodo, IReqTodo } from "src/interfaces/todo";

const todoApiUrl = "https://www.pre-onboarding-selection-task.shop/todos"
const token = localStorage.getItem('token');
const createTodo = async (todo:IReqTodo) =>{
  try{
    const res = await axios.post(todoApiUrl,todo,{
        headers:{"Authorization":`Bearer ${token}`}
    });
    return res
  }catch(e:any){
    throw new Error(e.response.data.message)
  }
}

const getTodos = async () =>{
  try{
    const res = await axios.get(todoApiUrl,{
        headers:{"Authorization":`Bearer ${token}`}
    });
    return res
  }catch(e:any){
    throw new Error(e.response.data.message)
  }
}

const updateTodo = async (updateTodo:IPutTodo)=>{
    try{
        const res = await axios.put(`${todoApiUrl}/${updateTodo.id}`,{todo:updateTodo.todo,isCompleted:updateTodo.isCompleted},{
          headers:{"Authorization":`Bearer ${token}`}}
          );
        return res
    }catch(e:any){
        throw new Error(e.response.data.message)
    }
}

const deleteTodo = async (todoId:number) =>{
  try{
    const res = await axios.delete(`${todoApi}/${todoId}`,{
      headers:{"Authorization":`Bearer ${token}`}}
      );
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