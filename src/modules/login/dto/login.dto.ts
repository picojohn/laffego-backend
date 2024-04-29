import {
  IsString,
  IsNotEmpty,
  IsOptional,
  IsInt,
  IsNumber,
  IsDate,
} from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';

/**
 * Dto para el Objeto Login de oralHome
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
  @IsString()
  @IsOptional()
  public name: string;

  @ApiProperty()
  @IsInt()
  @IsOptional()
  public persona_id: number;

  @ApiProperty()
  @IsString()
  @IsOptional()
  public email: string;
  
  @ApiProperty()
  @IsDate()
  @IsOptional()
  public email_verified_at: Date;
  
  @ApiProperty()
  @IsString()
  @IsOptional()
  public password: string;
  
  @ApiProperty()
  @IsString()
  @IsOptional()
  public remember_token: string;
  
  @ApiProperty()
  @IsString()
  @IsOptional()
  public api_token: string;
  
  
  @ApiProperty()
  @IsDate()
  @IsOptional()
  public created_at: Date;
  
  @ApiProperty()
  @IsDate()
  @IsOptional()
  public updated_at: Date;

}
