import { Controller, Get, Post, Body, Patch, Param, Delete, ValidationPipe } from '@nestjs/common';
import { TodosService } from './todos.service';
import { CreateTodoDto } from './dto/create-todo.dto';
import { ApiSecurity } from '@nestjs/swagger';
 

@Controller('todos')
@ApiSecurity('JWT_auth')
export class TodosController {
  constructor(private readonly todosService: TodosService) {}

  @Post(":userId")
  create(@Body(ValidationPipe) createTodoDto: CreateTodoDto , @Param("userId") userId : number) {
    return this.todosService.create(createTodoDto,Number(userId));
  }

  @Get("/notCompleted/:userId")
  findAllTodoByUserIdNotCompleted( @Param("userId") userId : number) {
    return this.todosService.findAllTodoByUserNotCompleted(Number(userId));
  }

  @Get("/completed/:userId")
  findAllTodoByUserIdCompleted(@Param("userId") userId : number) {
    return this.todosService.findAllTodoByUserCompleted(Number(userId));
  }

  @Patch('/update/:id')
  update(@Param('id') id: number,) {
    return this.todosService.update(Number(id));
  }

  @Delete('/delete/:id')
  remove(@Param('id') id: number) {
    return this.todosService.remove(Number(id));
  }
}
