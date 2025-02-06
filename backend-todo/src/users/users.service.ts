import { Inject, Injectable } from '@nestjs/common';
import { CreateUserDto } from './dto/create-user.dto';
import { User } from './entities/user.entity';
import { Constants } from 'src/utils/constants';
import { Repository } from 'typeorm';
import *  as bcrypt from "bcrypt";

@Injectable()
export class UsersService {  

  //Import your custom repository
  constructor(
    @Inject('UserRepository') private readonly userRepository: Repository<User>,
  ) { }
  async create(createUserDto: CreateUserDto) {

    try {
      const user = new User();
      user.firstName = createUserDto.firstName;
      user.lastName = createUserDto.lastName;
      user.email = createUserDto.email;

      // Hash the password using bcrypt
      const saltRounds = 10;
      user.password = await bcrypt.hash(createUserDto.password, saltRounds);

      user.role = Constants.ROLES.NORMAL_ROLE;

      return await this.userRepository.save(user);
    } catch (error) {
      throw new Error(`Error creating user: ${error.message}`);
    }
  }

  //Get user by id 
   async findUserById(id: number) {
    try {
      return await this.userRepository.findOneOrFail({ where: { id : id } });
    } catch (error) {
      throw new Error(`User with ID ${id} not found.`);
    }
  }
  async findAll() {
    return  await this.userRepository.find();
  }

  async findUserByEmail(email: string) {
    return await this.userRepository.findOne({ where: { email: email } });
  }

  async remove(id: number) {
    try {
      return await this.userRepository.delete(id);
    } catch (error) {
      throw new Error(`Error deleting user: ${error.message}`);
    }
  }

}
