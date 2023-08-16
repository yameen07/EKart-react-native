import React, {useEffect, useState} from 'react';
import {StyleSheet, Text, View} from 'react-native';
import {getWishlistForUser} from '../services/userService';
import {useFirebase} from '../providers/firebaseProvider';
import ProductItem from '../components/ProductItem';
import Loader from '../components/Loader';
import CustomButton from '../components/CustomButton';

const Wishlist = ({navigation}) => {
  const {user, signOut} = useFirebase();
  const [products, setProducts] = useState([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    if (user) {
      getWishlistForUser(user.uid).then(result => {
        product = [];
        for (item in result) {
          product.push(result[item]);
        }
        setProducts(product);
        setIsLoading(false);
      });
    }
  }, [products]);

  const signOutApp = () => {
    signOut().then(() => {
      navigation.replace('Login');
    });
  };

  if (isLoading) {
    return (
      <View style={styles.loaderContainer}>
        <Loader />
      </View>
    );
  }

  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <Text style={styles.headerText}>Wishlist</Text>
        <CustomButton
          style={styles.logOut}
          title="Log Out"
          onPress={signOutApp}
        />
      </View>
      <ProductItem isCalledFromWishlist={true} products={products} />
    </View>
  );
};

styles = StyleSheet.create({
  loaderContainer: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
  container: {
    backgroundColor: '#e0ebe2',
    marginBottom: 90,
  },
  logOut: {
    width: 80,
    position: 'absolute',
    right: 0,
    marginTop: 40,
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
});

export default Wishlist;
