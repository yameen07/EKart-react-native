import React, {useEffect, useState} from 'react';
import {
  View,
  Text,
  StyleSheet,
  TextInput,
  TouchableOpacity,
  FlatList,
} from 'react-native';

import CustomButton from '../components/CustomButton';
import {useFirebase} from '../providers/firebaseProvider';
import ProductItem from '../components/ProductItem';
import {
  getSingleUser,
  insertDummyData,
  getProducts,
  getCategories,
} from '../services/userService';

const Home = ({navigation}) => {
  const [userName, setUserName] = useState('');
  const [fetchedProducts, setFetchedProducts] = useState([]);
  const [fetchedCategory, setFetchedCategory] = useState([]);
  const [search, setSearch] = useState('');
  const [searchResults, setSearchResults] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('');

  const renderCategoryItem = ({item}) => (
    <TouchableOpacity
      onPress={() => setCategory(item.name)}
      style={styles.categoryItem}>
      <Text style={styles.categoryTitle}>{item.name}</Text>
    </TouchableOpacity>
  );
  const {signOut, user} = useFirebase();

  const setCategory = category => {
    setSelectedCategory(category);
  };

  useEffect(() => {
    if (user) {
      getSingleUser(user.uid).then(result => {
        setUserName(result.name);
      });
    }

    getProducts().then(result => {
      setFetchedProducts(result);
    });

    getCategories().then(result => {
      setFetchedCategory(result);
    });
  }, [user]);

  useEffect(() => {
    console.log(selectedCategory);
    if (selectedCategory === '') {
      setSearchResults(fetchedProducts);
    } else {
      const filteredProducts = fetchedProducts.filter(product =>
        product.category.toLowerCase().includes(selectedCategory.toLowerCase()),
      );
      setSearchResults(filteredProducts);
    }
  }, [selectedCategory, fetchedProducts]);

  useEffect(() => {
    if (search === '') {
      setSearchResults(fetchedProducts);
    } else {
      const filteredProducts = fetchedProducts.filter(product =>
        product.name.toLowerCase().includes(search.toLowerCase()),
      );
      setSearchResults(filteredProducts);
    }
  }, [search, fetchedProducts]);

  const signOutApp = () => {
    signOut().then(() => {
      navigation.replace('Login');
    });
  };

  return searchResults ? (
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
          <View>
            <FlatList
              style={styles.category}
              data={fetchedCategory}
              renderItem={renderCategoryItem}
              keyExtractor={(item, index) => index.toString()}
              horizontal
              showsHorizontalScrollIndicator={false}
            />
          </View>
          <View>
            <TextInput
              style={styles.input}
              value={search}
              onChangeText={setSearch}
              placeholder="Search"
              placeholderTextColor="#808080"></TextInput>
          </View>
        </View>
        <ProductItem products={searchResults} />
      </View>
    </View>
  ) : (
    ''
  );
};

const styles = StyleSheet.create({
  container: {
    backgroundColor: '#e0ebe2',
    marginBottom: 290,
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
    flexDirection: 'row',
    padding: 10,
  },
  category: {width: 230},
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
  input: {
    color: '#121c14',
    width: 160,
    borderColor: 'black',
    borderWidth: 1,
    borderRadius: 5,
    height: 40,
  },
});

export default Home;
