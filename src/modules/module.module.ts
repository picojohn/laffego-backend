import { Module } from '@nestjs/common';
import { LoginModule } from './login/logindata.module';
import { RolesModule } from './roles/roles.module';


@Module({
  imports: [
   LoginModule,

  ],
})
export class ModulesModule { }
