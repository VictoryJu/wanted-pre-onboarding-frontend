import React, { useEffect, useState } from 'react'
import { ITodo } from 'src/interfaces/todo'
import todoApi from 'src/services/todo'
import styled from 'styled-components'

const TodoList = ()=> {

  const [todos,setTodos] = useState<Array<ITodo>>();
  const {getTodos} = todoApi

  // const fetchTodos = async() =>{
  //   try{
  //     const res = await getTodos();
  //     setTodos(res.data);
  //   }catch(e:any){
  //     alert(e);
  //     throw new Error(e);
  //   }
  // }

  // useEffect(()=>{
  //   fetchTodos()
  // },[])

  const [datas,setDatas] = useState([{id:1,todo:"Dsa",isCompleted:false},{id:2,todo:"Dsaqw",isCompleted:true}])

  const handleToggleComplete = (id: number) => {
    
    setDatas(prevTodos =>prevTodos && prevTodos.map(todo => {
      if (todo.id === id) {
        return {
          ...todo,
          isCompleted: !todo.isCompleted
        };
      }
      return todo;
    }));
    
  }

  return (
    <Container>
        <Title>투두 리스트</Title>
        <InputWrap>
          <Todoinput/>
          <TodoBtn>추가</TodoBtn>
        </InputWrap>

        {/* {
          todos && todos.map(todo=>{
            return(
              <TotoWrap key={todo.id}>
                <label>
                  <input checked={todo.isCompleted} type="checkbox" />
                  <span>{todo.todo}</span>
                  <TodoBtn>수정</TodoBtn>
                  <TodoBtn>삭제</TodoBtn>
                </label>
              </TotoWrap>
            )
          })
        } */}
                {
          datas && datas.map(todo=>{
            return(
              <TodoWrap key={todo.id}>
                <label>
                  <TodoItemInput onChange={()=>handleToggleComplete(todo.id)} checked={todo.isCompleted} type="checkbox" />
                  <Content>{todo.todo}</Content>

                  <TodoBtn>수정</TodoBtn>
                  <TodoBtn>삭제</TodoBtn>
                </label>
              </TodoWrap>
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

const TodoItemInput = styled.input`
  width: 30px;
`

const Content = styled.div`
  display:inline-block;
  width:300px;
  max-width:300px;
  overflow:hidden;
  text-overflow:ellipsis;
  white-space:nowrap;
  text-align:left;
  cursor: pointer;
`

const TodoBtn = styled.button`
  margin-left:15px;
  padding: 10px 10px;
  cursor: pointer;
`

const Todoinput = styled.input`
  margin:0 auto;
  margin-top:15px;
  width:300px;
  height: 30px;
  outline:none;
`

const TodoWrap = styled.li`
  margin-bottom:10px;
`

export default TodoList