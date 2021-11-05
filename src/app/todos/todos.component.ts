import { Component, OnDestroy, OnInit } from '@angular/core';
import { AuthService } from '../services/auth.service';
import { TodoService } from '../services/todo.service';

@Component({
  selector: 'app-todos',
  templateUrl: './todos.component.html',
  styleUrls: ['./todos.component.scss'],
})
export class TodosComponent implements OnInit, OnDestroy {

  public username: string | undefined;

  constructor(public todoService: TodoService, private authService: AuthService) {}

  ngOnInit(): void {
    this.todoService.getTodos();
    this.username = JSON.parse(localStorage.getItem('user') as string).name;
  }

  ngOnDestroy(): void {
    this.todoService.unsubscribe();
  }

  public logout(): void {
    this.authService.logout();
  }

}
