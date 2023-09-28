import { Injectable } from '@nestjs/common';
import { CreateTodoDTO } from './dto/create-todo.dto';

interface Todo {
  readonly id: number;
  readonly title: string;
  readonly description: string;
  readonly isDone: boolean;
}

@Injectable()
export class TodoService {
  private todos: Todo[] = [
    {
      id: 1,
      title: 'Test',
      description: 'This is a test Tod',
      isDone: true,
    },
  ];

  async addTodo(createTodoDTO: CreateTodoDTO): Promise<Todo> {
    this.todos.push(createTodoDTO);

    return this.todos.at(-1);
  }

  async getTodo(todoID: number): Promise<Todo> {
    const post = this.todos.find((todo) => todo.id === todoID);
    return post;
  }

  async getTodos(): Promise<Todo[]> {
    return this.todos;
  }

  async editTodo(postID: number, createTodoDTO: CreateTodoDTO): Promise<Todo> {
    await this.deleteTodo(postID);
    this.todos.push(createTodoDTO);

    return this.todos.at(-1);
  }

  async deleteTodo(todoID: number): Promise<any> {
    const todoIndex = this.todos.findIndex((todo) => todo.id === todoID);
    return this.todos.splice(todoIndex, 1);
  }
}
