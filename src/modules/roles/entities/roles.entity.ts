/**
 * Entidad de tabla users
 * @author John Pico - desarrollo5@expertosip.com
 * @copyright ExpertosIp 2024
 */

import { Entity, Column, PrimaryGeneratedColumn } from 'typeorm';

@Entity({ name: 'roles' })
export class ERoles {
  @PrimaryGeneratedColumn('increment') id: number;
  @Column({ type: 'varchar', length: 255 }) name: string;
  @Column({ type: 'varchar', length: 255 }) guard_name: string;
  @Column({ type: 'int' }) type: number;
  @Column({ type: 'varchar', length: 255 }) description: string;
  @Column({ type: 'int' }) is_active: number;
  @Column({ type: 'date' }) created_at: Date;
  @Column({ type: 'date' }) updated_at: Date;
  @Column({ type: 'date' }) deleted_at: Date;


}
