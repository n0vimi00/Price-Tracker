import { View, Text, StyleSheet, TextInput, TouchableOpacity, Alert, BackHandler } from 'react-native';
import React, { useState, useEffect } from 'react';
import Colors from '../../../constants/Colors';
import FontAwesome from '@expo/vector-icons/FontAwesome';
import MaterialIcons from '@expo/vector-icons/MaterialIcons';
import { Picker } from '@react-native-picker/picker';
import { updateDoc, setDoc, doc, deleteField } from 'firebase/firestore';
import { db } from '../../../config/FirebaseConfig';

const capitalizeFirstLetter = (string) => {
  return string.charAt(0).toUpperCase() + string.slice(1);
};

export default function StoreInfo({ product }) {
  const stores = product?.stores || {};
  const [isEditing, setIsEditing] = useState(false);
  const [editedPrices, setEditedPrices] = useState(stores);
  const [newStore, setNewStore] = useState('');
  const [newPrice, setNewPrice] = useState('');
  const [sortedStoreEntries, setSortedStoreEntries] = useState([]);

  useEffect(() => {
    if (!isEditing) {
      setSortedStoreEntries(
        Object.entries(editedPrices).sort((a, b) => parseFloat(a[1]) - parseFloat(b[1]))
      );
    }
  }, [editedPrices, isEditing]);

  useEffect(() => {
    const backAction = () => {
      if (isEditing) {
        setIsEditing(false);
        return true;
      }
      return false;
    };
    const backHandler = BackHandler.addEventListener('hardwareBackPress', backAction);
    return () => backHandler.remove();
  }, [isEditing]);

  const handlePriceChange = (store, newPrice) => {
    setEditedPrices((prevPrices) => ({
      ...prevPrices,
      [store]: newPrice,
    }));
  };

  const handleStoreChange = (newStore) => {
    setNewStore(newStore);
  };

  const toggleEditing = async () => {
    if (isEditing) {
      try {
        const productRef = doc(db, "products", product.id);
        // Include the new store data if provided
        let updatedStores = { ...editedPrices };
        if (newStore && newPrice) {
          updatedStores[newStore] = newPrice;
          setNewStore('');
          setNewPrice('');
        }
        await setDoc(productRef, { stores: updatedStores }, { merge: true });
        // Update the local state with the new data
        setEditedPrices(updatedStores);
      } catch (error) {
        console.error("Error updating store info: ", error);
        Alert.alert("Virhe", "Tallennus epäonnistui.");
      }
    }

    setIsEditing((prev) => !prev);
  };


  const handleRemoveStore = (store) => {
    Alert.alert(
      "Poistetaanko kauppatiedot?",
      "Kauppa ja hinta poistetaan tietokannasta",
      [
        {
          text: "Peruuta",
        },
        {
          text: "Poista",
          onPress: async () => {
            try {
              const productRef = doc(db, "products", product.id);
              // Remove the store data from the database
              await updateDoc(productRef, {
                [`stores.${store}`]: deleteField()
              });
              // Update local state to remove the store from the screen
              setEditedPrices((prevPrices) => {
                const updatedPrices = { ...prevPrices };
                delete updatedPrices[store];
                return updatedPrices;
              });
              setIsEditing(false);

            } catch (error) {
              console.error("Error deleting store data: ", error);
              Alert.alert("Virhe", "Tietojen poistaminen epäonnistui.");
            }
          }
        }
      ]
    );
  };

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
                  value={String(editedPrices[store])}
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
        <Text>Ei hintatietoja saatavilla</Text>
      )}

      {/* Add new store input fields */}
      {isEditing && (
        <View style={styles.addStoreRow}>
          <Picker
            selectedValue={newStore}
            onValueChange={handleStoreChange}
            style={styles.picker}
          >
            <Picker.Item label="Valitse kauppa" value="" />
            <Picker.Item label="Prisma" value="prisma" />
            <Picker.Item label="K-city" value="k-city" />
            <Picker.Item label="Lidl" value="lidl" />
            <Picker.Item label="Tokmanni" value="tokmanni" />
          </Picker>
          <TextInput
            style={styles.newStoreInput}
            value={newPrice}
            placeholder="Hinta (€)"
            keyboardType="numeric"
            onChangeText={setNewPrice}
          />
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
  editContainer: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  storePriceInput: {
    fontSize: 20,
    fontFamily: 'outfit-medium',
    color: '#000',
    borderBottomWidth: 1,
    borderColor: '#ccc',
    minWidth: 60,
    textAlign: 'center',
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
  storePrice: {
    fontSize: 20,
    fontFamily: 'outfit-medium',
    color: '#000',
  },
  addStoreRow: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingVertical: 10,
    marginTop: 10,
  },
  picker: {
    flex: 1,
    marginRight: 60,
    minWidth: 70,
  },
  newStoreInput: {
    fontSize: 16,
    fontFamily: 'outfit',
    borderBottomWidth: 1,
    borderColor: '#ccc',
    flex: 1,
    marginHorizontal: 5,
    maxWidth: 60,
    textAlign: 'center',
    marginRight: 40
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
});
