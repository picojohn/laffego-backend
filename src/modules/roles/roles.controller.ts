import { Controller, Get, Post, Body, Patch, Param, Delete, HttpCode, HttpStatus, Logger, UseGuards, } from '@nestjs/common';
import { ApiTags } from '@nestjs/swagger';
import { AuthGuard } from 'src/auth.guard';
import { RolesService } from './service/roles.service';
import { IRoles } from './interface/roles.interface';

@ApiTags('Roles Paths')
//@UseGuards(AuthGuard)
@Controller('roles')
export class RolesController {
  /** Variable para mostrar logs */
  private readonly log: Logger;
  constructor(private readonly rolesService: RolesService) {
    this.log = new Logger(RolesController.name);
  }


  /**
   * Metodo del controlador que obtiene todos los tratamientos
   * @returns {Promise<Array<ITratamiento>>}
   */
  @Get()
  @HttpCode(HttpStatus.OK)
  findAll(): Promise<Array<IRoles>> {
    try {
      return this.rolesService.findAll();
    } catch (error) {
      this.log.error(error);
      throw error;
    }
  }



}
