import { Module } from '@nestjs/common';
import { TodosService } from './todos.service';
import { TodosController } from './todos.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Todo } from './entities/todo.entity';
import { DataSource } from 'typeorm';
import { TodoRepository } from './todo.repository';
import { UsersModule } from 'src/users/users.module';


@Module({
  imports:[TypeOrmModule.forFeature([Todo]),UsersModule],
  controllers: [TodosController],
  providers: [TodosService,
    {
      provide:'TodoRepository',
      useFactory: (dataSource: DataSource)=>{
        return dataSource.getRepository(Todo).extend(TodoRepository);
      },

      inject:[DataSource],
    }
  ],
})
export class TodosModule {}
