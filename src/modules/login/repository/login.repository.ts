import { Repository } from 'typeorm';
import { InjectRepository } from '@nestjs/typeorm';
import { Logger } from '@nestjs/common';
import { ILogin } from '../interface/login.interface';
import { ELogin } from '../entities/login.entity';
import { LoginDto } from '../dto/login.dto';

/**
 * Repositorio de Login del sistema de secsel
 * @author John Pico- desarrollo5@expertosip.com
 * @copyright ExpertosIp 2024
 */

export class LoginRepository {
  /** Variable para mostrar logs */
  private readonly log: Logger;
  constructor(
    @InjectRepository(ELogin)
    public readonly dbInstanceAllData: Repository<ELogin>,
  ) {
    this.log = new Logger(LoginRepository.name);
  }

  /**
   * Metodo del repositorio para hacer login
   * @param {LoginDto} login
   * @returns {Promise<ILogin>}
   */
  public async login(login: LoginDto): Promise<ILogin> {
    try {
      this.log.log(`LoginDataRepository > Haciendo Login`);
      return this.dbInstanceAllData.findOne({
        where: { email: login.email },
      });
    } catch (error) {
      Logger.error(error);
      throw error;
    }
  }

  
}
