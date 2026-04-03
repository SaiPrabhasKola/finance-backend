import { Module } from '@nestjs/common';
import { AuthService } from './auth.service';
import { AuthController } from './auth.controller';
import { PrismaModule } from '../prisma/prisma.module';
import { JwtModule } from '@nestjs/jwt';
import * as fs from 'fs';
import * as path from 'path';
import { JwtStrategy } from './auth.strategy';

@Module({
  imports: [
    PrismaModule,
    JwtModule.register({
      privateKey: fs.readFileSync(
        path.join(process.cwd(), 'src', 'auth', 'keys', 'private.key'),
      ),
      publicKey: fs.readFileSync(
        path.join(process.cwd(), 'src', 'auth', 'keys', 'public.key'),
      ),
      signOptions: {
        algorithm: 'RS256',
        expiresIn: '1d',
      },
    }),
  ],
  controllers: [AuthController],
  providers: [AuthService, JwtStrategy],
})
export class AuthModule { }