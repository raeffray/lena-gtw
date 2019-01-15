import { IPicture } from 'app/shared/model/lenaServices/picture.model';

export interface IPictureType {
  id?: string;
  code?: string;
  description?: string;
  pictures?: IPicture[];
}

export const defaultValue: Readonly<IPictureType> = {};
