import { Injectable, UnauthorizedException } from "@nestjs/common";
import { PassportStrategy } from "@nestjs/passport";
import { Strategy } from "passport-local";
import { User } from "src/users/entities/user.entity";
import { UsersService } from "src/users/users.service";
import * as bcrypt from "bcrypt";

@Injectable()
export class LocalStrategy extends PassportStrategy(Strategy){

    constructor(private userService : UsersService){
        super({
            usernameField: "email",
            passwordField : "password"
        })
    }

    async validate(email: string , password: string) : Promise<User>{

        const user = await this.userService.findUserByEmail(email); 
        if(!user)
       
         throw new UnauthorizedException(`User Not Found ${email}`) ;
        
         //Compare your password with the hashPassword

        const isPasswordValid = await bcrypt.compare(password,user.password)
        if(!isPasswordValid){
            throw new UnauthorizedException("Invalid password");
        }

        return user;
    }
}