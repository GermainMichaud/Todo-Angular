import { createAction, props } from '@ngrx/store';
import { Todo, TodoDone } from 'src/app/interfaces/todo';

export const getTodos = createAction('[Todo] Get Todos');
export const getTodosSuccess = createAction(
  '[ TODO ] Get success',
  props<{ todos: Todo[] }>()
);
export const getTodosFailure = createAction('[ TODO ] Get failure');
export const addTodo = createAction(
  '[ TODO ] Add',
  props<{
    todo_label: string;
    todo_is_done: TodoDone;
  }>()
);
export const addTodoSuccess = createAction(
  '[ TODO ] Add success',
  props<{
    todo: Todo;
  }>()
);
export const addTodoFailure = createAction('[ TODO ] Add failure');
export const updateTodo = createAction(
  '[ TODO ] Update',
  props<{
    todo_id: number;
    todo_label: string;
    todo_is_done: TodoDone;
  }>()
);
export const updateTodoSuccess = createAction(
  '[ TODO ] Update success',
  props<{
    todo: Todo;
  }>()
);
export const updateTodoFailure = createAction('[ TODO ] Update failure');
export const removeTodo = createAction(
  '[ TODO ] Remove',
  props<{ id: number }>()
);
export const removeTodoSuccess = createAction(
  '[ TODO ] Remove success',
  props<{ id: number }>()
);
export const removeTodoFailure = createAction('[ TODO ] Remove failure');
export const resetTodos = createAction('[ TODO ] Reset todos');
