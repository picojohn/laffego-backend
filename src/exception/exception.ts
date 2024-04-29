import { HttpException } from '@nestjs/common';

import { Status } from './resources/status.enum';
import { IException } from './interface/exception.interface';

import * as errorsJSON from './errors.list';

export class Exception extends HttpException {
  constructor(exceptionId?: number | string) {
    const errors = errorsJSON.default;

    if (exceptionId !== undefined) {
      const errorObject: IException = errors[exceptionId]; // Se obtiene la estructura JSON del error
      errorObject.errorCode = `${errorObject.errorCode}`; // Se concatena el código del proyecto
      super(errorObject, errorObject.status); // Se reporta error a HttpException
    } else {
      // Se genera la estructura de error por defecto
      const defaultErrorObject: IException = {
        status: Status.STATUS_500,
        message: 'Unknown Error.',
        errorCode: '0',
      };

      defaultErrorObject.errorCode = `${defaultErrorObject.errorCode}`; // Concatena el error con el código del proyecto
      super(defaultErrorObject, defaultErrorObject.status); // Se reporta error a HttpException
    }
  }
}
