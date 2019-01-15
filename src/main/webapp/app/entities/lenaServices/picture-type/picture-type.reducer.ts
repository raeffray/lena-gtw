import axios from 'axios';
import { ICrudSearchAction, ICrudGetAction, ICrudGetAllAction, ICrudPutAction, ICrudDeleteAction } from 'react-jhipster';

import { cleanEntity } from 'app/shared/util/entity-utils';
import { REQUEST, SUCCESS, FAILURE } from 'app/shared/reducers/action-type.util';
import { IPictureType, defaultValue } from 'app/shared/model/lenaServices/picture-type.model';

export const ACTION_TYPES = {
  SEARCH_PICTURETYPES: 'pictureType/SEARCH_PICTURETYPES',
  FETCH_PICTURETYPE_LIST: 'pictureType/FETCH_PICTURETYPE_LIST',
  FETCH_PICTURETYPE: 'pictureType/FETCH_PICTURETYPE',
  CREATE_PICTURETYPE: 'pictureType/CREATE_PICTURETYPE',
  UPDATE_PICTURETYPE: 'pictureType/UPDATE_PICTURETYPE',
  DELETE_PICTURETYPE: 'pictureType/DELETE_PICTURETYPE',
  RESET: 'pictureType/RESET'
};

const initialState = {
  loading: false,
  errorMessage: null,
  entities: [] as ReadonlyArray<IPictureType>,
  entity: defaultValue,
  updating: false,
  totalItems: 0,
  updateSuccess: false
};

export type PictureTypeState = Readonly<typeof initialState>;

// Reducer

export default (state: PictureTypeState = initialState, action): PictureTypeState => {
  switch (action.type) {
    case REQUEST(ACTION_TYPES.SEARCH_PICTURETYPES):
    case REQUEST(ACTION_TYPES.FETCH_PICTURETYPE_LIST):
    case REQUEST(ACTION_TYPES.FETCH_PICTURETYPE):
      return {
        ...state,
        errorMessage: null,
        updateSuccess: false,
        loading: true
      };
    case REQUEST(ACTION_TYPES.CREATE_PICTURETYPE):
    case REQUEST(ACTION_TYPES.UPDATE_PICTURETYPE):
    case REQUEST(ACTION_TYPES.DELETE_PICTURETYPE):
      return {
        ...state,
        errorMessage: null,
        updateSuccess: false,
        updating: true
      };
    case FAILURE(ACTION_TYPES.SEARCH_PICTURETYPES):
    case FAILURE(ACTION_TYPES.FETCH_PICTURETYPE_LIST):
    case FAILURE(ACTION_TYPES.FETCH_PICTURETYPE):
    case FAILURE(ACTION_TYPES.CREATE_PICTURETYPE):
    case FAILURE(ACTION_TYPES.UPDATE_PICTURETYPE):
    case FAILURE(ACTION_TYPES.DELETE_PICTURETYPE):
      return {
        ...state,
        loading: false,
        updating: false,
        updateSuccess: false,
        errorMessage: action.payload
      };
    case SUCCESS(ACTION_TYPES.SEARCH_PICTURETYPES):
    case SUCCESS(ACTION_TYPES.FETCH_PICTURETYPE_LIST):
      return {
        ...state,
        loading: false,
        totalItems: action.payload.headers['x-total-count'],
        entities: action.payload.data
      };
    case SUCCESS(ACTION_TYPES.FETCH_PICTURETYPE):
      return {
        ...state,
        loading: false,
        entity: action.payload.data
      };
    case SUCCESS(ACTION_TYPES.CREATE_PICTURETYPE):
    case SUCCESS(ACTION_TYPES.UPDATE_PICTURETYPE):
      return {
        ...state,
        updating: false,
        updateSuccess: true,
        entity: action.payload.data
      };
    case SUCCESS(ACTION_TYPES.DELETE_PICTURETYPE):
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

const apiUrl = 'lenaservices/api/picture-types';
const apiSearchUrl = 'lenaservices/api/_search/picture-types';

// Actions

export const getSearchEntities: ICrudSearchAction<IPictureType> = (query, page, size, sort) => ({
  type: ACTION_TYPES.SEARCH_PICTURETYPES,
  payload: axios.get<IPictureType>(`${apiSearchUrl}?query=${query}${sort ? `&page=${page}&size=${size}&sort=${sort}` : ''}`)
});

export const getEntities: ICrudGetAllAction<IPictureType> = (page, size, sort) => {
  const requestUrl = `${apiUrl}${sort ? `?page=${page}&size=${size}&sort=${sort}` : ''}`;
  return {
    type: ACTION_TYPES.FETCH_PICTURETYPE_LIST,
    payload: axios.get<IPictureType>(`${requestUrl}${sort ? '&' : '?'}cacheBuster=${new Date().getTime()}`)
  };
};

export const getEntity: ICrudGetAction<IPictureType> = id => {
  const requestUrl = `${apiUrl}/${id}`;
  return {
    type: ACTION_TYPES.FETCH_PICTURETYPE,
    payload: axios.get<IPictureType>(requestUrl)
  };
};

export const createEntity: ICrudPutAction<IPictureType> = entity => async dispatch => {
  const result = await dispatch({
    type: ACTION_TYPES.CREATE_PICTURETYPE,
    payload: axios.post(apiUrl, cleanEntity(entity))
  });
  dispatch(getEntities());
  return result;
};

export const updateEntity: ICrudPutAction<IPictureType> = entity => async dispatch => {
  const result = await dispatch({
    type: ACTION_TYPES.UPDATE_PICTURETYPE,
    payload: axios.put(apiUrl, cleanEntity(entity))
  });
  dispatch(getEntities());
  return result;
};

export const deleteEntity: ICrudDeleteAction<IPictureType> = id => async dispatch => {
  const requestUrl = `${apiUrl}/${id}`;
  const result = await dispatch({
    type: ACTION_TYPES.DELETE_PICTURETYPE,
    payload: axios.delete(requestUrl)
  });
  dispatch(getEntities());
  return result;
};

export const reset = () => ({
  type: ACTION_TYPES.RESET
});
