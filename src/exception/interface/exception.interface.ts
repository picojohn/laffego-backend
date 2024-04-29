import { Status } from './../resources/status.enum';

export interface IException {
  status: Status;
  message: string;
  errorCode: string | number;
}
