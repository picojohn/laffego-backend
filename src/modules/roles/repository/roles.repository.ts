import { Repository } from 'typeorm';
import { InjectRepository } from '@nestjs/typeorm';
import { Logger } from '@nestjs/common';
import { Querys } from '../resource/querys';
import { ERoles } from '../entities/roles.entity';
import { IRoles } from '../interface/roles.interface';
/**
 * Repositorio de tratamiento del sistema de oralHome
 * @author John Pico- desarrollo5@expertosip.com
 * @copyright ExpertosIp 2023
 */

export class RolesRepository {
  /** Variable para mostrar logs */
  private readonly log: Logger;
  constructor(
    @InjectRepository(ERoles)
    public readonly dbInstanceModule: Repository<ERoles>,
 
  ) {
    this.log = new Logger(RolesRepository.name);
  }

  /**
   * Metodo del repositporio que obtiene todos los Tratamiento
   * @returns {Promise<Array<ITratamiento>>}
   */
  async findAll(): Promise<Array<IRoles>> {
    try {
      this.log.log('TratamientoRepository > Obteniendo todos los tratamientos');
      return await this.dbInstanceModule.find();
    } catch (error) {
      Logger.error(error);
      throw error;
    }
  }


 


}
