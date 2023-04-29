import React, { useCallback, useEffect, useState } from 'react'
import CMButton from 'src/components/Atoms/CMButton'
import TodoItem from 'src/components/Molecule/todo/TodoItem'
import { ITodo } from 'src/interfaces/todo'
import todoApi from 'src/services/todo'
import styled from 'styled-components'

const TodoList = ()=> {
  const [todos,setTodos] = useState<Array<ITodo>>();
  const {getTodos,createTodo} = todoApi
  const [todo,setTodo] = useState<string>("");

  const fetchTodos = useCallback(async ()=>{
    try{
      const res = await getTodos();
      setTodos(res.data);
    }catch(e:any){
      throw new Error(e);
    }
  },[setTodos]) 

  useEffect(()=>{
    fetchTodos()
  },[])


  const handleTodoCreate = async ()=>{
    try{
        if(todo){
            const res = await createTodo(todo);
            if(res.status === 201){
                const updateTodos = await getTodos();
                setTodos(updateTodos.data);
                setTodo('');
                alert('투두 리스트가 추가되었습니다.')
            }
        }
    }
    catch(e:any){
        alert(e);
        throw new Error(e);
    }
  }

  return (
    <Container>
        <Title>투두 리스트</Title>
        <InputWrap>
          <Todoinput data-testid="new-todo-input" value={todo} onChange={(e)=>setTodo(e.target.value)} />
          <CMButton marginLeft='15px' padding='10px 10px' data-testid="new-todo-add-button" onClick={handleTodoCreate}>추가</CMButton>
        </InputWrap>

        {
          todos && todos.map(todo=>{
            return(
              <TodoItem todo={todo} refetch={fetchTodos}/>
            )
          })
        }
    </Container>
  )
}

const Container = styled.div`
  width:100%;
  height:100%;
  width:1200px;
  margin:0 auto;
  text-align:center;
`

const Title = styled.div`
  margin-top:100px;
`

const InputWrap = styled.div`
  margin-bottom:10px;
`

const Todoinput = styled.input`
  margin:0 auto;
  margin-top:15px;
  width:300px;
  height: 30px;
  outline:none;
`


export default TodoList