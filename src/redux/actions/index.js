export const CREATE_USER = 'CREATE_USER';

export const createUser = (email) => ({
  type: CREATE_USER,
  email,
});
