import React, { useState } from 'react';
import { View, StyleSheet, Text } from 'react-native';
import SearchBar from '../../components/Home/SearchBar';

export default function LivePrices() {
  const [selectedStore, setSelectedStore] = useState('');

  return (
    <View style={styles.container}>
      {/* Store search (Green header, white search bar) */}
      <View style={styles.header}>
      <Text style={{
          fontFamily: 'outfit-bold',
          fontSize: 40,
          paddingBottom:20
        }}>Valitse ensin kauppa jonka tuotteita haluat tarkastella</Text>
        <SearchBar
          placeholder="Hae kauppoja"
          iconName="storefront-outline"
          onChangeText={(text) => setSelectedStore(text)}
          backgroundColor="#FFFFFF"
          borderColor="#4CAF50"
        />
      </View>

      {/* Product search appears only when a store is selected */}
      <View style={styles.content}>
        {selectedStore !== '' && (
          <SearchBar
            placeholder="Hae tuotteita"
            iconName="cart-outline"
            onChangeText={(text) => console.log("Product search:", text)}
            backgroundColor="#FFFFFF"
            borderColor="#FFC107"
          />
        )}
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#F5F5F5',
  },
  header: {
    backgroundColor: '#4CAF50',
    paddingHorizontal: 30,
    paddingVertical: 70,
    justifyContent: 'center',
    alignItems: 'center',
    borderBottomLeftRadius: 90,
    borderBottomRightRadius: 90,
  },
  content: {
    padding: 20,
    flex: 1,
  },
});
