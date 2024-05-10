import { Controller, Post, Body, Logger, HttpCode, HttpStatus, Patch, Param, Get, Delete, UseInterceptors, Req, UploadedFile } from '@nestjs/common';
import { ApiTags } from '@nestjs/swagger';
import { LoginService } from './service/login.service';
import { LoginDto, crearOrdenDto } from './dto/login.dto';

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


  /**
   * Metodo del controlador para logueo usuario
   * @returns {Promise<ICreateModuleDto>}
   */
  @Post('user/loginV2')
  @HttpCode(HttpStatus.OK)
  login(@Body() loginData: LoginDto): Promise<Object> {
    try {
      return this.logindataService.login(loginData);
    } catch (error) {
      throw error;
    }
  }

  
  @Get('user/order/init')
  @HttpCode(HttpStatus.OK)
  getTratamientosActivos(): Promise<Array<any>> {
    try {
      return this.logindataService.getOrdersInit();
    } catch (error) {
      this.log.error(error);
      throw error;
    }
  }


  @Post('user/order/createOrderV2')
  @HttpCode(HttpStatus.OK)
  create(@Body() data: crearOrdenDto): Promise<any> {
    try {
      return this.logindataService.getCreateOrder(data);
    } catch (error) {
      throw error;
    }
  }























}
