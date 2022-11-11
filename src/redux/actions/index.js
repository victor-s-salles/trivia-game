export const CREATE_USER = 'CREATE_USER';
export const SAVE_IMAGE = 'SAVE_IMAGE';
export const createUser = (payload) => ({
  type: CREATE_USER,
  payload,
});
export const saveImage = (payload) => ({
  type: SAVE_IMAGE,
  payload,
});
