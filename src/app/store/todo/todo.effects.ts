import { Injectable } from '@angular/core';
import { createEffect, Actions, ofType } from '@ngrx/effects';
import { ObservableInput, of } from 'rxjs';
import { catchError, exhaustMap, map, mergeMap } from 'rxjs/operators';
import { TodoService } from 'src/app/services/todo.service';
import {
  addTodo,
  addTodoFailure,
  addTodoSuccess,
  getTodos,
  getTodosFailure,
  getTodosSuccess,
  updateTodo,
  updateTodoFailure,
  updateTodoSuccess,
  removeTodo,
  removeTodoSuccess,
  removeTodoFailure,
} from './todo.actions';

@Injectable()
export class TodoEffects {
  loadTodos$ = createEffect(() =>
    this.actions$.pipe(
      ofType(getTodos),
      mergeMap(() =>
        this.todoService.getTodos().pipe(
          map((todos) => getTodosSuccess({ todos })),
          catchError(() => of(getTodosFailure()))
        )
      )
    )
  );

  addTodo$ = createEffect(() =>
    this.actions$.pipe(
      ofType(addTodo),
      exhaustMap((value) =>
        this.todoService.addUpdateTodo(value).pipe(
          map((todo) => addTodoSuccess({ todo })),
          catchError(() => of(addTodoFailure()))
        )
      )
    )
  );

  updateTodo$ = createEffect(() =>
    this.actions$.pipe(
      ofType(updateTodo),
      exhaustMap((value) =>
        this.todoService.addUpdateTodo(value).pipe(
          map((todo) => updateTodoSuccess({ todo })),
          catchError(() => of(updateTodoFailure()))
        )
      )
    )
  );

  deleteTodo$ = createEffect(() =>
    this.actions$.pipe(
      ofType(removeTodo),
      exhaustMap((value) =>
        this.todoService.deleteTodo(value.id).pipe(
          map(() => removeTodoSuccess({ id: value.id })),
          catchError(() => of(removeTodoFailure()))
        )
      )
    )
  );

  constructor(private actions$: Actions, private todoService: TodoService) {}
}
