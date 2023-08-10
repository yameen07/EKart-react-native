import React from 'react';
import {
  Image,
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  FlatList,
} from 'react-native';

const ProductItem = ({products}) => {
  const renderedProduct = ({item}) => {
    return (
      <TouchableOpacity style={styles.container}>
        <Image source={{uri: item.image}} style={styles.image}></Image>
        <Text style={styles.title}>{item.title}</Text>
        <Text style={styles.price}>{item.price}</Text>
      </TouchableOpacity>
    );
  };

  return (
    <FlatList
      data={products}
      renderItem={renderedProduct}
      keyExtractor={(item, index) => index.toString()}
      numColumns={2}
    />
  );
};

const styles = StyleSheet.create({
  container: {padding: 5, margin: 5, flex: 0.5},
  image: {width: '100%', height: 150},
  title: {fontSize: 15, color: '#121c14'},
  price: {fontSize: 20, color: '#121c14'},
});

export default ProductItem;
