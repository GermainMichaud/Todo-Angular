export interface Todo {
  todo_id: number | undefined;
  todo_user_id?: number | undefined;
  todo_label: string;
  todo_date: Date;
  todo_is_done: TodoDone;
}

export enum TodoDone {
  NO = 0,
  YES = 1,
}
