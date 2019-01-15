export interface IPicture {
  id?: string;
  code?: string;
  path?: string;
  pictureTypeId?: string;
}

export const defaultValue: Readonly<IPicture> = {};
