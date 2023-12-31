import React from 'react';
import {
  Image,
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  FlatList,
} from 'react-native';
import CustomButton from './CustomButton';
import {useFirebase} from '../providers/firebaseProvider';
import {
  addToWishlist,
  addToCart,
  removeFromCart,
  removeFromWishlist,
} from '../services/userService';

const ProductItem = ({isCalledFromWishlist, isCalledFromCart, products}) => {
  const {user} = useFirebase();

  const addItemToCart = item => {
    userId = user.uid;
    addToCart(item, userId).then(() => {
      console.log('success');
    });
  };

  const addItemToWishlist = item => {
    userId = user.uid;
    addToWishlist(item, userId).then(() => {
      console.log('success');
    });
  };

  const removeItem = item => {
    isCalledFromCart
      ? removeFromCart(item.name, user.uid)
      : removeFromWishlist(item.name, user.uid);
  };

  const renderedProduct = ({item}) => {
    return (
      <View style={styles.container}>
        <Image source={{uri: item.image}} style={styles.image}></Image>
        <Text style={styles.title}>{item.name}</Text>
        <Text style={styles.price}>₹{item.price}</Text>
        <View style={styles.buttonContainer}>
          {isCalledFromWishlist || isCalledFromCart ? (
            <CustomButton
              title="Remove"
              onPress={() => removeItem(item)}
              style={[styles.button, {backgroundColor: 'red'}]}
            />
          ) : (
            <CustomButton
              title="Wishlist"
              onPress={() => addItemToWishlist(item)}
              style={[styles.button, {backgroundColor: 'blue'}]}
            />
          )}
          {isCalledFromCart ? null : (
            <CustomButton
              title="Cart"
              onPress={() => addItemToCart(item)}
              style={[styles.button, {backgroundColor: 'green'}]}
            />
          )}
        </View>
      </View>
    );
  };

  return (
    <FlatList
      data={products}
      renderItem={renderedProduct}
      keyExtractor={(item, index) => index.toString()}
      numColumns={1}
    />
  );
};

const styles = StyleSheet.create({
  container: {padding: 5, margin: 5, flex: 0.5},
  image: {width: '100%', height: 450},
  title: {fontSize: 15, color: '#121c14'},
  price: {fontSize: 20, color: '#121c14'},
  buttonContainer: {
    flexDirection: 'row',
    flex: 1,
  },
  button: {
    flex: 1,
  },
});

export default ProductItem;
