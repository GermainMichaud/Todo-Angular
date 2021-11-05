import { Component, Input, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Todo } from 'src/app/interfaces/todo';
import { TodoService } from 'src/app/services/todo.service';

@Component({
  selector: 'app-todo-item',
  templateUrl: './todo-item.component.html',
  styleUrls: ['./todo-item.component.scss'],
})
export class TodoItemComponent implements OnInit {
  @Input()
  public todo: Todo = {
    todo_id: 0,
    todo_label: '',
    todo_is_done: 0,
    todo_date: new Date(),
  };

  public isEditing: boolean = false;
  public updateTodoForm: FormGroup = new FormGroup({
    label: new FormControl('', [Validators.required, Validators.minLength(3)]),
  });

  constructor(private todoService: TodoService) {}

  ngOnInit(): void {
    this.updateTodoForm.patchValue({
      label: this.todo.todo_label,
    });
  }

  public updateTodo(value: boolean = false): void {
    if (value) {
      this.todo.todo_is_done = Number(!this.todo?.todo_is_done);
    }
    if (!this.updateTodoForm.valid) return;
    this.todo.todo_label = this.updateTodoForm.value.label;
    this.todoService.updateTodo(this.todo);
    this.isEditing = false;
  }

  public deleteTodo(): void {
    this.todoService.deleteTodo(this.todo.todo_id as number);
  }
}
