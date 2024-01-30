import React, { useState } from 'react';
import {
  View,
  Text,
  TouchableOpacity,
  StyleSheet,
  ScrollView,
} from 'react-native';
import Ionic from 'react-native-vector-icons/Ionicons';
import { COLORS } from '../assets/theme/index.js';
import { useNavigation } from '@react-navigation/native';
import { SafeAreaView } from 'react-native-safe-area-context';
import ThemeModal from '../components/ThemeModal.jsx';

const SettingsScreen = () => {
  const navigation = useNavigation();
  const [isThemeModalVisible, setThemeModalVisible] = useState(false);
  const [isCurrencyModalVisible, setCurrencyModalVisible] = useState(false);
  const [isNotificationModalVisible, setNotificationModalVisible] = useState(false);
  const toggleThemeModal = () => {
    setThemeModalVisible(!isThemeModalVisible);
  };

  const toggleCurrencyModal = () => {
    setCurrencyModalVisible(!isCurrencyModalVisible);
  };

  const toggleNotificationModal = () => {
    setNotificationModalVisible(!isNotificationModalVisible);
  };

  return (
    <SafeAreaView style={styles.headContainer}>
      <View style={styles.header}>
        <TouchableOpacity
          style={styles.arrowBackIcon}
          onPress={() => navigation.navigate('Home')}
        >
          <Ionic size={22} color={COLORS.primary} name="chevron-back-outline" />
        </TouchableOpacity>
        <Text style={styles.settingsText}>Settings</Text>
      </View>
      <ScrollView
        style={{ marginHorizontal: 15, marginTop: 20, marginBottom: 20 }}
      >
        <View style={styles.settingsSection}>
          <View style={{ marginBottom: 10 }}>
            <Text style={styles.accountText}>Account</Text>
          </View>
          <TouchableOpacity
            style={styles.optionContainer}
            onPress={() => navigation.navigate('Profile')}
          >
            <Ionic style={styles.optionIcon} size={22} color={COLORS.primary} name="person-outline" />
            <Text style={styles.optionText}>Edit Profile</Text>
          </TouchableOpacity>
          <TouchableOpacity style={styles.optionContainer} onPress={toggleThemeModal}>
            <Ionic style={styles.optionIcon} size={22} color={COLORS.primary} name="shield-half-outline" />
            <Text style={styles.optionText}>Theme</Text>
          </TouchableOpacity>
          <TouchableOpacity style={styles.optionContainer} onPress={toggleCurrencyModal}>
            <Ionic style={styles.optionIcon} size={22} color={COLORS.primary} name="card-outline" />
            <Text style={styles.optionText}>Currency</Text>
          </TouchableOpacity>
          <TouchableOpacity style={styles.optionContainer}onPress={toggleNotificationModal}>
            <Ionic style={styles.optionIcon} size={22} color={COLORS.primary} name="notifications-outline" />
            <Text style={styles.optionText}>Notifications</Text>
          </TouchableOpacity>
          <View style={styles.optionContainer}>
            <Ionic style={styles.optionIcon} size={22} color={COLORS.primary} name="lock-closed-outline" />
            <Text style={styles.optionText}>Privacy</Text>
          </View>
        </View>
        <View style={styles.settingsSection}>
        <View style={{marginBottom:10}}>
            <Text style={styles.accountText}>Customize</Text>
        </View>
        <View style={styles.optionContainer}>
            <Ionic style={styles.optionIcon}  size={23} color={COLORS.primary} name ='card-outline'/>
            <Text style={styles.optionText}>Currency</Text>
        </View>
        <View style={styles.optionContainer}>
            <Ionic style={styles.optionIcon}  size={22} color={COLORS.primary} name ='print'/>
            <Text style={styles.optionText}>Printer Settings</Text>
        </View>
        <View style={styles.optionContainer}>
            <Ionic style={styles.optionIcon}  size={22} color={COLORS.primary} name ='business-outline'/>
            <Text style={styles.optionText}>Business Settings</Text>
        </View>
        <View style={styles.optionContainer}>
            <Ionic style={styles.optionIcon}  size={22} color={COLORS.primary} name ='newspaper-outline'/>
            <Text style={styles.optionText}>Printed Bill</Text>
        </View>
        </View>

        <View style={styles.settingsSection}>
        <View style={{marginBottom:10}}>
            <Text style={styles.accountText}>Support</Text>
        </View>
        <View style={styles.optionContainer}>
            <Ionic style={styles.optionIcon}  size={23} color={COLORS.primary} name ='send-outline'/>
            <Text style={styles.optionText}>Send Feedback</Text>
        </View>
        <View style={styles.optionContainer}>
            <Ionic style={styles.optionIcon}  size={22} color={COLORS.primary} name ='star-half-outline'/>
            <Text style={styles.optionText}>Rate the App</Text>
        </View>
        <View style={styles.optionContainer}>
            <Ionic style={styles.optionIcon}  size={22} color={COLORS.primary} name ='share-social-outline'/>
            <Text style={styles.optionText}>Share</Text>
        </View>
        </View>
        
        {/* <View style={styles.settingsSection}>
        <View style={{marginBottom:10}}>
            <Text style={styles.accountText}>About</Text>
        </View>
        <View style={styles.optionContainer}>
            <Ionic style={styles.optionIcon}  size={23} color={COLORS.primary} name ='information-circle-outline'/>
            <Text style={styles.optionText}>FAQs</Text>
        </View>
        <View style={styles.optionContainer}>
            <Ionic style={styles.optionIcon}  size={22} color={COLORS.primary} name ='bag-handle-sharp'/>
            <Text style={styles.optionText}>Help & Support</Text>
        </View>
        <View style={styles.optionContainer}>
            <Ionic style={styles.optionIcon}  size={22} color={COLORS.primary} name ='receipt-outline'/>
            <Text style={styles.optionText}>Terms and Policies</Text>
        </View>
        </View>
        <View style={styles.settingsSection}>
        <View style={{marginBottom:10}}>
            <Text style={styles.accountText}>Actions</Text>
        </View>
        <View style={styles.optionContainer}>
            <Ionic style={styles.optionIcon}  size={22} color={COLORS.primary} name ='flag-outline'/>
            <Text style={styles.optionText}>Report a problem</Text>
        </View>
        <View style={styles.optionContainer}>
            <Ionic style={styles.optionIcon}  size={22} color={COLORS.primary} name ='person-add-outline'/>
            <Text style={styles.optionText}>Add Account</Text>
        </View>
        <View style={styles.optionContainer}>
            <Ionic style={styles.optionIcon}  size={22} color={COLORS.primary} name ='mail-open-sharp'/>
            <Text style={styles.optionText}>Suggestions</Text>
        </View>
        <View style={styles.optionContainer}>
            <Ionic style={styles.optionIcon}  size={22} color={COLORS.primary} name ='log-out-outline'/>
            <Text style={styles.optionText} >Logout</Text>
        </View>
        </View> */}
        {/* Add other sections and options here as needed */}

        <ThemeModal visible={isThemeModalVisible} onClose={toggleThemeModal} type="theme" />
        <ThemeModal visible={isCurrencyModalVisible} onClose={toggleCurrencyModal} type="currency" />
        <ThemeModal visible={isNotificationModalVisible} onClose={toggleNotificationModal} type="notifications" />
      </ScrollView>
    </SafeAreaView>
  );
};

export default SettingsScreen;

const styles = StyleSheet.create({
  headContainer: {
    flex: 1,
    backgroundColor: 'white',
  },
  header: {
    marginTop: 25,
    marginBottom: 5,
    flex: 0,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
  },
  settingsText: {
    fontSize: 21,
    color: COLORS.primary,
    fontFamily: 'Poppins-Medium',
    top: 1,
  },
  arrowBackIcon: {
    position: 'absolute',
    left: 8,
  },
  accountText: {
    fontSize: 16.5,
    color: COLORS.primary,
    fontFamily: 'Poppins-Medium',
  },
  optionContainer: {
    paddingHorizontal: 12,
    flex: 0,
    flexDirection: 'row',
    paddingVertical: 8,
    backgroundColor: 'rgba(180, 180, 180,0.124)',
  },
  optionText: {
    fontSize: 16,
    fontWeight: '500',
    color: COLORS.primary,
    marginLeft: 50,
    fontFamily: 'Poppins-Medium',
  },
  settingsSection: {
    marginBottom: 13,
  },
});
