import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ERoles } from './entities/roles.entity';
import { RolesController } from './roles.controller';
import { RolesService } from './service/roles.service';
import { RolesRepository } from './repository/roles.repository';

@Module({
  imports: [TypeOrmModule.forFeature([ERoles])],
  controllers: [RolesController],
  providers: [RolesService, RolesRepository],
})
export class RolesModule {}
