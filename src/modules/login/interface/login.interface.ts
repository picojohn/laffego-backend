/**
 * Interfaces Para la tabla user laffego
 * @author John Pico - desarrollo5@expertosip.com
 * @copyright ExpertosIp 2024
 */

/* Interfaz pora un modulo */
export interface IUser {
  id: number;
  role_id: number;
  name: string;
  email: string;
  avatar: string;
  facebook_id: string;
  google_id: string;
  apple_id: string;
  country_id: number;
  phone: string;
  address: string;
  password: string;
  status: number;
  remember_token: string;
  is_admin: number;
  notification: number;
  otp: number;
  push_id: string;
  device_type: number;
  created_at: Date;
  updated_at: Date;
  ADMIN: number;
  COMPANY_ID: number;
  FILTRAR_SEDE: number;
  ORDER_SOURCES_ALLOWED: string;
  TERMINOS_ACEPTADOS: number;
  sede_id: number;
  PERMITIR_CREDITO: number;

}




