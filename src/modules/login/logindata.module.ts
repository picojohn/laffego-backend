import {  Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ELogin } from './entities/login.entity';
import { LoginController } from './login.controller';
import { LoginService } from './service/login.service';
import { LoginRepository } from './repository/login.repository';
import { JwtModule } from '@nestjs/jwt';
import { HttpModule } from '@nestjs/axios';

@Module({
  imports: [
    TypeOrmModule.forFeature([ELogin]),
    JwtModule.register({
      secret:
        '87123798129347912739817283791827398127938712983JHQWSJHKJSDHUIAHDUIHQW',
      signOptions: { expiresIn: '5h' },
    }),
     HttpModule
   ],
  controllers: [LoginController],
  providers: [LoginService, LoginRepository],
})
export class LoginModule { }
