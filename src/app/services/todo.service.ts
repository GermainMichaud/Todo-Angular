import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';
import { Todo } from '../interfaces/todo';

@Injectable({
  providedIn: 'root',
})
export class TodoService {
  private API_URL = environment.API_URL + '/todo';

  constructor(private http: HttpClient) {}

  public getTodos(): Observable<Todo[]> {
    return this.http.get<Todo[]>(this.API_URL + '/list', {
      headers: this.setHeaders(),
    });
  }

  public addUpdateTodo(todo: {
    todo_id?: number;
    todo_label: string;
    todo_is_done: number;
  }) {
    return this.http.post<Todo>(this.API_URL, todo, {
      headers: this.setHeaders(),
    });
  }

  public deleteTodo(id: number) {
    return this.http.delete(this.API_URL + '/' + id, {
      headers: this.setHeaders(),
    });
  }

  private setHeaders(): HttpHeaders {
    const token = localStorage.getItem('token');
    const userId = JSON.parse(localStorage.getItem('user') as string).id;
    return new HttpHeaders({
      'Content-Type': 'application/json',
      Authorization: 'Bearer ' + token,
      'user-id': userId.toString(),
    });
  }
}
