import React, { useState } from 'react'
import { ITodo } from 'src/interfaces/todo'
import {todo as todoApi} from 'src/services/api';
import styled from 'styled-components';

const TodoItem = ({todo}:{todo:ITodo})=> {
  const [isUpdate,setIsUpdate] = useState<boolean>(false);
  const [todoInfo,setTodoInfo] = useState(todo);
  const [editTodo,setEditTodo] = useState(todo.todo);

  const handleTodoDelete = async (todoId:number)=>{
    try{
      const res = await todoApi.deleteTodo(todoId);
      if(res.status===204){
        alert("투두 리스트가 삭제되었습니다.");
      }
    }catch(e:any){
      alert(e);
      throw new Error(e);
    }
  }

  const updateInput = (content:string)=>{
    setTodoInfo((todo)=>{
      let updateTodo = {...todo}
      updateTodo.todo = content
      return updateTodo
    });
  }

  const handleTodoCancle = ()=>{
    setIsUpdate(false);
    setEditTodo(todo.todo);
  }

  const handleTodoUpdate = async()=>{
    try{
        const res = await todoApi.updateTodo(todoInfo);
        if(res.status===200){
            setIsUpdate(false);
            alert("투두리스트가 수정되었습니다.");
        }
    }catch(e:any){
      alert(e);
      throw new Error(e);
    }
  }

  const handleToggleComplete = () => {
    setTodoInfo((todo)=>{
      let newTodo = {...todo};
      newTodo.isCompleted = !newTodo.isCompleted;
      console.log(newTodo)
      return newTodo
    });
  }

  return (
    <>
      <Wrap key={todo.id}>
        <label>
          <ItemInput onChange={()=>handleToggleComplete()} checked={todoInfo.isCompleted} type="checkbox" />
          {
            isUpdate ?
            <>
            <UpdateInput data-testid="modify-input"  value={editTodo} onChange={(e)=>updateInput(e.target.value)} />
            <Btn data-testid="submit-button" onClick={()=>handleTodoUpdate()}>제출</Btn>
            <Btn data-testid="cancel-button" onClick={handleTodoCancle}>취소</Btn>
            </>
            :
            <>
            <Content>{todoInfo.todo}</Content>
            <Btn data-testid="modify-button" onClick={()=>{setIsUpdate(true);}}>수정</Btn>
            <Btn data-testid="delete-button" onClick={()=>handleTodoDelete(todoInfo.id)}>삭제</Btn>
            </>
          }
        </label>
      </Wrap>
    </>
  )
}

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

const Wrap = styled.li`
  margin-bottom:10px;
`

const ItemInput = styled.input`
  width: 30px;
`

const Btn = styled.button`
  margin-left:15px;
  padding: 10px 10px;
  cursor: pointer;
`

const UpdateInput = styled.input`
  width:300px;
  max-width:300px;
  overflow:hidden;
  text-overflow:ellipsis;
  white-space:nowrap;
  text-align:left;
  cursor: pointer;
`

export default TodoItem