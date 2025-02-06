import { Inject, Injectable } from '@nestjs/common';
import { CreateTodoDto } from './dto/create-todo.dto';
import { Repository } from 'typeorm';
import { Todo } from './entities/todo.entity';
import { UsersService } from 'src/users/users.service';


@Injectable()
export class TodosService {

  //import custom repository of the Todo

  constructor(
    @Inject('TodoRepository')
    private readonly todoRepository: Repository<Todo>,
    private userService: UsersService

  ) { }

  async create(createTodoDto: CreateTodoDto, userId: number) {
    let todo: Todo = new Todo();
    todo.title = createTodoDto.title;
    todo.date = new Date().toLocaleString();
    todo.Completed = false;
    todo.user = await this.userService.findUserById(userId);

    return this.todoRepository.save(todo);
  }

  findAllTodoByUserNotCompleted(userId: number) {
    return this.todoRepository.find({ relations: ['user'], where: { user: { id: userId }, Completed: false } });
  }

  
  findAllTodoByUserCompleted(userId: number) {
    return this.todoRepository.find({ relations: ['user'], where: { user: { id: userId }, Completed: true } });
  }



  update(todoId: number) {
    return this.todoRepository.update(todoId, {Completed:true});
  }

  remove(todoId: number) {
    return this.todoRepository.delete(todoId);
  }
}
