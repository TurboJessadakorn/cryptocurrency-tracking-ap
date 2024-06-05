import { Controller, Request, Post, Res } from '@nestjs/common';
import { Response } from 'express';
import { AuthService } from './auth.service';
@Controller('auth')
export class AuthController {
  constructor(private authService: AuthService) {}

  @Post('login')
  async login(@Request() req) {
    return await this.authService.login(req.body.username, req.body.password);
  }

  @Post('logout')
  async logout(@Request() req, @Res() res: Response) {
    res.clearCookie('jwt');
    return res.send({ message: 'Logout successful' });
  }
}