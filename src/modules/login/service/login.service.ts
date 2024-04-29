import { Injectable, Logger } from '@nestjs/common';
import { LoginRepository } from '../repository/login.repository';
import { LoginDto } from '../dto/login.dto';
import { compare, hash } from 'bcryptjs';
import { Exception } from 'src/exception/exception';
import { JwtService } from '@nestjs/jwt';
import { Querys } from '../resource/querys';
import { HttpService } from '@nestjs/axios';

@Injectable()

/**
 * Servicio de Login del sistema de oralHome
 * @author John Pico  - desarrollo5@expertosip.com
 * @copyright ExpertosIp 2023
 */
export class LoginService {
  /** Variable para mostrar logs */
  private readonly log: Logger;
  private url: string;
  constructor(
    private readonly loginDataRepository: LoginRepository,
    private readonly jwtService: JwtService,
    private http: HttpService
  ) {
    this.log = new Logger(LoginService.name);

  }

  /**
   * Metodo del servicio para hacer login en el sistema
   * @param {LoginDto} loginData
   * @returns {Promise<Object>}
   */
  async login(loginData: LoginDto): Promise<Object> {
    try {
      this.log.debug(`LogindataService > Login`);
      const loginInfo = await this.loginDataRepository.login(loginData);
      if (!loginInfo || !(await compare(loginData.password, loginInfo.password))) {
        throw new Exception(3001);
      }
      const token = this.jwtService.sign({ loginInfo });
      return { token };

    } catch (error) {
      throw error;
    }
  }




}
