/**
 * Interfaces Para la tabla user laffego
 * @author John Pico - desarrollo5@expertosip.com
 * @copyright ExpertosIp 2024
 */

/* Interfaz pora un modulo */
export interface IRoles {
  id: number;
  name: string;
  guard_name: string;
  type: number;
  description: string;
  is_active: number;
  created_at: Date;
  updated_at: Date;
  deleted_at: Date;


}
