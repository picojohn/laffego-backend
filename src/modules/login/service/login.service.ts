import { BadRequestException, Injectable, Logger } from '@nestjs/common';
import { LoginRepository } from '../repository/login.repository';
import { LoginDto, crearOrdenDto } from '../dto/login.dto';
import { compare, hash } from 'bcryptjs';
import { Exception } from 'src/exception/exception';
import { JwtService } from '@nestjs/jwt';
import { Querys } from '../resource/querys';
import { HttpService } from '@nestjs/axios';
import { IRoles } from 'src/modules/roles/interface/roles.interface';
import { KeyObject } from 'crypto';

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
  public roles: Array<IRoles> = []
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
      //  let result : any
      if (!loginData.email) {
        return { result: [], code: 422, message: "El campo email es obligatorio" }
      }
      if (!loginData.password) {
        return { result: [], code: 422, message: "El campo password es obligatorio" }
      }
      if (!loginData.push_id) {
        return { result: [], code: 422, message: "El campo push_id es obligatorio" }
      }
      // if (!loginData.device_type) { // si necesita validar tl tipo de dispositivo
      //   return { result: [], code: 422, message: "El campo device_type es obligatorio" }
      // }
      this.roles = await this.loginDataRepository.getRoles()

      this.log.debug(`LogindataService > Login`);
      const loginInfo = await this.loginDataRepository.login(loginData);
      if (!loginInfo || !(await compare(loginData.password, loginInfo.password))) {
        return { result: [], code: 422, "message": "Correo electrónico o la contraseña son incorrectos." }
      }

      const info = {
        iss: "tmsolutions",
        sub: "authland",
        token: loginInfo.email,
        username: loginInfo.name,
        id_usuario: loginInfo.id,
        groups: [
          "user"
        ]
      }

      //   const token = this.jwtService.sign(info, { algorithm: 'HS256' });

      const token = this.jwtService.sign(
        {
          iss: 'tmsolutions',
          sub: 'authland',
          token: loginInfo.email,
          username: loginInfo.name,
          id_usuario: loginInfo.id,
          groups: [
            "user"
          ]
        },
        {
          algorithm: 'HS256',
          // exp: expiresAt, // Si deseas establecer una fecha de expiración
        }
      );

      let user = {
        role_name: this.roles.find(i => i.id == loginInfo.role_id).name,
        notification: loginInfo.notification,
        country_code: '+57',
        address: loginInfo.address,
        role_id: loginInfo.role_id,
        phone: loginInfo.phone,
        name: loginInfo.name,
        id: loginInfo.id,
        terminos_aceptados: loginInfo.TERMINOS_ACEPTADOS == 0 ? false : true,
        email: loginInfo.email,
        country_id: loginInfo.country_id
      }

      return {
        result: { user, token }, "code": 200,
        "message": ""
      };

    } catch (error) {
      throw error;
    }
  }


  async getOrdersInit(): Promise<any> {
    try {
      this.log.debug(`Servicios Laffego > obtener todos ordenes iniciales`);
      return await this.loginDataRepository.getOrdersInit();
    } catch (error) {
      throw error;
    }
  }


  async getCreateOrder(createOrder : crearOrdenDto): Promise<any> {
    try {
      this.log.debug(`Servicios Laffego > obtener todos ordenes iniciales`);
      return await this.loginDataRepository.getCreateOrder(createOrder);
    } catch (error) {
      throw error;
    }
  }


































}
