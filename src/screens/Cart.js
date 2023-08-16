import React, {useEffect, useState} from 'react';
import {StyleSheet, Text, View} from 'react-native';
import {getCartForUser} from '../services/userService';
import {useFirebase} from '../providers/firebaseProvider';
import ProductItem from '../components/ProductItem';
import Loader from '../components/Loader';
import CustomButton from '../components/CustomButton';

const Cart = ({navigation}) => {
  const {user, signOut} = useFirebase();
  const [products, setProducts] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [totalPrice, setTotalPrice] = useState('');

  useEffect(() => {
    if (user) {
      getCartForUser(user.uid).then(result => {
        product = [];
        total = 0;
        for (item in result) {
          product.push(result[item]);
          total += result[item].price;
        }
        setTotalPrice(total);
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

  const signOutApp = () => {
    signOut().then(() => {
      navigation.replace('Login');
    });
  };

  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <Text style={styles.headerText}>Cart</Text>

        <CustomButton
          style={styles.logOut}
          title="Log Out"
          onPress={signOutApp}
        />
      </View>
      <Text style={styles.price}>Total: {totalPrice}</Text>

      <ProductItem isCalledFromCart={true} products={products} />
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
    marginBottom: 130,
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
  price: {
    fontSize: 30,
    fontWeight: 'bold',
  },
});

export default Cart;
