import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Store } from '@ngrx/store';
import { addTodo } from 'src/app/store/todo/todo.actions';

@Component({
  selector: 'app-todo-form',
  templateUrl: './todo-form.component.html',
  styleUrls: ['./todo-form.component.scss'],
})
export class TodoFormComponent implements OnInit {
  public addTodoForm: FormGroup = new FormGroup({});

  constructor(private fb: FormBuilder, private store: Store) {}

  ngOnInit(): void {
    this.addTodoForm = this.fb.group({
      todo_label: ['', [Validators.required, Validators.minLength(3)]],
    });
  }

  public addTodo(event: Event): void {
    event.preventDefault();
    this.addTodoForm.addControl('todo_is_done', this.fb.control(0));
    this.store.dispatch(addTodo(this.addTodoForm.value));
    this.addTodoForm.reset();
  }
}
