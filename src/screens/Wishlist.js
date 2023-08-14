import React, {useEffect, useState} from 'react';
import {StyleSheet, View} from 'react-native';
import {getWishlistForUser} from '../services/userService';
import {useFirebase} from '../providers/firebaseProvider';
import ProductItem from '../components/ProductItem';
import Loader from '../components/Loader';

const Wishlist = () => {
  const {user} = useFirebase();
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

  if (isLoading) {
    return (
      <View style={styles.loaderContainer}>
        <Loader />
      </View>
    );
  }

  return (
    <View style={styles.container}>
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
    marginTop: 50,
  },
});

export default Wishlist;
