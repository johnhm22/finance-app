import { validate } from 'uuid';

export const isValidUUId = (id: any) => {
  if (!id || typeof id !== 'string' || !validate(id)) {
    return false;
  }
  return true;
};
