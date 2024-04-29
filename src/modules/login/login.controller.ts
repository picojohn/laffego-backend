import { Controller, Post, Body, Logger, HttpCode, HttpStatus, Patch, Param, Get, Delete, UseInterceptors, Req, UploadedFile } from '@nestjs/common';
import { ApiTags } from '@nestjs/swagger';
import { LoginService } from './service/login.service';
import { LoginDto } from './dto/login.dto';

/**
 * Controlador de login del sistema de oralHome
 * @author John Pico - desarrollo5@expertosip.com
 * @copyright ExpertosIp 2021
 */

@ApiTags('Login Paths')
@Controller('login')
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
  @Post('login')
  @HttpCode(HttpStatus.OK)
  login(@Body() loginData: LoginDto): Promise<Object> {
    try {
      return this.logindataService.login(loginData);
    } catch (error) {
      throw error;
    }
  }



}
