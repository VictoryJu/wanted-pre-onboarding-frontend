export interface ITodo {
  id:number;
  todo:string;
  isCompleted:boolean;
  userId:number;
}

export interface IReqTodo {
    todo:string;
}

export interface IPutTodo {
    todo:string;
    isCompleted: boolean;
    todoId?:number;
}