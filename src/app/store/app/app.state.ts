import { Todo } from '../../interfaces/todo';

export interface AppState {
  todos: ReadonlyArray<Todo>;
}
