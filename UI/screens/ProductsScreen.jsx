import React, {useState, useEffect} from 'react';
import {
  View,
  Text,
  TextInput,
  FlatList,
  TouchableOpacity,
  StyleSheet,
  Image,
  Keyboard,
  ScrollView,
} from 'react-native';
import {listProducts} from '../src/graphql/queries'
import { generateClient } from 'aws-amplify/api';
import ImageResizeMode from 'react-native/Libraries/Image/ImageResizeMode'
import Ionicons from 'react-native-vector-icons/Ionicons';
import {COLORS} from '../assets/theme';
import {useNavigation} from '@react-navigation/native';
import { connect } from 'react-redux';
const ProductsScreen = ({route}) => {
  const client = generateClient();
  const [productsObj, setProductsObj] = useState([]);
  const fetchAllProducts = async () => {
    try {
      const { data } = await client.graphql({
        query: listProducts,
      });
      const { items } = data.listProducts;
      setProductsObj(items);
    } catch (error) {
      console.error('Error fetching products:', error);
    }
  };
  useEffect(() => {
    fetchAllProducts();
  }, []);
  useEffect(() => {
    console.log("skrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrr");
    productsObj.forEach(product => {
      console.log(product);
      console.log("\n"); // Add an empty line between each product
    });
    console.log("skrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrr");
  },[productsObj]); // Log productsObj whenever it changes

  const navigation = useNavigation();
  // const products = route.params.productsObj;
  const products = productsObj;
  const [searchQuery, setSearchQuery] = useState('');
  const [filteredProducts, setFilteredProducts] = useState([]);
  const [isSearchActive, setIsSearchActive] = useState(false);
  const [filteredCategories, setFilteredCategories] = useState([]);
  const [selectedCategory, setSelectedCategory] = useState('All');

  useEffect(() => {
    setFilteredProducts(products);
    const allCategories = Array.from(
      new Set(products.map(product => product.category)),
    );
    setFilteredCategories(allCategories);
  }, [products]);
  const handleAddProduct = () => {
    navigation.navigate('AddProduct');
  };
  const handleSearch = query => {
    setSearchQuery(query);
    const filtered = products.filter(
      product =>
        product.name.toLowerCase().includes(query.toLowerCase()) ||
        product.brand.toLowerCase().includes(query.toLowerCase()),
    );
    setFilteredProducts(filtered);

    // Filter categories that have matching products
    const matchingCategories = Array.from(
      new Set(filtered.map(product => product.category)),
    );
    setFilteredCategories(matchingCategories);

    setIsSearchActive(query !== '');
  };

  const handleCancel = () => {
    setSearchQuery('');
    Keyboard.dismiss();
    setFilteredProducts(products);
    setFilteredCategories(
      Array.from(new Set(products.map(product => product.category))),
    );
    setSelectedCategory('All'); // Reset selected category
    setIsSearchActive(false);
  };

  const renderProductCard = ({item}) => (
    <TouchableOpacity
      style={styles.productCard}
      onPress={() =>
        navigation.navigate('Product', {
          item: item,
        })
      }>
      <View style={styles.productImageContainer}>
        {/* Image */}
        <Image
        source={{ uri: item.images && item.images.length > 0 ? item.images[0] : 'https://upload.wikimedia.org/wikipedia/en/6/61/Tang_drinkmix_logo.png' }}
        style={styles.productImage}
        onError={(error) => console.log("Image loading error:", error)}
      />
      </View>
      <View style={styles.productDetails}>
        {/* Product Name */}
        <Text style={styles.productName}>{item.name}</Text>
        {/* Product Price */}
        <Text style={styles.productPrice}>{item.price}</Text>
      </View>
    </TouchableOpacity>
  );

  return (
    <View style={styles.container}>
      <View style={styles.searchBar}>
        <Ionicons
          name="search-outline"
          size={24}
          color={COLORS.primary}
          style={styles.searchIcon}
        />
        <TextInput
          style={styles.searchInput}
          placeholder="Search here"
          placeholderTextColor={COLORS.primary}
          value={isSearchActive ? searchQuery : ''}
          onChangeText={query => {
            handleSearch(query);
            setIsSearchActive(query !== '');
          }}
        />
        {isSearchActive && (
          <TouchableOpacity onPress={handleCancel}>
            <Text style={styles.cancelButton}>Cancel</Text>
          </TouchableOpacity>
        )}
      </View>
      <ScrollView style={styles.containerScrollView}>
        {filteredCategories.map(category => (
          <View key={category}>
            <View style={styles.categoryTitleContainer}>
              <Text style={styles.categoryTitle}>{category}</Text>
              {filteredProducts.filter(product => product.category === category)
                .length > 2 && (
                <Ionicons
                  name="chevron-forward"
                  size={24}
                  color={COLORS.primary}
                />
              )}
            </View>
            <View style={styles.categoryRow}>
              <FlatList
                data={filteredProducts.filter(
                  product => product.category === category,
                )}
                renderItem={renderProductCard}
                keyExtractor={item => item.id}
                horizontal
                contentContainerStyle={styles.categoryCardList}
                showsHorizontalScrollIndicator={false}
              />
            </View>
          </View>
        ))}
      
      </ScrollView>
      <View style={styles.containerButton}>
      <TouchableOpacity style={styles.floatingButton} onPress={handleAddProduct}>
      <Text style={styles.buttonText}>Add Product</Text>
    </TouchableOpacity>
      </View>
    
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    
  },

  containerScrollView:{

    // marginBottom:50,
  },
  categoryRow: {
    backgroundColor: '#F6F6F6', // Background color for the entire row
    paddingTop: 15, // Vertical padding for the row
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 10, // Vertical margin for the row
    marginHorizontal: 13,
    width:'100%'
  },
  categoryTitleContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingHorizontal: 10,
    marginBottom: 5,
    
  },

  categoryCardList: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
  },
  categoryTitle: {
    textAlign: 'center',
    fontSize: 19,
    color: COLORS.primary,
    marginVertical: 10,
    fontFamily:'Poppins-SemiBold',
  },
  searchBar: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#F6F6F6',
    borderRadius: 20,
    margin: 10,
    paddingHorizontal: 10,
  },
  searchIcon: {
    marginRight: 10,
  },
  searchInput: {
    flex: 1,
    paddingVertical: 10,
    color: COLORS.primary,
    fontFamily:'Poppins-Regular',
    top:2,
  },
  cancelButton: {
    color: COLORS.primary,
    fontFamily:'Poppins-SemiBold',
    right:2,
    top:1.5,
  },
  productCard: {
    width: 150,
    height: 200,
    backgroundColor: 'white',
    borderRadius: 10,
    paddingTop: 0,
    marginHorizontal: 10,
    justifyContent: 'space-between',
    borderWidth:0.5,
    borderColor:'lightgray',
    elevation: 6, 
        shadowColor: 'black', 
        shadowOffset: {
            width: 0,
            height: 2, 
        },
    shadowOpacity: 1, 
    shadowRadius: 15, 
    marginBottom:15,
  },
  swipeIcon: {
    position: 'absolute',
    top: 10,
    right: 10,
  },
  productImageContainer: {
    width: '100%',
    height: '65%',
    borderTopLeftRadius: 10,
    borderTopRightRadius: 10,
    overflow: 'hidden',
  },
  productImage: {
    width: '100%',
    height: '100%',
    borderTopLeftRadius: 10,
    borderTopRightRadius: 10,
  },
  productDetails: {
    alignItems: 'center', 
    flex:1,
    justifyContent:'center'
  },
  productName: {
    color: COLORS.primary,
    textAlign: 'center',
    fontFamily:'Poppins-SemiBold',
    fontSize:13,
  },
  productPrice: {
    color: COLORS.primary,
    textAlign: 'center',
    fontFamily:'Poppins-SemiBold',
    fontSize:10,
  },
  floatingButton: {
    position: 'absolute',
    bottom: 20,
    backgroundColor: COLORS.secondary, 
    borderRadius: 30,
    paddingVertical: 15,
    paddingHorizontal: 40,
    elevation: 5,
    zIndex:3,
  },
  buttonText: {
    color: COLORS.primary,
    fontSize: 17,
    top:1.5,
    fontFamily:'Poppins-SemiBold',
  },
  containerButton:{
    flex:1,
    justifyContent:'center',
    alignItems:'center',
  }
});

export default ProductsScreen;