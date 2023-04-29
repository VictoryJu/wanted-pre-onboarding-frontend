import React, { useState } from 'react'
import CMButton from 'src/components/Atoms/CMButton';
import { ITodo } from 'src/interfaces/todo'
import {todo as todoApi} from 'src/services/api';
import styled from 'styled-components';

const TodoItem = ({todo,refetch}:{todo:ITodo,refetch:() => Promise<void>})=> {
  const [isUpdate,setIsUpdate] = useState<boolean>(false);
  const [isComplete,setIsComplete] = useState<boolean>(todo.isCompleted);
  const [editTodo,setEditTodo] = useState(todo.todo);

  const handleTodoDelete = async (todoId:number)=>{
    try{
      const res = await todoApi.deleteTodo(todoId);
      if(res.status===204){
        alert("투두 리스트가 삭제되었습니다.");
        refetch();
      }
    }catch(e:any){
      alert(e);
      throw new Error(e);
    }
  } 

  const handleTodoCancle = ()=>{
    setIsUpdate(false);
    setEditTodo(todo.todo);
  }

  const handleTodoUpdate = async()=>{
    try{
        const updatedTodo = {
          ...todo,
          isCompleted: isComplete,
          todo: editTodo,
        };
        const res = await todoApi.updateTodo(updatedTodo);
        if(res.status===200){
            setIsUpdate(false);
            alert("투두리스트가 수정되었습니다.");
            refetch();
        }
    }catch(e:any){
      alert(e);
      throw new Error(e);
    }
  }

  return (
    <>
      <Wrap key={todo.id}>
        <label>
          <ItemInput onChange={()=>setIsComplete(prev=>!prev)} checked={isComplete} type="checkbox" />
          {
            isUpdate ?
            <>
            <UpdateInput data-testid="modify-input"  value={editTodo} onChange={(e)=>setEditTodo(e.target.value)} />
            <CMButton marginLeft='15px' padding='10px 10px' data-testid="submit-button" onClick={()=>{handleTodoUpdate();}}>제출</CMButton>
            <CMButton marginLeft='15px' padding='10px 10px' data-testid="cancel-button" onClick={handleTodoCancle}>취소</CMButton>
            </>
            :
            <>
            <Content>{todo.todo}</Content>
            <CMButton marginLeft='15px' padding='10px 10px' data-testid="modify-button" onClick={()=>{setIsUpdate(true);}}>수정</CMButton>
            <CMButton marginLeft='15px' padding='10px 10px' data-testid="delete-button" onClick={()=>handleTodoDelete(todo.id)}>삭제</CMButton>
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