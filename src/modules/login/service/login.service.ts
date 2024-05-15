import { BadRequestException, Injectable, Logger } from '@nestjs/common';
import { LoginRepository } from '../repository/login.repository';
import { LoginDto, UserLoginDto, crearOrdenDto } from '../dto/login.dto';
import { compare, hash } from 'bcryptjs';
import { Exception } from 'src/exception/exception';
import { JwtService } from '@nestjs/jwt';
import { Querys } from '../resource/querys';
import { HttpService } from '@nestjs/axios';
import { IRoles } from 'src/modules/roles/interface/roles.interface';
import { KeyObject } from 'crypto';
import { firstValueFrom } from 'rxjs';

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
    private readonly httpService: HttpService
  ) {
    this.log = new Logger(LoginService.name);

  }

  // /**
  //  * Metodo del servicio para hacer login en el sistema
  //  * @param {LoginDto} loginData
  //  * @returns {Promise<Object>}
  //  */
  // async login(loginData: LoginDto): Promise<Object> {
  //   try {
  //     //  let result : any
  //     if (!loginData.email) {
  //       return { result: [], code: 422, message: "El campo email es obligatorio" }
  //     }
  //     if (!loginData.password) {
  //       return { result: [], code: 422, message: "El campo password es obligatorio" }
  //     }
  //     if (!loginData.push_id) {
  //       return { result: [], code: 422, message: "El campo push_id es obligatorio" }
  //     }
  //     // if (!loginData.device_type) { // si necesita validar tl tipo de dispositivo
  //     //   return { result: [], code: 422, message: "El campo device_type es obligatorio" }
  //     // }
  //     this.roles = await this.loginDataRepository.getRoles()

  //     this.log.debug(`LogindataService > Login`);
  //     const loginInfo = await this.loginDataRepository.login(loginData);
  //     if (!loginInfo || !(await compare(loginData.password, loginInfo.password))) {
  //       return { result: [], code: 422, "message": "Correo electrónico o la contraseña son incorrectos." }
  //     }

  //     const info = {
  //       iss: "tmsolutions",
  //       sub: "authland",
  //       token: loginInfo.email,
  //       username: loginInfo.name,
  //       id_usuario: loginInfo.id,
  //       groups: [
  //         "user"
  //       ]
  //     }

  //     //   const token = this.jwtService.sign(info, { algorithm: 'HS256' });

  //     const token = this.jwtService.sign(
  //       {
  //         iss: 'tmsolutions',
  //         sub: 'authland',
  //         token: loginInfo.email,
  //         username: loginInfo.name,
  //         id_usuario: loginInfo.id,
  //         groups: [
  //           "user"
  //         ]
  //       },
  //       {
  //         algorithm: 'HS256',
  //         // exp: expiresAt, // Si deseas establecer una fecha de expiración
  //       }
  //     );

  //     let user = {
  //       role_name: this.roles.find(i => i.id == loginInfo.role_id).name,
  //       notification: loginInfo.notification,
  //       country_code: '+57',
  //       address: loginInfo.address,
  //       role_id: loginInfo.role_id,
  //       phone: loginInfo.phone,
  //       name: loginInfo.name,
  //       id: loginInfo.id,
  //       terminos_aceptados: loginInfo.TERMINOS_ACEPTADOS == 0 ? false : true,
  //       email: loginInfo.email,
  //       country_id: loginInfo.country_id
  //     }

  //     return {
  //       result: { user, token }, "code": 200,
  //       "message": ""
  //     };

  //   } catch (error) {
  //     throw error;
  //   }
  // }


  // async getOrdersInit(): Promise<any> {
  //   try {
  //     this.log.debug(`Servicios Laffego > obtener todos ordenes iniciales`);
  //     return await this.loginDataRepository.getOrdersInit();
  //   } catch (error) {
  //     throw error;
  //   }
  // }


  // async getCreateOrder(createOrder : crearOrdenDto): Promise<any> {
  //   try {
  //     this.log.debug(`Servicios Laffego > obtener todos ordenes iniciales`);
  //     return await this.loginDataRepository.getCreateOrder(createOrder);
  //   } catch (error) {
  //     throw error;
  //   }
  // }


  // nuevos endpoints


  async login(userLoginDto: UserLoginDto): Promise<any> {
    this.log.debug(`LogindataService > Login`);
    const url = 'https://appv2.laffego.com/api/v3/user/loginV1';
    const config = {
      headers: {
        'APIKEY': 'LEFFEGO2020',
      },
    };

    try {
      const response = await firstValueFrom (this.httpService.post(url, userLoginDto, config));
      return response.data;
    } catch (error) {
      console.log(error.response?.data, 'error cosulta');
      return error.response?.data || { message: 'Error al iniciar sesion' };
    }
  }



  async obtenerTiposDeServicio(token: string): Promise<any> {
    this.log.debug(`Servicios Laffego > obtener tipos de orde ordenes`);
    const url = 'https://appv2.laffego.com/api/v3/user/order/init';
    const config = {
      headers: {
        'APIKEY': 'LEFFEGO2020',
        'Authorization': `Bearer ${token}`,
      },
    };

    try {
      const response = await firstValueFrom (this.httpService.get(url, config));
      return response.data;
    } catch (error) {
      console.log(error.response?.data, 'error cosulta');
      return error.response?.data || { message: 'Error obtener tipos de servicios' };
    }
  }

  async obtenerOrdenes(token: string, page: number): Promise<any> {
    this.log.debug(`Servicios Laffego > obtener todos ordenes iniciales`);
    const url = `https://appv2.laffego.com/api/v3/user/order/myOrder?page=${page}`;
    const config = {
      headers: {
        'APIKEY': 'LEFFEGO2020',
        'Authorization': `Bearer ${token}`,
      },
    };

    try {
      const response = await firstValueFrom (this.httpService.get(url, config))
      return response.data;
    } catch (error) {
      console.log(error.response?.data, 'error cosulta');
      return error.response?.data || { message: 'Error al obtener las ordenes' };
    }
  }



  
  async obtenerDetalleDeOrden(token: string, orderId: string, orderDetails: any): Promise<any> {
    this.log.debug(`Servicios Laffego > obtener detalle orden`);
    const url = 'https://appv2.laffego.com/api/v3/user/order/createOrder';
    const config = {
      headers: {
        'APIKEY': 'LEFFEGO2020',
        'Authorization': `Bearer ${token}`,
      },
    };

    // Crear un nuevo objeto FormData
    const formData = new FormData();
    // Agregar cada campo requerido al FormData
    formData.append('orderId', orderId);
    formData.append('origin', orderDetails.origin);
    formData.append('destination', orderDetails.destination);
    formData.append('operation_type', orderDetails.operation_type); // Siempre se envía como número 8 según la especificación
    formData.append('service_type', orderDetails.service_type.toString()); // Convertir a string si es un número
    formData.append('pickup_time', orderDetails.pickup_time);
    formData.append('pay_recipient', '0'); // Siempre se envía como 0 según la especificación
    formData.append('description', orderDetails.description);
    formData.append('declared_value', orderDetails.declared_value.toString()); // Convertir a string si es un número
    formData.append('payment_mode', orderDetails.payment_mode.toString()); // Convertir a string si es un número
    formData.append('origin_details', orderDetails.origin_details);
    formData.append('destination_details', orderDetails.destination_details);
    formData.append('order_reference', orderDetails.order_reference);
    formData.append('destination_phone', orderDetails.destination_phone);

    try {
      const response = await firstValueFrom(this.httpService.post(url, formData, config));
      return response.data;
    } catch (error) {
      console.log(error.response?.data, 'error cosulta');
      return error.response?.data || { message: 'Error al obtener detalle de orden' };
    }
  }


  async cambiarEstadoAlistamientoFacturacion(token: string, orderId: string): Promise<any> {
    this.log.debug(`Servicios Laffego > cambiar estado alistamiento de facturacion`);
    const url = 'https://appv2.laffego.com/api/v3/user/order/alistamientoFacturacion';
    const config = {
      headers: {
        'APIKEY': 'LEFFEGO2020',
        'Authorization': `Bearer ${token}`,
      },
    };
    const formData = new FormData();
    // Agregar cada campo requerido al FormData
    formData.append('order_id', orderId);
    
    try {
      const response = await firstValueFrom( this.httpService.post(url, formData, config));
      return response.data;
    } catch (error) {
      console.log(error.response?.data, 'error cosulta');
      return error.response?.data || { message: 'Error cambiar estado alistamiento facturacion' };
    }
  }


  async consultarDetalleOrden(token: string, orderId: string): Promise<any> {
    this.log.debug(`Servicios Laffego > consultar detalle de una orden`);
    const url = 'https://appv2.laffego.com/api/v3/user/order/orderDetails';
    const config = {
      headers: {
        'APIKEY': 'LEFFEGO2020',
        'Authorization': `Bearer ${token}`,
      },
    };
    const formData = new FormData();
    // Agregar cada campo requerido al FormData
    formData.append('order_id', orderId);
    
    try {
      const response = await firstValueFrom( this.httpService.post(url, formData, config));
      return response.data;
    } catch (error) {
      console.log(error.response?.data, 'error cosulta');
      return error.response?.data || { message: 'Error cambiar estado alistamiento facturacion' };
    }
  }



















}
