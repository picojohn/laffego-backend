import { Module } from '@nestjs/common';
import { LoginModule } from './login/logindata.module';


@Module({
  imports: [
   LoginModule
  ],
})
export class ModulesModule { }
