// import React, {useState} from 'react';
// import {
//   View,
//   ScrollView,
//   Text,
//   Image,
//   TouchableOpacity,
//   StyleSheet,
// } from 'react-native';
// import Ionicons from 'react-native-vector-icons/Ionicons';
// import {COLORS} from '../assets/theme';

// const Product = ({route}) => {
//   const product = route.params.item;
//   const [descriptionOpen, setDescriptionOpen] = useState(false);
//   const [selectedImageIndex, setSelectedImageIndex] = useState(0);

//   const toggleDescription = () => {
//     setDescriptionOpen(!descriptionOpen);
//   };

//   const getImageSource = imageName => {
//     switch (imageName) {
//       case '1':
//         return require('../assets/images/nike-shoes/55.png');
//       case '2':
//         return require('../assets/images/nike-shoes/66.png');
//       case '3':
//         return require('../assets/images/nike-shoes/77.png');
//       case '4':
//         return require('../assets/images/nike-shoes/88.png');
//       default:
//         return null;
//     }
//   };

//   const miniImageNames = ['1', '2', '3', '4'];

//   const handleMiniImagePress = index => {
//     setSelectedImageIndex(index);
//   };

//   return (
//     <View style={styles.container}>
//       <View style={styles.carouselContainer}>
//         <Image
//           source={getImageSource(miniImageNames[selectedImageIndex])}
//           style={styles.productImage}
//           resizeMode="cover"
//         />
//         <View style={styles.carouselButtons}>
//           <TouchableOpacity
//             onPress={() =>
//               setSelectedImageIndex(
//                 (selectedImageIndex - 1 + miniImageNames.length) %
//                   miniImageNames.length,
//               )
//             }>
//             <Ionicons name="chevron-back" size={30} color={COLORS.primary} />
//           </TouchableOpacity>
//           <TouchableOpacity
//             onPress={() =>
//               setSelectedImageIndex(
//                 (selectedImageIndex + 1) % miniImageNames.length,
//               )
//             }>
//             <Ionicons name="chevron-forward" size={30} color={COLORS.primary} />
//           </TouchableOpacity>
//         </View>
//       </View>
//       <View style={styles.productCard}>
//         <Text style={styles.productName}>{product.name}</Text>
//         <Text style={styles.productPrice}>{product.price}</Text>
//         <Text style={styles.productDescription}>{product.description}</Text>
//         <View style={styles.miniImageRow}>
//           {miniImageNames.map((imageName, index) => (
//             <TouchableOpacity
//               key={index}
//               onPress={() => handleMiniImagePress(index)}>
//               <Image
//                 source={getImageSource(imageName)}
//                 style={styles.miniImage}
//                 resizeMode="cover"
//               />
//             </TouchableOpacity>
//           ))}
//         </View>

//         <Text style={styles.productBrand}>{product.brand + '...'}</Text>
//         <View style={styles.editButtonContainer}>
//           <TouchableOpacity style={styles.editButton}>
//             <Text style={styles.editButtonText}>Edit Product</Text>
//           </TouchableOpacity>
//         </View>
//       </View>
//     </View>
//   );
// };

// const styles = StyleSheet.create({
//   container: {
//     flex: 1,
//     backgroundColor: 'black', // Change background color as desired
//   },
//   carouselContainer: {
//     height: 300,
//     alignItems: 'center',
//     justifyContent: 'center',
//     position: 'relative',
//   },
//   productImage: {
//     width: '100%',
//     height: '100%',
//   },
//   carouselButtons: {
//     flexDirection: 'row',
//     justifyContent: 'space-between',
//     alignItems: 'center',
//     width: '100%',
//     paddingHorizontal: 20,
//     position: 'absolute',
//     top: '40%',
//   },
//   productCard: {
//     backgroundColor: '#fff',
//     paddingHorizontal: 20,
//     paddingVertical: 20,
//     borderTopLeftRadius: 30,
//     borderTopRightRadius: 30,
//     marginTop: -30,
//     marginBottom: 20,
//     flex: 1, // Extend card to the bottom of the screen
//   },
//   productName: {
//     fontSize: 24,
//     fontWeight: 'bold',
//     color: COLORS.primary,
//     marginBottom: 5,
//   },
//   productBrand: {
//     fontSize: 16,
//     color: COLORS.primary,
//     marginBottom: 10,
//   },
//   productPrice: {
//     fontSize: 20,
//     color: COLORS.primary,
//     marginBottom: 10,
//   },
//   productDescription: {
//     fontSize: 13.6,
//     color: COLORS.primary,
//     marginVertical: 30,
//   },
//   miniImageRow: {
//     flexDirection: 'row',
//     justifyContent: 'center',
//     alignItems: 'center',
//     marginBottom: 15,
//   },
//   miniImage: {
//     width: 50,
//     height: 50,
//     marginHorizontal: 5,
//   },
//   editButtonContainer: {
//     position: 'absolute',
//     bottom: 20, // Margin from the bottom
//     left: 20, // Margin from the left
//     right: 20, // Margin from the right
//   },
//   editButton: {
//     backgroundColor: COLORS.secondary,
//     borderRadius: 30,
//     paddingVertical: 12,
//     alignItems: 'center',
//   },
//   editButtonText: {
//     color: COLORS.primary,
//     fontWeight: 'bold',
//     fontSize: 18,
//   },
// });

