import { Controller, Post, Body, Logger, HttpCode, HttpStatus, Patch, Param, Get, Delete, UseInterceptors, Req, UploadedFile, Query } from '@nestjs/common';
import { ApiTags } from '@nestjs/swagger';
import { LoginService } from './service/login.service';
import { LoginDto, UserLoginDto, crearOrdenDto } from './dto/login.dto';

/**
 * Controlador de login del sistema de oralHome
 * @author John Pico - desarrollo5@expertosip.com
 * @copyright ExpertosIp 2021
 */

@ApiTags('api Paths')
@Controller('api/v3')
export class LoginController {
  /** Variable para mostrar logs */
  private readonly log: Logger;
  constructor(private readonly logindataService: LoginService,
  ) {
    this.log = new Logger(LoginController.name);
  }


  // /**
  //  * Metodo del controlador para logueo usuario
  //  * @returns {Promise<ICreateModuleDto>}
  //  */
  // @Post('user/loginV2')
  // @HttpCode(HttpStatus.OK)
  // login(@Body() loginData: LoginDto): Promise<Object> {
  //   try {
  //     return this.logindataService.login(loginData);
  //   } catch (error) {
  //     throw error;
  //   }
  // }

  
  // @Get('user/order/init')
  // @HttpCode(HttpStatus.OK)
  // getTratamientosActivos(): Promise<Array<any>> {
  //   try {
  //     return this.logindataService.getOrdersInit();
  //   } catch (error) {
  //     this.log.error(error);
  //     throw error;
  //   }
  // }


  // @Post('user/order/createOrderV2')
  // @HttpCode(HttpStatus.OK)
  // create(@Body() data: crearOrdenDto): Promise<any> {
  //   try {
  //     return this.logindataService.getCreateOrder(data);
  //   } catch (error) {
  //     throw error;
  //   }
  // }


  // /**
  //  * Metodo del controlador para logueo usuario
  //  * @returns {Promise<ICreateModuleDto>}
  //  */
  // @Post('user/loginV2')
  // @HttpCode(HttpStatus.OK)
  // login(@Body() loginData: LoginDto): Promise<Object> {
  //   try {
  //     return this.logindataService.login(loginData);
  //   } catch (error) {
  //     throw error;
  //   }
  // }

  @Post('user/loginV2')
  async login(@Body() userLoginDto: UserLoginDto): Promise<any> {
    return this.logindataService.login(userLoginDto);
  }

  @Get('user/order/initV2')
  async obtenerTiposDeServicio(@Req() req): Promise<any> {
    const token = req.headers['authorization'].split(' ')[1];     
    return this.logindataService.obtenerTiposDeServicio(token);
  }

  @Post('/user/order/myOrderV2')
  async obtenerOrdenes(@Req() req): Promise<any> {
    const authorizationHeader = req.headers['authorization'];

    if (!authorizationHeader) {
      throw new Error('Encabezado de autorización no encontrado');
    }

    const token = authorizationHeader.split(' ')[1];
    const page = req.query.page || 1;

    return this.logindataService.obtenerOrdenes(token, page);
  }


  @Post('user/order/createOrderV2')
  async obtenerDetalleDeOrden(@Req() req, @Body() body): Promise<any> {
    const authorizationHeader = req.headers['authorization'];

    if (!authorizationHeader) {
      throw new Error('Encabezado de autorización no encontrado');
    }

    const token = authorizationHeader.split(' ')[1];
    const orderId = body.orderId;
    const orderDetails = {
      origin: body.origin,
      destination: body.destination,
      operation_type: body.operation_type,
      service_type: body.service_type,
      pickup_time: body.pickup_time,
      description: body.description,
      declared_value: body.declared_value,
      payment_mode: body.payment_mode,
      origin_details: body.origin_details,
      destination_details: body.destination_details,
      order_reference: body.order_reference,
      destination_phone: body.destination_phone,
    };

    return this.logindataService.obtenerDetalleDeOrden(token, orderId, orderDetails);
  }



  @Post('user/order/alistamientoFacturacionV2')
  async cambiarEstadoAlistamientoFacturacion(@Req() req, @Body() body): Promise<any> {
    const authorizationHeader = req.headers['authorization'];

    if (!authorizationHeader) {
      throw new Error('Encabezado de autorización no encontrado');
    }

    const token = authorizationHeader.split(' ')[1];
    const orderId = body.order_id;
    console.log(orderId, 'order id alista');   
 
    // y llama al servicio para cambiar el estado a alistamiento facturación
    return this.logindataService.cambiarEstadoAlistamientoFacturacion(token, orderId);
  }



  @Post('user/order/orderDetailsV2')
  async consultarDetalleOrden(@Req() req, @Body() body): Promise<any> {
    const authorizationHeader = req.headers['authorization'];

    if (!authorizationHeader) {
      throw new Error('Encabezado de autorización no encontrado');
    }

    const token = authorizationHeader.split(' ')[1];
    const orderId = body.order_id;
    console.log(orderId, 'order id alista');   
 
    // y llama al servicio para cambiar el estado a alistamiento facturación
    return this.logindataService.consultarDetalleOrden(token, orderId);
  }










}
