import { Controller, Get, Post, Body, Patch, Param, Delete } from '@nestjs/common';
import { AuthService } from './auth.service';
import { CreateAuthDto } from './dto/create-auth.dto';
import { UpdateAuthDto } from './dto/update-auth.dto';
import { PrismaClient } from '@prisma/client';
import { ApiTags } from '@nestjs/swagger';
import { LoginAuthDto } from './dto/login-auth-dto';

@ApiTags("Auth")
@Controller('auth')
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  model = new PrismaClient()
  

  @Post("/login")
  login(@Body() loginAuthDto: LoginAuthDto){
    return this.authService.login(loginAuthDto);
  }

  @Post("/signUp")
  signUp(@Body() createAuthDto: CreateAuthDto) {
    return this.authService.signUp(createAuthDto);
    
  }
}
