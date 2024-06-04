import { Injectable, UnauthorizedException } from '@nestjs/common';
import { UserService } from '../user/user.service';
import { JwtService } from '@nestjs/jwt';

@Injectable()
export class AuthService {
  constructor(
    private usersService: UserService,
    private jwtService: JwtService,
  ) {}
  
  async login(username: string, password: string) {
    // Validate the user's credentials
    const user = await this.usersService.validateUser(username, password);
    if (!user) {
      // If the user is not found or the password is incorrect, throw UnauthorizedException
      throw new UnauthorizedException('Invalid credentials');
    }
    
    // If the credentials are valid, generate and return the access token
    const payload = { username: user.username, sub: user.id };
    return {
      access_token: this.jwtService.sign(payload),
    };
  }
}
