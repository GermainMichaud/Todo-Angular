import { Component, OnDestroy, OnInit } from '@angular/core';
import { Store } from '@ngrx/store';
import { AuthService } from '../services/auth.service';
import { TodoService } from '../services/todo.service';
import { getTodos, resetTodos } from '../store/todo/todo.actions';
import { selectTodos } from '../store/todo/todo.selectors';

@Component({
  selector: 'app-todos',
  templateUrl: './todos.component.html',
  styleUrls: ['./todos.component.scss'],
})
export class TodosComponent implements OnInit, OnDestroy {
  public username: string | undefined;
  public todos$ = this.store.select(selectTodos);

  constructor(
    public todoService: TodoService,
    private authService: AuthService,
    private store: Store
  ) {}

  ngOnInit(): void {
    this.store.dispatch(getTodos());
    this.username = JSON.parse(localStorage.getItem('user') as string).name;
  }

  ngOnDestroy(): void {
    this.store.dispatch(resetTodos());
  }

  public logout(): void {
    this.authService.logout();
  }
}
