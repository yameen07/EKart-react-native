import axios from 'axios';
const url = 'https://ekart-9fb16-default-rtdb.firebaseio.com/';

export const createUser = async (userData, uid) => {
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
  } catch (error) {
    console.error('Error getting users:', error);
  }
};

export const getProducts = async () => {
  try {
    const response = await axios.get(url + '/products.json');
    const products = response.data;
    return products;
  } catch (error) {
    console.error('Error getting products:', error);
  }
};

export const getCategories = async () => {
  try {
    const response = await axios.get(url + '/categories.json');
    const categories = response.data;
    return categories;
  } catch (error) {
    console.error('Error getting categories:', error);
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

export const insertDummyData = async () => {
  try {
    await axios.put(`${url}/categories.json`, categories);

    await axios.put(`${url}/products.json`, products);

    console.log('Dummy data inserted successfully.');
  } catch (error) {
    console.error('Error inserting dummy data:', error);
  }
};

export const addToWishlist = async (item, uid) => {
  try {
    const response = await axios.put(
      `${url}wishlist/${uid}/${item.name}.json`,
      item,
    );
    console.log('item added to wishlist:', response.data);
  } catch (error) {
    console.log('Error adding to wishlist:', error);
  }
};

export const getWishlistForUser = async uid => {
  try {
    const response = await axios.get(`${url}wishlist/${uid}.json`);
    const wishlist = response.data;
    return wishlist;
  } catch (error) {
    console.error('Error getting categories:', error);
  }
};

export const removeFromWishlist = async (itemName, uid) => {
  try {
    const response = await axios.delete(
      `${url}wishlist/${uid}/${itemName}.json`,
    );
    console.log('Item removed from wishlist:', response.data);
  } catch (error) {
    console.log('Error removing from wishlist:', error);
  }
};
