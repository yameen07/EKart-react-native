import React, {useEffect, useState} from 'react';
import {View, Text, StyleSheet, TouchableOpacity, FlatList} from 'react-native';

import CustomButton from '../components/CustomButton';
import {useFirebase} from '../providers/firebaseProvider';
import ProductItem from '../components/ProductItem';
import {getSingleUser} from '../services/userService';

const products = [
  {
    id: '1',
    title: 'Product 1',
    price: '20',
    image: 'https://images.pexels.com/photos/3270223/pexels-photo-3270223.jpeg',
  },
  {
    id: '2',
    title: 'Product 2',
    price: '30',
    image: 'https://images.pexels.com/photos/3270223/pexels-photo-3270223.jpeg',
  },
  {
    id: '3',
    title: 'Product 1',
    price: '20',
    image: 'https://images.pexels.com/photos/3270223/pexels-photo-3270223.jpeg',
  },
  {
    id: '4',
    title: 'Product 2',
    price: '30',
    image: 'https://images.pexels.com/photos/3270223/pexels-photo-3270223.jpeg',
  },
  {
    id: '5',
    title: 'Product 1',
    price: '20',
    image: 'https://images.pexels.com/photos/3270223/pexels-photo-3270223.jpeg',
  },
  {
    id: '6',
    title: 'Product 2',
    price: '30',
    image: 'https://images.pexels.com/photos/3270223/pexels-photo-3270223.jpeg',
  },
  {
    id: '7',
    title: 'Product 1',
    price: '20',
    image: 'https://images.pexels.com/photos/3270223/pexels-photo-3270223.jpeg',
  },
  {
    id: '8',
    title: 'Product 2',
    price: '30',
    image: 'https://images.pexels.com/photos/3270223/pexels-photo-3270223.jpeg',
  },
  {
    id: '9',
    title: 'Product 1',
    price: '20',
    image: 'https://images.pexels.com/photos/3270223/pexels-photo-3270223.jpeg',
  },
  {
    id: '10',
    title: 'Product 2',
    price: '30',
    image: 'https://images.pexels.com/photos/3270223/pexels-photo-3270223.jpeg',
  },
  {
    id: '11',
    title: 'Product 1',
    price: '20',
    image: 'https://images.pexels.com/photos/3270223/pexels-photo-3270223.jpeg',
  },
  {
    id: '12',
    title: 'Product 2',
    price: '30',
    image: 'https://images.pexels.com/photos/3270223/pexels-photo-3270223.jpeg',
  },
];

const categories = [
  {id: '1', title: 'Category 1'},
  {id: '2', title: 'Category 2'},
  {id: '3', title: 'Category 1'},
  {id: '4', title: 'Category 2'},
  {id: '5', title: 'Category 1'},
  {id: '6', title: 'Category 2'},
];

const Home = ({navigation}) => {
  const [userName, setUserName] = useState('');
  const renderCategoryItem = ({item}) => (
    <TouchableOpacity style={styles.categoryItem}>
      <Text style={styles.categoryTitle}>{item.title}</Text>
    </TouchableOpacity>
  );
  const {signOut, user} = useFirebase();

  useEffect(() => {
    if (user) {
      getSingleUser(user.uid).then(result => {
        setUserName(result.name);
      });
    }
  }, [user]);

  const signOutApp = () => {
    signOut().then(() => {
      navigation.replace('Login');
    });
  };

  return (
    <View>
      <View style={styles.container}>
        <View style={styles.header}>
          <Text style={styles.headerText}>Welcome! {userName}</Text>
          <CustomButton
            style={styles.logOut}
            title="Log Out"
            onPress={signOutApp}
          />
        </View>
        <View style={styles.categoriesContainer}>
          <FlatList
            data={categories}
            renderItem={renderCategoryItem}
            keyExtractor={item => item.id}
            horizontal
            showsHorizontalScrollIndicator={false}
          />
        </View>
        <ProductItem products={products} />
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    backgroundColor: '#e0ebe2',
    marginBottom: 70,
  },
  header: {
    padding: 20,
    backgroundColor: '#915986',
    flexDirection: 'row',
    paddingTop: 40,
  },
  headerText: {
    color: 'white',
    fontSize: 20,
    fontWeight: 'bold',
  },
  categoriesContainer: {
    padding: 10,
  },
  categoryItem: {
    backgroundColor: 'white',
    paddingVertical: 8,
    paddingHorizontal: 16,
    marginRight: 10,
    borderRadius: 20,
  },
  categoryTitle: {
    fontSize: 16,
    color: 'black',
  },
  logOut: {
    width: 80,
    position: 'absolute',
    right: 0,
    marginTop: 40,
  },
});

export default Home;
