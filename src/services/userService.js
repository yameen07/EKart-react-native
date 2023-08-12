import axios from 'axios';
const url = 'https://ekart-9fb16-default-rtdb.firebaseio.com/';

const categories = {
  category_id_1: {
    name: 'Electronics',
  },
  category_id_2: {
    name: 'Furniture',
  },
  // Add more categories...
};

// Sample products data
const products = {
  product_id_1: {
    name: 'SAMSUNG Galaxy F13',
    price: 11000,
    category: 'Electronics',
    subcategory: 'Smartphones',
    description: '(Waterfall Blue, 64 GB)  (4 GB RAM)',
    image:
      'https://rukminim2.flixcart.com/image/416/416/xif0q/mobile/0/8/4/-original-imagfhu75eupxyft.jpeg?q=70',
  },
  product_id_2: {
    name: 'POCO M6 Pro 5G',
    price: 12099,
    category: 'Electronics',
    subcategory: 'Smartphones',
    description: '(Power Black, 64 GB)  (4 GB RAM)',
    image:
      'https://rukminim2.flixcart.com/image/416/416/xif0q/mobile/d/h/q/m6-pro-5g-mzb0eprin-poco-original-imags3e7vewsafst.jpeg?q=70',
  },
  product_id_2: {
    name: 'vivo T2x 5G ',
    price: 20000,
    category: 'Electronics',
    subcategory: 'Smartphones',
    description: '(Power Blue, 64 GB)  (4 GB RAM)',
    image:
      'https://rukminim2.flixcart.com/image/416/416/xif0q/mobile/k/u/n/-original-imagzjhwtfthcmzz.jpeg?q=70',
  },
  product_id_3: {
    name: 'Flipkart Perfect Homes Waltz Engineered Wood King Box Bed ',
    price: 19999,
    category: 'Furniture',
    description:
      '(Finish Color - American Espresso, Delivery Condition - Knock Down)',
    image:
      'https://rukminim2.flixcart.com/image/416/416/xif0q/bed/j/y/5/-original-imagpprf9wppvhuy.jpeg?q=70',
  },
  product_id_3: {
    name: 'Flipkart Perfect Homes Julian Engineered Wood 2 Door Wardrobe',
    price: 9999,
    category: 'Furniture',
    description:
      '(Finish Color - American Espresso, Mirror Included, Knock Down)',
    image:
      'https://rukminim2.flixcart.com/image/416/416/xif0q/wardrobe-closet/f/6/5/-original-imagrxnjzwhda9sa.jpeg?q=70',
  },
};

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
export const insertDummyData = async () => {
  try {
    // Insert categories
    for (const categoryId in categories) {
      let target = categories[categoryId];
      console.log(categories[categoryId].name);
      await axios.put(
        `${url}/categories/${categories[categoryId].name}.json`,
        categories[categoryId],
      );
    }

    //Insert products
    for (const productId in products) {
      await axios.put(
        `${url}/products/${products[productId].category}.json`,
        products[productId],
      );
    }

    console.log('Dummy data inserted successfully.');
  } catch (error) {
    console.error('Error inserting dummy data:', error);
  }
};
