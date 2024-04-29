/**
 * Entidad de tabla users
 * @author John Pico - desarrollo5@expertosip.com
 * @copyright ExpertosIp 2024
 */

import { Entity, Column, PrimaryGeneratedColumn } from 'typeorm';

@Entity({ name: 'users' })
export class ELogin {
  @PrimaryGeneratedColumn('increment') id: number;
  @Column({ type: 'varchar', length: 100 }) name: string;
  @Column({ type: 'int' }) persona_id: number;
  @Column({ type: 'varchar', length: 200 }) email: string;
  @Column({ type: 'date' }) email_verified_at: Date;
  @Column({ type: 'varchar', length: 200 }) password: string;
  @Column({ type: 'varchar', length: 200 }) remember_token: string;
  @Column({ type: 'varchar', length: 200 }) api_token: string;
  @Column({ type: 'date' }) created_at: Date;
  @Column({ type: 'date' }) updated_at: Date;


}
