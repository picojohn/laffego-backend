import { IsString, IsNotEmpty, IsOptional, IsInt, IsNumber, IsDate, } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';

/**
 * Dto para el Objeto Login de laffego
 * @author John Pico - desarrollo5@expertosip.com
 * @copyright ExpertosIp 2023 
 */

/* DTO para la creacion de un Login */
export class RolesDto {
  @ApiProperty()
  @IsInt()
  @IsOptional()
  public id: number;
  
  @ApiProperty()
  @IsString()
  @IsOptional()
  public name: string;
  
  @ApiProperty()
  @IsString()
  @IsOptional()
  public guard_name: string;
  
  @ApiProperty()
  @IsInt()
  @IsOptional()
  public type: number;

  @ApiProperty()
  @IsString()
  @IsOptional()
  public description: string;

  @ApiProperty()
  @IsInt()
  @IsOptional()
  public is_active: number;

  @ApiProperty()
  @IsDate()
  @IsOptional()
  public created_at: Date;

  @ApiProperty()
  @IsDate()
  @IsOptional()
  public updated_at: Date;

  @ApiProperty()
  @IsDate()
  @IsOptional()
  public deleted_at: Date;

 

}
