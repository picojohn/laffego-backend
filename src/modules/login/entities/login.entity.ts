/**
 * Entidad de tabla users
 * @author John Pico - desarrollo5@expertosip.com
 * @copyright ExpertosIp 2024
 */

import { Entity, Column, PrimaryGeneratedColumn } from 'typeorm';

@Entity({ name: 'users' })
export class ELogin {
  @PrimaryGeneratedColumn('increment') id: number;
  @Column({ type: 'int' }) role_id: number;
  @Column({ type: 'varchar', length: 191 }) name: string;
  @Column({ type: 'varchar', length: 191 }) email: string;
  @Column({ type: 'varchar', length: 191 }) avatar: string;
  @Column({ type: 'varchar', length: 255 }) facebook_id: string;
  @Column({ type: 'varchar', length: 255 }) google_id: string;
  @Column({ type: 'varchar', length: 255 }) apple_id: string;
  @Column({ type: 'int' }) country_id: number;
  @Column({ type: 'varchar', length: 15 }) phone: string;
  @Column({ type: 'varchar', length: 255 }) address: string;
  @Column({ type: 'varchar', length: 191 }) password: string;
  @Column({ type: 'int' }) status: number;
  @Column({ type: 'varchar', length: 191 }) remember_token: string;
  @Column({ type: 'int' }) is_admin: number;
  @Column({ type: 'int' }) notification: number;
  @Column({ type: 'int' }) otp: number;
  @Column({ type: 'varchar', length: 200 }) push_id: string;
  @Column({ type: 'int' }) device_type: number;
  @Column({ type: 'date' }) created_at: Date;
  @Column({ type: 'date' }) updated_at: Date;
  @Column({ type: 'int' }) ADMIN: number;
  @Column({ type: 'int' }) COMPANY_ID: number;
  @Column({ type: 'int' }) FILTRAR_SEDE: number;
  @Column({ type: 'varchar', length: 255 }) ORDER_SOURCES_ALLOWED: string;
  @Column({ type: 'int' }) TERMINOS_ACEPTADOS: number;
  @Column({ type: 'int' }) sede_id: number;
  @Column({ type: 'int' }) PERMITIR_CREDITO: number;


}
