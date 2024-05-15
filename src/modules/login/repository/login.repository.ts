import { Repository } from 'typeorm';
import { InjectRepository } from '@nestjs/typeorm';
import { Logger, Param } from '@nestjs/common';
import { IUser } from '../interface/login.interface';
import { ELogin } from '../entities/login.entity';
import { LoginDto, crearOrdenDto } from '../dto/login.dto';
import { ERoles } from 'src/modules/roles/entities/roles.entity';
import { Querys } from '../resource/querys';
import { HttpService } from '@nestjs/axios';
import axios from 'axios';
import { Client } from "@googlemaps/google-maps-services-js";
import { PlaceAutocompleteResponseData } from '@google/maps';




/**
 * Repositorio de Login del sistema de laffego
 * @author John Pico- desarrollo5@expertosip.com
 * @copyright ExpertosIp 2024
 */

export class LoginRepository {
  /** Variable para mostrar logs */
  private readonly log: Logger;
  constructor(
    @InjectRepository(ELogin)
    public readonly dbInstanceModule: Repository<ELogin>,
    private httpService: HttpService
  ) {
    this.log = new Logger(LoginRepository.name);
  }

  /**
   * Metodo del repositorio para hacer login
   * @param {LoginDto} login
   * @returns {Promise<IUser>}
   */
  public async login(login: LoginDto): Promise<IUser> {
    try {
      this.log.log(`LoginDataRepository > Haciendo Login`);
      return this.dbInstanceModule.findOne({
        where: { email: login.email },
      });
    } catch (error) {
      Logger.error(error);
      throw error;
    }
  }

  getRoles(): Promise<Array<ERoles>> {
    try {
      this.log.log('VisitRepository > Obteniendo todos los roles de laffego');
      return this.dbInstanceModule.query(Querys.GET_ROLES)
    } catch (error) {
      Logger.error(error);
      throw error;
    }
  }


  async getOrdersInit(): Promise<any> {
    try {
      this.log.log('VisitRepository > Obtener ordenes iniciales ');
      let operaciones = await this.dbInstanceModule.query(Querys.GET_OPERATIONS)
      let servicios = await this.dbInstanceModule.query(Querys.GET_SERVICES)
      let data = { "serviceType": servicios, operationType: operaciones }
      // console.log(data);
      const result = {
        data
      }
      return { result, "code": 200, "message": "" }

    } catch (error) {
      Logger.error(error);
      throw error;
    }
  }


  async getCreateOrder(createOrder: crearOrdenDto): Promise<any> {

    const client = new Client({});
    try {
      console.log(createOrder);
      this.log.log('VisitRepository > Obteniendo todo personas para la firma');
      let nummeroDestino: string
      // validar nuemro telefonoco
      if (!createOrder.destination_phone) {
        return { result: [], code: 422, "message": "Debes agregar un numero telefonico de destino." }
      } else {
        let numero = Number(createOrder.destination_phone)
        console.log(numero);
        if (!Number.isInteger(numero) || createOrder.destination_phone.length != 10) {

          return { result: [], code: 422, "message": "Debes agregar un numero telefonico de destino valido." }
        } else {
          nummeroDestino = '57' + numero
          console.log('numero destino ', nummeroDestino);
        }
      }
      // validar si la operacion existe
      if (createOrder.operation_type == null || createOrder.operation_type == "") {
        return { result: [], code: 422, "message": "Campo operation_type es obligatorio " }
      }
      let operacion: Array<any> = await this.dbInstanceModule.query(Querys.GET_OPERATIONS_BY_ID.replace('$id', `${createOrder.operation_type}`))
      if (operacion.length < 1) {
        return { result: [], code: 422, "message": "Campo operation_type " + createOrder.operation_type + " no existe en la base de datos" }
      }

      // validar si el servicio existe
      if (createOrder.service_type == null || createOrder.service_type == "") {
        return { result: [], code: 422, "message": "Campo service_type es obligatorio " }
      }
      let servicio: Array<any> = await this.dbInstanceModule.query(Querys.GET_SERVICES_BY_ID.replace('$id', `${createOrder.service_type}`))
      if (servicio.length < 1) {
        return { result: [], code: 422, "message": "Campo service_type " + createOrder.service_type + " no existe en la base de datos" }
      }

      const apiKey = 'AIzaSyDUTCdkuKaIZzc5pQq5IYlgPaPPDPuZX8g';
      //se valida el origen con la api de google      
      const origenApi = await client.placeAutocomplete({ params: { input: createOrder.origin, key: apiKey, language: "es-419", components: ["country:CO"] } });
      let origen: any;

      if (!origenApi.data.predictions.length) {
        return { result: [], code: 422, "message": "Origen no se puede convertir a un places de gmap" }

      } else {
        origen = origenApi.data.predictions[0]
        console.log('origen', origen);



      }

      // se valida el destino con la apo de google
      const destionoApi = await client.placeAutocomplete({ params: { input: createOrder.origin, key: apiKey, language: "es-419", components: ["country:CO"] } });
      //  console.log(destionoApi.data);
      if (!destionoApi.data.predictions.length) {
        return { result: [], code: 422, "message": "Destino no se puede convertir a un places de gmap" }

      } else {
        // cuando esta el resultado

      }
      console.log(origen.place_id, 'origen con id');

      let origenDetalle = await client.placeDetails({ params: { place_id: origen.place_id , key: apiKey} })
      console.log(origenDetalle, 'origen detalle');






      const result = {
        data: 'data respuesta crear orden', operacion, servicio
      }
      return { result, "code": 200, "message": "" }

    } catch (error) {
      Logger.error(error);
      throw error;
    }
  }



  //nuevos endpoints

  
  async getLoginAutorizacion(token: string): Promise<any> {
    const config = {
      headers: {
        'APIKEY': 'LEFFEGO2020',
        'Authorization': `Bearer ${token}`,
      },
    };

    try {
      const response = await this.httpService.get('url_del_backend_en_java/datos', config).toPromise();
      return response.data;
    } catch (error) {
      throw new Error('Error al obtener datos del backend en Java');
    }
  }




}
