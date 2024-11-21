import { View, Text, StyleSheet, Image, TouchableOpacity } from 'react-native'
import React, { useEffect, useState } from 'react'
import { useNavigation } from 'expo-router'
import { TextInput } from 'react-native';
import FontAwesome from '@expo/vector-icons/FontAwesome';
import Colors from '../../constants/Colors';
import { Picker } from '@react-native-picker/picker';

export default function AddNewProduct() {
    const navigation = useNavigation();
    const [formData, setFormData] = useState({});
    const [stores, setStores] = useState([{ store: '', price: '' }]);

    useEffect(() => {
        navigation.setOptions({
            headerTitle: 'Lisaa uusi tuote'
        })
    }, [])

    const handleStoreChange = (index, key, value) => {
        setStores(prevStores => {
            const updatedStores = [...prevStores];
            updatedStores[index][key] = value;
            return updatedStores;
        });
    };

    const addStoreRow = () => {
        setStores([...stores, { store: '', price: '' }]);
    };

    const onSubmit = () => {
        const submissionData = {
            ...formData,
            stores, 
        };
        console.log(submissionData);
    };

    return (
        <View style={{ padding: 20 }}>
            <View style={styles.imageContainer}>
                <Image
                    source={require('./../../assets/images/placeholder.jpeg')}
                    style={styles.image}
                />
                <View style={styles.textContainer}>
                    <Text style={styles.placeholderText}>Lisaa kuva</Text>
                </View>
            </View>
            <View style={styles.inputContainer}>
                <Text style={styles.label}>Tuotteen nimi *</Text>
                <TextInput
                    style={styles.input}
                    onChangeText={(value) => setFormData({ ...formData, name: value })}
                />
            </View>
            {stores.map((storeItem, index) => (
                <View key={index} style={[styles.inputContainer, styles.rowContainer]}>
                    <View style={styles.storeContainer}>
                        <Text style={styles.label}>Kauppa</Text>
                        <Picker
                            selectedValue={storeItem.store}
                            onValueChange={(value) => handleStoreChange(index, 'store', value)}
                            style={styles.picker}
                        >
                            <Picker.Item label="Valitse kauppa" value="" />
                            <Picker.Item label="Prisma" value="Prisma" />
                            <Picker.Item label="K-city" value="K-city" />
                            <Picker.Item label="Lidl" value="Lidl" />
                            <Picker.Item label="Tokmanni" value="Tokmanni" />
                        </Picker>
                    </View>
                    <View style={styles.priceContainer}>
                        <Text style={styles.label}>Hinta (€)</Text>
                        <TextInput
                            style={styles.input}
                            keyboardType="numeric"
                            placeholder="0,00"
                            value={storeItem.price}
                            onChangeText={(value) => handleStoreChange(index, 'price', value)}
                        />
                    </View>
                </View>
            ))}
            <TouchableOpacity style={styles.addButton} onPress={addStoreRow}>
                <FontAwesome name="plus" size={20} color="white" />
                <Text style={styles.addButtonText}>Lisää kauppa</Text>
            </TouchableOpacity>
            <View style={styles.buttonRow}>
                <TouchableOpacity style={styles.button} onPress={onSubmit}>
                    <FontAwesome name="save" size={30} color="white" />
                </TouchableOpacity>
            </View>
        </View>
    );
}

const styles = StyleSheet.create({
    imageContainer: {
        width: 200,
        height: 200,
        alignSelf: 'center',
        marginBottom: 20
    },
    image: {
        width: '100%',
        height: '100%',
        borderWidth: 2,
        borderColor: '#ccc',
        borderRadius: 15
    },
    textContainer: {
        position: 'absolute',
        top: 0,
        left: 0,
        right: 0,
        bottom: 0,
        justifyContent: 'center',
        alignItems: 'center',
    },
    placeholderText: {
        fontSize: 18,
        color: '#595959',
        textAlign: 'center',
        fontFamily: 'outfit'
    },
    inputContainer: {
        marginVertical: 5,
    },
    label: {
        fontSize: 18,
        fontFamily: 'outfit-medium',
        color: '#595959',
    },
    input: {
        fontFamily: 'outfit',
        color: '#000',
        borderBottomWidth: 1,
        borderColor: '#ccc',
        fontSize: 18,
        marginTop: 9
    },
    rowContainer: {
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-between',
        marginTop:20
    },
    storeContainer: {
        flex: 2,
        marginRight: 10,
    },
    priceContainer: {
        flex: 1,
    },
    picker: {
        borderWidth: 1,
        borderColor: '#ccc',
        borderRadius: 5,
        padding: 5,
        height: 40,
        justifyContent: 'center',
    },
    addButton: {
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'center',
        backgroundColor: Colors.primary,
        padding: 10,
        borderRadius: 5,
        marginVertical: 10,
    },
    addButtonText: {
        color: 'white',
        marginLeft: 5,
        fontSize: 16,
        fontFamily: 'outfit-medium'
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
    }
});
