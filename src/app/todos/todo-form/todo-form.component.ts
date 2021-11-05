import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { TodoService } from 'src/app/services/todo.service';

@Component({
  selector: 'app-todo-form',
  templateUrl: './todo-form.component.html',
  styleUrls: ['./todo-form.component.scss'],
})
export class TodoFormComponent implements OnInit {
  public addTodoForm: FormGroup = new FormGroup({});

  constructor(private fb: FormBuilder, private todoService: TodoService) {}

  ngOnInit(): void {
    this.addTodoForm = this.fb.group({
      new_todo: ['', [Validators.required, Validators.minLength(3)]],
    });
  }

  public addTodo(event: Event): void {
    event.preventDefault();
    console.log(this.addTodoForm.value);
    this.todoService.addTodo(this.addTodoForm.value.new_todo);
    this.addTodoForm.reset();
  }
}
