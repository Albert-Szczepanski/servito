import {Action} from '@ngrx/store';
import {AuthRequestModel} from '../../shared/models/auth-request.model';

export const GET_AUTH = 'GET_AUTH';

export class GetAuth implements Action {
  readonly type = GET_AUTH;
  payload: AuthRequestModel;
}
