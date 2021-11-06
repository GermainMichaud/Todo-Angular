import { createFeatureSelector } from '@ngrx/store';
import { Todo } from 'src/app/interfaces/todo';

export const selectTodos = createFeatureSelector<ReadonlyArray<Todo>>('todos');
