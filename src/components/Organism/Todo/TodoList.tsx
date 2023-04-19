import React, { useEffect, useState } from 'react'
import { useLocation, useNavigate } from 'react-router-dom'
import { ITodo } from 'src/interfaces/todo'
import todoApi from 'src/services/todo'
import styled from 'styled-components'

const TodoList = ()=> {
  const [todos,setTodos] = useState<Array<ITodo>>();
  const {getTodos,createTodo,updateTodo} = todoApi
  const [todo,setTodo] = useState<string>("");
  const [isUpdate,setIsUpdate] = useState<number>();
  const [editTodo,setEditTodo] = useState("");
  const [complate,setComplate] = useState(false);

  const fetchTodos = async() =>{
    try{
      const res = await getTodos();
      setTodos(res.data);
    }catch(e:any){
      alert(e);
      throw new Error(e);
    }
  }

  useEffect(()=>{
    fetchTodos()
  },[])


  const handleToggleComplete = (id: number) => {
    setTodos(prevTodos =>prevTodos && prevTodos.map(todo => {
      if (todo.id === id) {
        return {
          ...todo,
          isCompleted: !todo.isCompleted,
        };
      }
      return todo;
    }));
  }

  const handleTodoCreate = async ()=>{
    try{
        if(todo){
            const res = await createTodo({todo});
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

  const handleTodoUpdate = async(todoId:number)=>{
    try{
        let findUpdateTodo = todos?.filter(todo=>todo.id === todoId);
      
        if(findUpdateTodo){
          const findUpdateTodoInfo = findUpdateTodo.map(todo=>{
            todo.todo = editTodo;
            return todo
          })[0]
            const res = await updateTodo(findUpdateTodoInfo);
            if(res.status===200){
                setIsUpdate(0);
                const updateTodos = await getTodos();
                setTodos(updateTodos.data);
                alert("투두리스트가 수정되었습니다.");
            }
        }
    }catch(e:any){
      alert(e);
      throw new Error(e);
    }
  }

  const handleTodoDelete = ()=>{
    try{

    }catch(e:any){
      alert(e);
      throw new Error(e);
    }
  }

  return (
    <Container>
        <Title>투두 리스트</Title>
        <InputWrap>
          <Todoinput data-testid="new-todo-input" value={todo} onChange={(e)=>setTodo(e.target.value)} />
          <TodoBtn data-testid="new-todo-add-button" onClick={handleTodoCreate}>추가</TodoBtn>
        </InputWrap>

        {
          todos && todos.map(todo=>{
            return(
              <TodoWrap key={todo.id}>
                <label>
                  <TodoItemInput onChange={()=>handleToggleComplete(todo.id)} checked={todo.isCompleted} type="checkbox" />
                  {
                    isUpdate === todo.id ? 
                    <>
                    {/* edtiTodo 독립되게 교체해야함 */}
                    <TodoUpdateInput data-testid="modify-input"  value={editTodo} onChange={(e)=>setEditTodo(e.target.value)} />
                    <TodoBtn data-testid="submit-button" onClick={()=>handleTodoUpdate(todo.id)}>제출</TodoBtn>
                    <TodoBtn data-testid="cancel-button" onClick={()=>setIsUpdate(0)}>취소</TodoBtn>
                    </>
                    :
                    <>
                    <Content>{todo.todo}</Content>
                    <TodoBtn onClick={()=>{setIsUpdate(todo.id);setEditTodo(todo.todo)}}>수정</TodoBtn>
                    <TodoBtn>삭제</TodoBtn>
                    </>
                  }
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

const TodoUpdateInput = styled.input`
  width:300px;
  max-width:300px;
  overflow:hidden;
  text-overflow:ellipsis;
  white-space:nowrap;
  text-align:left;
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