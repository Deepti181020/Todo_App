import { Module } from "@nestjs/common";
import { PassportModule } from "@nestjs/passport";
import { LocalStrategy } from "src/Strategy/local.strategy";
import { UsersModule } from "src/users/users.module";
import { AuthController } from './auth.controller';
import { JwtModule } from "@nestjs/jwt";
import { ConfigModule, ConfigService } from "@nestjs/config";
import { JwtStrategy } from "src/Strategy/jwt.strategy";
import { GoogleStrategy } from "src/Strategy/google.strategy";
import { AuthService } from "./auth.service";

@Module({
    imports: [PassportModule, UsersModule, JwtModule.registerAsync({
        imports: [ConfigModule],
        inject: [ConfigService],
        useFactory: (ConfigService: ConfigService) => ({

            secret: ConfigService.get("JWT_KEY"),
            signOptions: {
                expiresIn: ConfigService.get<string>("JWT_EXPIRE") + "s" //56s 
            }

        }),
    })],
    controllers: [AuthController],
    providers: [LocalStrategy, JwtStrategy, GoogleStrategy,AuthService
    ],
    exports: [],

})
export class AuthModule { }