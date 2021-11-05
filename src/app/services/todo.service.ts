import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable, of } from 'rxjs';
import { Todo } from '../interfaces/todo';

@Injectable({
  providedIn: 'root',
})
export class TodoService {
  public todos$ = new BehaviorSubject<Todo[]>([
    {
      todo_id: 1,
      todo_label: 'Todo 1',
      todo_is_done: 0,
      todo_date: new Date(),
    },
  ]);

  constructor() {}

  public getTodos(): void {}

  public addTodo(todo: string): void {
    this.todos$.next([
      ...this.todos$.getValue(),
      {
        todo_id: new Date().getTime(),
        todo_label: todo,
        todo_is_done: 0,
        todo_date: new Date(),
      },
    ]);
  }

  public updateTodo(todo: Todo): void {
    this.todos$.next(
      this.todos$.getValue().map((t) => {
        if (t.todo_id === todo.todo_id) {
          t.todo_label = todo.todo_label;
          t.todo_is_done = todo.todo_is_done;
        }
        return t;
      })
    );
  }

  public deleteTodo(id: number): void {
    console.log('delete');
    console.log(this.todos$.getValue().filter((todo) => todo.todo_id !== id));
    this.todos$.next(
      this.todos$.getValue().filter((todo) => todo.todo_id !== id)
    );
  }
}
