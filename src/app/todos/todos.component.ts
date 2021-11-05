import { Component, OnDestroy, OnInit } from '@angular/core';
import { TodoService } from '../services/todo.service';

@Component({
  selector: 'app-todos',
  templateUrl: './todos.component.html',
  styleUrls: ['./todos.component.scss'],
})
export class TodosComponent implements OnInit, OnDestroy {
  constructor(public todoService: TodoService) {}

  ngOnInit(): void {
    this.todoService.getTodos();
  }

  ngOnDestroy(): void {
    this.todoService.unsubscribe();
  }
}
