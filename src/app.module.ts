import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { AuthModule } from './auth/auth.module';
import { PrismaModule } from './prisma/prisma.module';
import { ConfigModule } from '@nestjs/config';
import { RecordsModule } from './records/records.module';

@Module({
  imports: [ConfigModule.forRoot({
    isGlobal: true
  }), AuthModule, PrismaModule, RecordsModule],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule { }
