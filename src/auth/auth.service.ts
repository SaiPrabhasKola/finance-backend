import { HttpStatus, Injectable, UnauthorizedException } from '@nestjs/common';
import { RegisterDto } from './dto/register.dto';
import { PrismaService } from 'src/prisma/prisma.service';
import { JwtService } from '@nestjs/jwt';
import * as bcrypt from 'bcrypt'
import { LoginDto } from './dto/login.dto';
import { STATUS_CODES } from 'http';
@Injectable()
export class AuthService {

  constructor(
    private prisma: PrismaService,
    private jwtService: JwtService
  ) { }

  async createUser(registerdto: RegisterDto) {
    try {
      const { email, password, role } = registerdto

      const hashedPassword = await bcrypt.hash(password, 10)
      console.log(hashedPassword)
      const user = await this.prisma.user.create({
        data: {
          email: email,
          password: hashedPassword,
          role: role
        }
      })

      return {
        message: 'user created successfully',
        user
      }
    } catch (error) {
      throw error
    }
  }

  async signIn(loginDto: LoginDto) {
    try {
      const { email, password } = loginDto

      if (!email || !password) {
        return {
          message: 'please enter the correct credentials'
        }
      }

      const user = await this.prisma.user.findUnique({
        where: {
          email: email
        }
      })

      if (!user) {
        return {
          message: 'user not found',
          StatusCode: 404
        }
      }
      console.log(user)

      const passwordCheck = await bcrypt.compare(password, user.password)
      if (!passwordCheck) {
        throw new UnauthorizedException('invalid creds')
      }

      const payload = {
        sub: user.id,
        role: user.role
      }

      return {
        access_token: this.jwtService.sign(payload)
      }
    } catch (error) {

    }
  }
}
