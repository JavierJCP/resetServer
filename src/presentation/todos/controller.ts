import type { Request, Response } from 'express';

interface Todo {
  id: number;
  text: string;
  completedAt: Date | null;
}

const todos: Todo[] = [
  { id: 1, text: 'Todo 1', completedAt: new Date() },
  { id: 2, text: 'Todo 2', completedAt: new Date() },
  { id: 3, text: 'Todo 3', completedAt: new Date() },
];

export class TodosController {
  //* DI
  // constructor() {}

  public getTodos = (req: Request, res: Response): Response => {
    return res.json(todos);
  };

  public getTodoById = (req: Request, res: Response): Response => {
    const id = +req.params.id;
    // return res.json({ id });
    if (isNaN(id)) return res.status(400).json({ message: 'Invalid id' });
    const todoIndex = todos.findIndex((item) => item.id === id);
    if (todoIndex === -1) {
      return res.status(404).json({ message: 'Todo not found' });
    } else {
      return res.json(todos[todoIndex]);
    }
  };

  public createTodo = (req: Request, res: Response): Response => {
    const body = req.body;
    const { text } = body;
    if (text === undefined)
      return res.status(400).json({ message: 'text is required' });
    const newTodo = {
      id: todos.length + 1,
      text,
      completedAt: null,
    };
    todos.push(newTodo);
    return res.status(201).json(newTodo);
  };

  public updateTodo = (req: Request, res: Response): Response => {
    const id = +req.params.id;
    if (isNaN(id)) return res.status(400).json({ message: 'Invalid id' });
    const todoIndex = todos.findIndex((item) => item.id === id);
    if (todoIndex === -1)
      return res.status(404).json({ message: 'Todo not found' });

    const { text, completedAt } = req.body;
    const todo = todos[todoIndex];
    todo.text = text ?? todo.text;
    completedAt === null
      ? (todo.completedAt = null)
      : (todo.completedAt = new Date(
          (completedAt as Date) ?? todo.completedAt
        ));

    return res.json(todo);
  };

  public deleteTodo = (req: Request, res: Response): Response => {
    const id = +req.params.id;
    if (isNaN(id)) return res.status(400).json({ message: 'Invalid id' });
    const todoIndex = todos.findIndex((item) => item.id === id);
    if (todoIndex === -1)
      return res.status(404).json({ message: 'Todo not found' });

    todos.splice(todoIndex, 1);
    // const todo = todos.find(item => item.id === id)
    // todos.plice(todos.indexOf(todo), 1)

    return res.status(204).json();
  };
}
