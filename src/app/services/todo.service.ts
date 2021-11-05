import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable, OnDestroy, OnInit } from '@angular/core';
import { BehaviorSubject, Observable, of, Subscription } from 'rxjs';
import { environment } from 'src/environments/environment';
import { Todo } from '../interfaces/todo';

@Injectable({
  providedIn: 'root',
})
export class TodoService {
  private API_URL = environment.API_URL + '/todo';
  public getTodosSub: Subscription = new Subscription();
  public addUpdateTodosSub: Subscription = new Subscription();
  public deleteTodosSub: Subscription = new Subscription();

  public todos$ = new BehaviorSubject<Todo[]>([
    {
      todo_id: 1,
      todo_label: 'Todo 1',
      todo_is_done: 0,
      todo_date: new Date(),
    },
  ]);

  constructor(private http: HttpClient) {}

  public unsubscribe(): void {
    this.todos$.next([]);
    if (this.getTodosSub) this.getTodosSub.unsubscribe();
    if (this.addUpdateTodosSub) this.addUpdateTodosSub.unsubscribe();
    if (this.deleteTodosSub) this.deleteTodosSub.unsubscribe();
  }

  public getTodos(): void {
    console.log('get todos');
    this.getTodosSub = this.http
      .get<Todo[]>(this.API_URL + '/list', {
        headers: this.setHeaders(),
      })
      .subscribe((todos) => {
        this.todos$.next(todos);
      });
  }

  public addUpdateTodo(todo: {
    todo_id?: number;
    todo_label: string;
    todo_is_done: number;
  }): void {
    this.addUpdateTodosSub = this.http
      .post<Todo>(this.API_URL, todo, {
        headers: this.setHeaders(),
      })
      .subscribe((t) => {
        if (todo.todo_id) {
          this.updateTodo(t);
        } else {
          this.todos$.next([...this.todos$.getValue(), t]);
        }
      });
  }

  public deleteTodo(id: number): void {
    this.deleteTodosSub = this.http
      .delete(this.API_URL + '/' + id, {
        headers: this.setHeaders(),
      })
      .subscribe(() => {
        this.todos$.next(
          this.todos$.getValue().filter((t) => t.todo_id !== id)
        );
      });
  }

  private updateTodo(todo: Todo): void {
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

  private setHeaders(): HttpHeaders {
    const token = localStorage.getItem('token');
    const userId = JSON.parse(localStorage.getItem('user') as string).id
    return new HttpHeaders({
      'Content-Type': 'application/json',
      'Authorization': 'Bearer ' + token,
      'user-id': userId.toString(),
    });
  }
}
