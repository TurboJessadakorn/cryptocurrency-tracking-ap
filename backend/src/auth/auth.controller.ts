import { Controller, Request, Post, Res } from '@nestjs/common';
import { Response } from 'express';
import { AuthService } from './auth.service';
@Controller('auth')
export class AuthController {
  constructor(private authService: AuthService) {}

  @Post('login')
  async login(@Request() req, @Res() res: Response) {
    const token = await this.authService.login(req.body.username, req.body.password);
    res.cookie('jwt', token.access_token, {
      httpOnly: true,
      secure: process.env.NODE_ENV === 'production', 
      sameSite: 'strict',
    });
    return res.send({ message: 'Login successful' });
  }

  @Post('logout')
  async logout(@Request() req, @Res() res: Response) {
    res.clearCookie('jwt');
    return res.send({ message: 'Logout successful' });
  }
}