import axios from 'axios';
import { ICrudSearchAction, ICrudGetAction, ICrudGetAllAction, ICrudPutAction, ICrudDeleteAction } from 'react-jhipster';

import { cleanEntity } from 'app/shared/util/entity-utils';
import { REQUEST, SUCCESS, FAILURE } from 'app/shared/reducers/action-type.util';
import { IPicture, defaultValue } from 'app/shared/model/lenaServices/picture.model';

export const ACTION_TYPES = {
  SEARCH_PICTURES: 'picture/SEARCH_PICTURES',
  FETCH_PICTURE_LIST: 'picture/FETCH_PICTURE_LIST',
  FETCH_PICTURE: 'picture/FETCH_PICTURE',
  CREATE_PICTURE: 'picture/CREATE_PICTURE',
  UPDATE_PICTURE: 'picture/UPDATE_PICTURE',
  DELETE_PICTURE: 'picture/DELETE_PICTURE',
  RESET: 'picture/RESET'
};

const initialState = {
  loading: false,
  errorMessage: null,
  entities: [] as ReadonlyArray<IPicture>,
  entity: defaultValue,
  updating: false,
  totalItems: 0,
  updateSuccess: false
};

export type PictureState = Readonly<typeof initialState>;

// Reducer

export default (state: PictureState = initialState, action): PictureState => {
  switch (action.type) {
    case REQUEST(ACTION_TYPES.SEARCH_PICTURES):
    case REQUEST(ACTION_TYPES.FETCH_PICTURE_LIST):
    case REQUEST(ACTION_TYPES.FETCH_PICTURE):
      return {
        ...state,
        errorMessage: null,
        updateSuccess: false,
        loading: true
      };
    case REQUEST(ACTION_TYPES.CREATE_PICTURE):
    case REQUEST(ACTION_TYPES.UPDATE_PICTURE):
    case REQUEST(ACTION_TYPES.DELETE_PICTURE):
      return {
        ...state,
        errorMessage: null,
        updateSuccess: false,
        updating: true
      };
    case FAILURE(ACTION_TYPES.SEARCH_PICTURES):
    case FAILURE(ACTION_TYPES.FETCH_PICTURE_LIST):
    case FAILURE(ACTION_TYPES.FETCH_PICTURE):
    case FAILURE(ACTION_TYPES.CREATE_PICTURE):
    case FAILURE(ACTION_TYPES.UPDATE_PICTURE):
    case FAILURE(ACTION_TYPES.DELETE_PICTURE):
      return {
        ...state,
        loading: false,
        updating: false,
        updateSuccess: false,
        errorMessage: action.payload
      };
    case SUCCESS(ACTION_TYPES.SEARCH_PICTURES):
    case SUCCESS(ACTION_TYPES.FETCH_PICTURE_LIST):
      return {
        ...state,
        loading: false,
        totalItems: action.payload.headers['x-total-count'],
        entities: action.payload.data
      };
    case SUCCESS(ACTION_TYPES.FETCH_PICTURE):
      return {
        ...state,
        loading: false,
        entity: action.payload.data
      };
    case SUCCESS(ACTION_TYPES.CREATE_PICTURE):
    case SUCCESS(ACTION_TYPES.UPDATE_PICTURE):
      return {
        ...state,
        updating: false,
        updateSuccess: true,
        entity: action.payload.data
      };
    case SUCCESS(ACTION_TYPES.DELETE_PICTURE):
      return {
        ...state,
        updating: false,
        updateSuccess: true,
        entity: {}
      };
    case ACTION_TYPES.RESET:
      return {
        ...initialState
      };
    default:
      return state;
  }
};

const apiUrl = 'lenaservices/api/pictures';
const apiSearchUrl = 'lenaservices/api/_search/pictures';

// Actions

export const getSearchEntities: ICrudSearchAction<IPicture> = (query, page, size, sort) => ({
  type: ACTION_TYPES.SEARCH_PICTURES,
  payload: axios.get<IPicture>(`${apiSearchUrl}?query=${query}${sort ? `&page=${page}&size=${size}&sort=${sort}` : ''}`)
});

export const getEntities: ICrudGetAllAction<IPicture> = (page, size, sort) => {
  const requestUrl = `${apiUrl}${sort ? `?page=${page}&size=${size}&sort=${sort}` : ''}`;
  return {
    type: ACTION_TYPES.FETCH_PICTURE_LIST,
    payload: axios.get<IPicture>(`${requestUrl}${sort ? '&' : '?'}cacheBuster=${new Date().getTime()}`)
  };
};

export const getEntity: ICrudGetAction<IPicture> = id => {
  const requestUrl = `${apiUrl}/${id}`;
  return {
    type: ACTION_TYPES.FETCH_PICTURE,
    payload: axios.get<IPicture>(requestUrl)
  };
};

export const createEntity: ICrudPutAction<IPicture> = entity => async dispatch => {
  const result = await dispatch({
    type: ACTION_TYPES.CREATE_PICTURE,
    payload: axios.post(apiUrl, cleanEntity(entity))
  });
  dispatch(getEntities());
  return result;
};

export const updateEntity: ICrudPutAction<IPicture> = entity => async dispatch => {
  const result = await dispatch({
    type: ACTION_TYPES.UPDATE_PICTURE,
    payload: axios.put(apiUrl, cleanEntity(entity))
  });
  dispatch(getEntities());
  return result;
};

export const deleteEntity: ICrudDeleteAction<IPicture> = id => async dispatch => {
  const requestUrl = `${apiUrl}/${id}`;
  const result = await dispatch({
    type: ACTION_TYPES.DELETE_PICTURE,
    payload: axios.delete(requestUrl)
  });
  dispatch(getEntities());
  return result;
};

export const reset = () => ({
  type: ACTION_TYPES.RESET
});
