import { Controller, Get, Post, Body, Patch, Param, Delete,ValidationPipe, Req, UseGuards} from '@nestjs/common';
import { UsersService } from './users.service';
import { CreateUserDto } from './dto/create-user.dto';
import { RoleGuard } from 'src/auth/guard/role.guard';
import { Constants } from 'src/utils/constants';
import { ApiSecurity } from '@nestjs/swagger';


@Controller('users')
export class UsersController {
  constructor(private readonly usersService: UsersService) {}

  @Post('signup')
  create(@Body(ValidationPipe) createUserDto: CreateUserDto) {
    return this.usersService.create(createUserDto);
  }

 //swagger token security in method level 
   @ApiSecurity('JWT_auth')
  @Get('details')
  @UseGuards(new RoleGuard(Constants.ROLES.ADMIN_ROLE))  
  findAll(@Req() req) {
    console.log(req.user);  
    return this.usersService.findAll();
  }

  @ApiSecurity('JWT_auth')
  @Delete('/delete/:id')
  @UseGuards(new RoleGuard(Constants.ROLES.ADMIN_ROLE))  
  remove(@Param('id') id: string, @Req() req) {
    console.log(req.user);
    return this.usersService.remove(+id);
  }
}
