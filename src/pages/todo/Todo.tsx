import React,{useEffect} from 'react'
import { useNavigate } from 'react-router-dom';
import TodoTemplate from 'src/components/Template/todo/Todo'

const Todo = ()=> {
    const isLoggedIn = localStorage.getItem('token');
    console.log(isLoggedIn)
    const navigate = useNavigate()
    useEffect(()=>{
      if(!isLoggedIn) navigate('/signin')
    },[])
  return (
    <TodoTemplate/>
  )
}

export default Todo