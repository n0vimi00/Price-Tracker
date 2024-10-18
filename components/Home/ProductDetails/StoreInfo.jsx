import { View, Text, StyleSheet, TextInput, TouchableOpacity, Alert, BackHandler } from 'react-native';
import React, { useState, useEffect } from 'react';
import Colors from '../../../constants/Colors';
import FontAwesome from '@expo/vector-icons/FontAwesome';
import MaterialIcons from '@expo/vector-icons/MaterialIcons';

const capitalizeFirstLetter = (string) => {
  return string.charAt(0).toUpperCase() + string.slice(1);
};

export default function StoreInfo({ product }) {
  const stores = product?.stores || {};
  const [isEditing, setIsEditing] = useState(false);
  const [editedPrices, setEditedPrices] = useState(stores);
  const [newStore, setNewStore] = useState('');
  const [newPrice, setNewPrice] = useState('');

  // State to hold sorted prices
  const [sortedStoreEntries, setSortedStoreEntries] = useState([]);

  // Update sorted store entries whenever editedPrices changes and not in editing mode
  useEffect(() => {
    if (!isEditing) {
      setSortedStoreEntries(
        Object.entries(editedPrices).sort((a, b) => parseFloat(a[1]) - parseFloat(b[1]))
      );
    }
  }, [editedPrices, isEditing]);

  // Handle edit button press
  const toggleEditing = () => {
    setIsEditing(prev => {
      // If exiting editing mode, update the sorted store entries
      if (prev) {
        setSortedStoreEntries(
          Object.entries(editedPrices).sort((a, b) => parseFloat(a[1]) - parseFloat(b[1]))
        );
      }
      return !prev;
    });
  };

  // Handle price input change
  const handlePriceChange = (store, newPrice) => {
    setEditedPrices(prevPrices => ({
      ...prevPrices,
      [store]: newPrice,
    }));
  };

  // Handle adding a new store
  const handleAddNewStore = () => {
    if (!newStore || !newPrice) {
      Alert.alert("Please enter both store name and price.");
      return;
    }
    setEditedPrices(prevPrices => ({
      ...prevPrices,
      [newStore]: newPrice,
    }));
    setNewStore('');
    setNewPrice('');
  };

  // Handle removing a store
  const handleRemoveStore = (store) => {
    setEditedPrices(prevPrices => {
      const updatedPrices = { ...prevPrices };
      delete updatedPrices[store];
      return updatedPrices;
    });
  };

  // Handle back button press to exit edit mode
  useEffect(() => {
    const backAction = () => {
      if (isEditing) {
        setIsEditing(false); // Exit edit mode
        return true; // Prevent default back action (exit screen)
      }
      return false; // Allow default back action (exit screen)
    };

    const backHandler = BackHandler.addEventListener('hardwareBackPress', backAction);

    return () => backHandler.remove();
  }, [isEditing]);

  return (
    <View style={styles.container}>
      {sortedStoreEntries.length > 0 ? (
        sortedStoreEntries.map(([store, price], index) => (
          <View key={index} style={styles.storeRow}>
            <Text
              style={{
                fontSize: 20,
                fontFamily: 'outfit-medium',
                flex: 1,
                color: Colors.storeColors[store] || '#000',
              }}
            >
              {capitalizeFirstLetter(store)}:
            </Text>

            {isEditing ? (
              <View style={styles.editContainer}>
                <TextInput
                  style={styles.storePriceInput}
                  value={String(price)}
                  keyboardType="numeric"
                  onChangeText={(newPrice) => handlePriceChange(store, newPrice)}
                />
                <TouchableOpacity style={styles.removeButton} onPress={() => handleRemoveStore(store)}>
                  <FontAwesome name="trash" size={20} color="white" />
                </TouchableOpacity>
              </View>
            ) : (
              <Text style={styles.storePrice}>{`${price}€`}</Text>
            )}
          </View>
        ))
      ) : (
        <Text>No prices available</Text>
      )}

      {/* Add new store input fields */}
      {isEditing && (
        <View style={styles.addStoreRow}>
          <TextInput
            style={styles.newStoreInput}
            value={newStore}
            placeholder="Store Name"
            onChangeText={setNewStore}
          />
          <TextInput
            style={styles.newStoreInput}
            value={newPrice}
            placeholder="Price"
            keyboardType="numeric"
            onChangeText={setNewPrice}
          />
          <TouchableOpacity style={styles.addButton} onPress={handleAddNewStore}>
            <FontAwesome name="plus" size={30} color="white" />
          </TouchableOpacity>
        </View>
      )}

      <View style={styles.buttonRow}>
        {!isEditing && (
          <TouchableOpacity style={styles.button} onPress={toggleEditing}>
            <MaterialIcons name="edit" size={30} color="white" />
          </TouchableOpacity>
        )}
        {isEditing && (
          <TouchableOpacity style={styles.button} onPress={toggleEditing}>
            <FontAwesome name="save" size={30} color="white" />
          </TouchableOpacity>
        )}
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    padding: 35,
  },
  storeRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingVertical: 5,
    margin: 10,
  },
  storePrice: {
    fontSize: 20,
    fontFamily: 'outfit-medium',
    color: '#000',
  },
  storePriceInput: {
    fontSize: 20,
    fontFamily: 'outfit-medium',
    color: '#000',
    borderBottomWidth: 1,
    borderColor: '#ccc',
    minWidth: 60,
    textAlign: 'right',
  },
  addStoreRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingVertical: 10,
    marginTop: 20,
  },
  newStoreInput: {
    fontSize: 16,
    fontFamily: 'outfit',
    borderBottomWidth: 1,
    borderColor: '#ccc',
    flex: 1,
    marginHorizontal: 5,
  },
  buttonRow: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    alignItems: 'center',
    paddingVertical: 10,
  },
  button: {
    backgroundColor: Colors.primary,
    padding: 15,
    paddingLeft: 30,
    paddingRight: 30,
    borderRadius: 5,
    borderColor: Colors.secondary,
    borderWidth: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  addButton: {
    backgroundColor: Colors.primary,
    padding: 10,
    borderRadius: 5,
    borderColor: Colors.secondary,
    borderWidth: 1,
    justifyContent: 'center',
    alignItems: 'center',
    marginLeft: 10,
  },
  removeButton: {
    backgroundColor: 'red',
    padding: 5,
    borderRadius: 5,
    borderColor: Colors.secondary,
    borderWidth: 1,
    justifyContent: 'center',
    alignItems: 'center',
    marginLeft: 10,
  },
  editContainer: {
    flexDirection: 'row',
    alignItems: 'center',
  },
});
