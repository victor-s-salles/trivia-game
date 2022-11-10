import md5 from 'crypto-js/md5';

const gravatar = (email) => {
  const toHash = md5(email).toString().trim();
  const apiResponse = `https://www.gravatar.com/avatar/${toHash}`;
  return apiResponse;
};

export default gravatar;
