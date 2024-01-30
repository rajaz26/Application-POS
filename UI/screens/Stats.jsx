import React, {useState, useRef} from 'react';
import {
  View,
  Text,
  StyleSheet,
  Dimensions,
  ScrollView,
  TextInput,
  TouchableOpacity,
  Keyboard,
} from 'react-native';
import Ionicons from 'react-native-vector-icons/Ionicons';
import PieChartC from '../components/PieChart';
import SalesLineChart from '../components/SalesLineChart';
import TransactionsBarChart from '../components/TransactionsBarChart';
import LineChartProduct from '../components/LineChartProduct';
import {COLORS} from '../assets/theme';

const windowHeight = Dimensions.get('window').height;

const Stats = () => {
  const [searchText, setSearchText] = useState('');
  const searchInputRef = useRef(null);

  const chartComponents = [
    {name: 'Sales Line Chart,Sales graph', component: <SalesLineChart />},
    {name: 'Transactions Bar Chart', component: <TransactionsBarChart />},
    {
      name: 'Pie Chart,Top 5, five ,Five,top,products,Products',
      component: <PieChartC />,
    },
    {
      name: 'Line Chart Product,Products Sales Graph,Select,select,product sale',
      component: <LineChartProduct />,
    },
  ];

  const filteredComponents = chartComponents.filter(component =>
    component.name.toLowerCase().includes(searchText.toLowerCase()),
  );

  const clearSearch = () => {
    setSearchText('');
    searchInputRef.current.focus();
  };

  const handleKeyboardDismiss = () => {
    Keyboard.dismiss();
    clearSearch();
  };

  return (
    <ScrollView contentContainerStyle={styles.container}>
      <View style={styles.searchBar}>
        <View style={styles.searchContainer}>
          <Ionicons name="search" size={24} color={COLORS.primary} />
          <TextInput
            ref={searchInputRef}
            style={styles.searchInput}
            placeholder="Search here"
            placeholderTextColor={COLORS.primary}
            value={searchText}
            onChangeText={text => setSearchText(text)}
          />
          {searchText !== '' && (
            <TouchableOpacity onPress={clearSearch} style={styles.clearButton}>
              <Ionicons
                name="close-circle-outline"
                size={24}
                color={COLORS.primary}
              />
            </TouchableOpacity>
          )}
        </View>
      </View>
      {filteredComponents.map((component, index) => (
        <View
          key={index}
          style={[styles.chartContainer, {marginTop: index === 0 ? 20 : 0}]}>
          {component.component}
        </View>
      ))}
      {searchText !== '' && (
        <TouchableOpacity
          style={styles.closeButton}
          onPress={handleKeyboardDismiss}>
          <Text style={styles.closeButtonText}>Close</Text>
        </TouchableOpacity>
      )}
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    flexGrow: 1,
    alignItems: 'center',
    justifyContent: 'flex-start',
    paddingHorizontal: 20,
    paddingTop: 10,
  },
  chartContainer: {
    width: '100%',
  },
  searchBar: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    borderWidth: 2,
    borderColor: COLORS.primary,
    borderRadius: 20,
    marginBottom: 10,
    paddingHorizontal: 10,
    paddingVertical: 5,
  },
  searchContainer: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  searchInput: {
    flex: 1,
    fontSize: 15,
    top:2,
    color: COLORS.primary,
    paddingHorizontal: 10,
    width: '100%',
    fontFamily:'Poppins-Regular'
  },
  clearButton: {
    padding: 10, // Increase the padding to make the touchable area larger
  },
  closeButton: {
    position: 'absolute',
    bottom: 20,
    right: 20,
    backgroundColor: COLORS.primary,
    borderRadius: 5,
    paddingVertical: 8,
    paddingHorizontal: 12,
  },
  closeButtonText: {
    color: 'white',
    fontWeight: 'bold',
  },
});

export default Stats;