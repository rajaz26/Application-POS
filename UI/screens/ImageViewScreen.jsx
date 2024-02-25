// Import React and necessary components from React Native
import React, { useState, useEffect } from 'react';
import { View, Image, StyleSheet, Button, Alert } from 'react-native';
import RNFetchBlob from 'rn-fetch-blob';

const ImageViewScreen = ({ route, navigation }) => {
  const { imageUri } = route.params;
  const [base64Image, setBase64Image] = useState('');

  useEffect(() => {
    convertImageToBase64(imageUri);
  }, [imageUri]);

  const convertImageToBase64 = (uri) => {
    RNFetchBlob.fs.readFile(uri, 'base64')
      .then(data => {
        setBase64Image(data);
      })
      .catch(error => {
        console.error(error);
        Alert.alert('Error', 'Failed to convert image');
      });
  };

  const navigateToBluetoothScreen = () => {
    navigation.navigate('BluetoothConnectivity', { printingImage: base64Image });
  };

  return (
    <View style={styles.container}>
      <Image source={{ uri: imageUri }} style={styles.image} resizeMode="contain" />
      <Button title="Print Image via Bluetooth" onPress={navigateToBluetoothScreen} />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'white',
  },
  image: {
    width: '100%',
    height: '100%',
  },
});

export default ImageViewScreen;
