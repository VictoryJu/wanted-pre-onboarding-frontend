import React, { useEffect, useState } from 'react'
import CMButton from 'src/components/Atoms/CMButton';
import { ITodo } from 'src/interfaces/todo';
import todoApi from 'src/services/todo';
import styled from 'styled-components';

type Props = {
  originTodo:ITodo;
  setIsUpdate: React.Dispatch<React.SetStateAction<boolean>>;
  refetch: () => Promise<void>;
}

const UpdateItem = ({originTodo,setIsUpdate,refetch}:Props)=> {
  const [todo,setTodo] = useState(originTodo.todo);
  const [isComplete,setIsComplete] = useState(originTodo.isCompleted)
  
  const handleTodoCancle = ()=>{
    setIsUpdate(false);
    setTodo(originTodo.todo);
    setIsComplete(originTodo.isCompleted)
  }

  const handleTodoUpdate = async()=>{
    try{
        const updatedTodo = {
          ...originTodo,
          isCompleted: isComplete,
          todo: todo,
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
      <ItemInput onChange={()=>setIsComplete(prev=>!prev)} checked={isComplete} type="checkbox" />
      <UpdateInput data-testid="modify-input"  value={todo} onChange={(e)=>setTodo(e.target.value)} />
      <CMButton marginLeft='15px' padding='10px 10px' data-testid="submit-button" onClick={()=>{handleTodoUpdate();}}>제출</CMButton>
      <CMButton marginLeft='15px' padding='10px 10px' data-testid="cancel-button" onClick={handleTodoCancle}>취소</CMButton>
    </>
  )
}

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

export default UpdateItem