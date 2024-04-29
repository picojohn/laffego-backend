/**
 * Interfaces Para el Login tabla users secsel
 * @author John Pico - desarrollo5@expertosip.com
 * @copyright ExpertosIp 2024
 */

/* Interfaz pora un modulo */
export interface ILogin {
  id: number;
  name: string;
  persona_id: number;
  email: string;
  email_verified_at: Date;
  password: string;
  remember_token: string;
  api_token: string;
  created_at: Date;
  updated_at: Date;
 
}
