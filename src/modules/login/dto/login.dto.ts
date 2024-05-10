import { IsString, IsNotEmpty, IsOptional, IsInt, IsNumber, IsDate, } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';

/**
 * Dto para el Objeto Login de laffego
 * @author John Pico - desarrollo5@expertosip.com
 * @copyright ExpertosIp 2023 
 */

/* DTO para la creacion de un Login */
export class LoginDto {
  @ApiProperty()
  @IsInt()
  @IsOptional()
  public id: number;

  @ApiProperty()
  @IsInt()
  @IsOptional()
  public role_id: number;

  @ApiProperty()
  @IsString()
  @IsOptional()
  public name: string;

  @ApiProperty()
  @IsString()
  @IsOptional()
  public email: string;

  @ApiProperty()
  @IsString()
  @IsOptional()
  public avatar: string;

  @ApiProperty()
  @IsString()
  @IsOptional()
  public facebool_id: string;

  @ApiProperty()
  @IsString()
  @IsOptional()
  public google_id: string;

  @ApiProperty()
  @IsString()
  @IsOptional()
  public apple_id: string;

  @ApiProperty()
  @IsInt()
  @IsOptional()
  public country_id: number;

  @ApiProperty()
  @IsString()
  @IsOptional()
  public phone: string;

  @ApiProperty()
  @IsString()
  @IsOptional()
  public address: string;

  @ApiProperty()
  @IsString()
  @IsOptional()
  public password: string;

  @ApiProperty()
  @IsInt()
  @IsOptional()
  public status: number;

  @ApiProperty()
  @IsString()
  @IsOptional()
  public remember_token: string;

  @ApiProperty()
  @IsInt()
  @IsOptional()
  public is_admin: number;

  @ApiProperty()
  @IsInt()
  @IsOptional()
  public notification: number;

  @ApiProperty()
  @IsInt()
  @IsOptional()
  public otp: number;

  @ApiProperty()
  @IsString()
  @IsOptional()
  public push_id: string;

  @ApiProperty()
  @IsInt()
  @IsOptional()
  public device_type: number;

  @ApiProperty()
  @IsDate()
  @IsOptional()
  public created_at: Date;

  @ApiProperty()
  @IsDate()
  @IsOptional()
  public updated_at: Date;

  @ApiProperty()
  @IsInt()
  @IsOptional()
  public ADMIN: number;

  @ApiProperty()
  @IsInt()
  @IsOptional()
  public COMPANY_ID: number;

  @ApiProperty()
  @IsInt()
  @IsOptional()
  public FILTRAR_SEDE: number;

  @ApiProperty()
  @IsString()
  @IsOptional()
  public ORDER_SOURCES_ALLOWED: string;
  
  @ApiProperty()
  @IsInt()
  @IsOptional()
  public TERMINOS_ACEPTADOS: number;

  @ApiProperty()
  @IsInt()
  @IsOptional()
  public sede_id: number;

  @ApiProperty()
  @IsInt()
  @IsOptional()
  public PERMITIR_CREDITO: number;
  
}


export class crearOrdenDto   {
  
  @ApiProperty()
  @IsString()
  @IsOptional()
  public origin: string;
  
  @ApiProperty()
  @IsString()
  @IsOptional()
  public destination: string;
  
  @ApiProperty()
  @IsString()
  @IsOptional()
  public operation_type: string;
  
  @ApiProperty()
  @IsString()
  @IsOptional()
  public service_type: string;
  
  @ApiProperty()
  @IsString()
  @IsOptional()
  public pickup_time: string;
  
  @ApiProperty()
  @IsString()
  @IsOptional()
  public pay_recipient: string;
  
  @ApiProperty()
  @IsString()
  @IsOptional()
  public description: string;
  
  @ApiProperty()
  @IsString()
  @IsOptional()
  public declared_value: string;
  
  @ApiProperty()
  @IsString()
  @IsOptional()
  public payment_mode: string;
  
  @ApiProperty()
  @IsString()
  @IsOptional()
  public payment_gateway: string;
  
  @ApiProperty()
  @IsString()
  @IsOptional()
  public origin_details: string;
  
  @ApiProperty()
  @IsString()
  @IsOptional()
  public destination_details: string;
  
  @ApiProperty()
  @IsString()
  @IsOptional()
  public order_reference: string;
  
  @ApiProperty()
  @IsString()
  @IsOptional()
  public destination_phone: string;
  
 

    }







