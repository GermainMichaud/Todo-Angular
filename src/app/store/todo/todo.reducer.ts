import { createReducer, on } from '@ngrx/store';
import { Todo } from 'src/app/interfaces/todo';
import {
  getTodosSuccess,
  addTodoSuccess,
  updateTodoSuccess,
  removeTodoSuccess,
  resetTodos,
} from './todo.actions';

export const initialState: Todo[] = [];

export const todoReducer = createReducer(
  initialState,
  on(getTodosSuccess, (state, { todos }) => todos),
  on(addTodoSuccess, (state, { todo }) => {
    return [...state, todo];
  }),
  on(updateTodoSuccess, (state, { todo }) => {
    console.log('reducer update todo');
    return state.map((t) => {
      if (t.todo_id === todo.todo_id) {
        return todo;
      }
      return t;
    });
  }),
  on(removeTodoSuccess, (state, { id }) => {
    return state.filter((t) => t.todo_id !== id);
  }),
  on(resetTodos, (state) => initialState)
);
