import { Injectable, Logger } from '@nestjs/common';
import { Querys } from '../resource/querys';
import { Exception } from '../../../exception/exception';
import { RolesRepository } from '../repository/roles.repository';
import { IRoles } from '../interface/roles.interface';

/**
 * Servicio Tratamiento del sistema de oralhome
 * @author John Pico - desarrollo5@expertosip.com
 * @copyright ExpertosIp 2023
 */
@Injectable()
export class RolesService {
  /** Variable para mostrar logs */
  private readonly log: Logger;

  constructor(private readonly rolesRepository: RolesRepository) {
    this.log = new Logger(RolesService.name);
  }

  /**
   * Metodo del Servicio que obtiene todos los Tratamientos
   * @returns {Promise<Array<IRoles>>}
   */
  findAll(): Promise<Array<IRoles>> {
    try {
      this.log.debug(`TratamientoService > findAll`);
      return this.rolesRepository.findAll();
    } catch (error) {
      throw error;
    }
  }


}
