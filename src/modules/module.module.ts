import { Module } from '@nestjs/common';
import { LoginModule } from './login/logindata.module';
import { RolesModule } from './roles/roles.module';


@Module({
  imports: [
   LoginModule,
   RolesModule
  ],
})
export class ModulesModule { }
