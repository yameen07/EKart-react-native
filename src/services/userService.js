import axios from 'axios';
const url = 'https://ekart-9fb16-default-rtdb.firebaseio.com/';

export const createUser = async (userData, uid) => {
  console.log(`${url}users/${uid}.json'`);
  try {
    const response = await axios.put(`${url}users/${uid}.json`, userData);
    console.log('User created:', response.data);
  } catch (error) {
    console.log('Error creating user:', error);
  }
};

export const getUsers = async () => {
  try {
    const response = await axios.get(url + '/users.json');
    const users = response.data;
    console.log(users);
  } catch (error) {
    console.error('Error getting users:', error);
  }
};

export const getSingleUser = async uid => {
  try {
    const response = await axios.get(`${url}/users/${uid}.json`);
    const users = response.data;
    return users;
  } catch (error) {
    console.error('Error getting users:', error);
  }
};
