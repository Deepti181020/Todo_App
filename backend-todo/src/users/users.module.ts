import { Module } from '@nestjs/common';
import { UsersService } from './users.service';
import { UsersController } from './users.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { User } from './entities/user.entity';
import { DataSource } from 'typeorm';
import { UserRepository } from './user.repository';


@Module({
  imports: [TypeOrmModule.forFeature([User])],
  controllers: [UsersController],
  providers: [UsersService,
    {
      provide: 'UserRepository',
      useFactory: (dataSource: DataSource) => {
        return dataSource.getRepository(User).extend(UserRepository);
      },
      inject: [DataSource],
    }
  ],
  exports:[UsersService,'UserRepository']
})
export class UsersModule { }