// export default Product;
import React, {useState} from 'react';
import {
  View,
  ScrollView,
  Text,
  Image,
  TouchableOpacity,
  StyleSheet,
} from 'react-native';
import Ionicons from 'react-native-vector-icons/Ionicons';
import {COLORS} from '../assets/theme';

const Product = ({route}) => {
  const product = route.params.item;
  const [descriptionOpen, setDescriptionOpen] = useState(false);
  const [selectedImageIndex, setSelectedImageIndex] = useState(0);

  const toggleDescription = () => {
    setDescriptionOpen(!descriptionOpen);
  };

  const getImageSource = imageName => {
    switch (imageName) {
      case '1':
        return require('../assets/images/nike-shoes/55.png');
      case '2':
        return require('../assets/images/nike-shoes/66.png');
      case '3':
        return require('../assets/images/nike-shoes/77.png');
      case '4':
        return require('../assets/images/nike-shoes/88.png');
      default:
        return null;
    }
  };

  const miniImageNames = ['1', '2', '3', '4'];

  const handleMiniImagePress = index => {
    setSelectedImageIndex(index);
  };

  return (
    <View style={styles.container}>
      <View style={styles.carouselContainer}>
        <Image
          source={getImageSource(miniImageNames[selectedImageIndex])}
          style={styles.productImage}
          resizeMode="cover"
        />
        
      </View>
      <View style={styles.productCard}>
        <Text style={styles.productName}>{product.name}</Text>
        <Text style={styles.productPrice}>{product.price}</Text>
        <Text style={styles.productDescription}>{product.description}</Text>
        <View style={styles.miniImageRow}>
          {miniImageNames.map((imageName, index) => (
            <TouchableOpacity
              key={index}
              onPress={() => handleMiniImagePress(index)}>
              <Image
                source={getImageSource(imageName)}
                style={styles.miniImage}
                resizeMode="cover"
              />
            </TouchableOpacity>
          ))}
        </View>

        <Text style={styles.productBrand}>{product.brand + '...'}</Text>
        <View style={styles.editButtonContainer}>
          <TouchableOpacity style={styles.editButton}>
            <Text style={styles.editButtonText}>Edit Product</Text>
          </TouchableOpacity>
        </View>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: 'black', // Change background color as desired
  },
  carouselContainer: {
    height: 300,
    alignItems: 'center',
    justifyContent: 'center',
    position: 'relative',
  },
  productImage: {
    width: '100%',
    height: '100%',
  },
  carouselButtons: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    width: '100%',
    paddingHorizontal: 20,
    position: 'absolute',
    top: '40%',
  },
  productCard: {
    backgroundColor: '#fff',
    paddingHorizontal: 20,
    paddingVertical: 20,
    borderTopLeftRadius: 30,
    borderTopRightRadius: 30,
    marginTop: -30,
    marginBottom: 20,
    flex: 1, // Extend card to the bottom of the screen
  },
  productName: {
    fontSize: 23,
    color: COLORS.primary,
    marginBottom: 5,
    fontFamily:'Poppins-SemiBold'
  },
  productBrand: {
    fontSize: 16,
    color: COLORS.primary,
    marginBottom: 10,
  },
  productPrice: {
    fontSize: 20,
    color: COLORS.primary,
    marginBottom: 10,
    fontFamily:'Poppins-Regular'
  },
  productDescription: {
    fontSize: 13.6,
    color: COLORS.primary,
    marginVertical: 30,
  },
  miniImageRow:{
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: 15,
  },
  miniImage: {
    width: 50,
    height: 50,
    marginHorizontal: 5,
  },
  editButtonContainer: {
    position: 'absolute',
    bottom: 20, // Margin from the bottom
    left: 20, // Margin from the left
    right: 20, // Margin from the right
  },
  editButton: {
    backgroundColor: COLORS.secondary,
    borderRadius: 30,
    paddingVertical: 12,
    alignItems: 'center',
  },
  editButtonText: {
    color: COLORS.primary,
    fontSize: 17,
    top:1,
    fontFamily:'Poppins-SemiBold'
  },
});

export default Product;