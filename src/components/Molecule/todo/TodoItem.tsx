import React, { useEffect, useState } from 'react'
import CMButton from 'src/components/Atoms/CMButton';
import { ITodo } from 'src/interfaces/todo'
import {todo as todoApi} from 'src/services/api';
import styled from 'styled-components';
import UpdateItem from './UpdateItem';

type Props = {
  todo:ITodo;
  refetch: () => Promise<void>
}

const TodoItem = ({todo,refetch}:Props)=> {
  const [isUpdate,setIsUpdate] = useState<boolean>(false);
  const [isComplete,setIsComplete] = useState<boolean>(todo.isCompleted);

  useEffect(()=>{
    setIsComplete(todo.isCompleted)
  },[todo])

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

  return (
    <>
      <Wrap key={todo.id}>
        {
          isUpdate ?
          <UpdateItem originTodo={todo} setIsUpdate={setIsUpdate} refetch={refetch} />
          :
          <>
          <ItemInput onChange={()=>setIsComplete(prev=>!prev)} checked={isComplete} type="checkbox" />
          <Content>{todo.todo}</Content>
          <CMButton marginLeft='15px' padding='10px 10px' data-testid="modify-button" onClick={()=>{setIsUpdate(true);}}>수정</CMButton>
          <CMButton marginLeft='15px' padding='10px 10px' data-testid="delete-button" onClick={()=>handleTodoDelete(todo.id)}>삭제</CMButton>
          </>
        }
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


export default TodoItem