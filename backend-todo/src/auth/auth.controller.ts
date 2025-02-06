import { Body, Controller, Get, Post, Req, UnauthorizedException, UseGuards } from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';
import { AuthService } from './auth.service';
import { LoginDto } from './dto/login.dto';
import { GoogleGuard } from './guard/google.guard';
import { User } from 'src/users/entities/user.entity';

@Controller('auth')
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  @Post('/login')
  @UseGuards(AuthGuard('local'))
  async login(@Req() req, @Body() loginDto: LoginDto) {
    const user: User = req.user;
    console.log('Authenticated User:', user);

    return { token: this.authService.generateJwt(user) };
  }

  // Redirect user to Google login page
  @Get('google/login')
  @UseGuards(GoogleGuard)
  handleLogin() {
    return { message: "Redirect to Google login..." };
  }

  // Handle Google callback and generate jwt-token properly
  @Get('google/callback')
  @UseGuards(GoogleGuard)
  async handleRedirect(@Req() req) {
    if (!req.user) {
      throw new UnauthorizedException();
    }

    const user = req.user;
    console.log("Google Authenticated User:", user);

    return {
      message: "Google authentication successful",
      token: this.authService.generateJwt(user),
    };
  }
}
