import { Component, Input, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Store } from '@ngrx/store';
import { Todo, TodoDone } from 'src/app/interfaces/todo';
import { removeTodo, updateTodo } from 'src/app/store/todo/todo.actions';

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

  constructor(private store: Store) {}

  ngOnInit(): void {
    this.updateTodoForm.patchValue({
      label: this.todo.todo_label,
    });
  }

  public updateTodo(value: boolean = false): void {
    let isDone: TodoDone = this.todo.todo_is_done;
    if (value) {
      isDone = Number(!this.todo?.todo_is_done);
    }
    if (!this.updateTodoForm.valid) return;
    this.store.dispatch(
      updateTodo({
        todo_id: this.todo.todo_id as number,
        todo_label: this.updateTodoForm.value.label,
        todo_is_done: isDone,
      })
    );
    this.isEditing = false;
  }

  public deleteTodo(): void {
    this.store.dispatch(removeTodo({ id: this.todo.todo_id as number }));
  }
}
