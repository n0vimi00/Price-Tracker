import { View, Text, StyleSheet, Image, TouchableOpacity, ToastAndroid } from 'react-native'
import React, { useEffect, useState } from 'react'
import { useNavigation } from 'expo-router'
import { TextInput } from 'react-native';
import FontAwesome from '@expo/vector-icons/FontAwesome';
import Colors from '../../constants/Colors';
import { Picker } from '@react-native-picker/picker';
import { setDoc, doc } from 'firebase/firestore';
import { db } from '../../config/FirebaseConfig';

export default function AddNewProduct() {
    const navigation = useNavigation();
    const [productName, setProductName] = useState({});
    const [stores, setStores] = useState([{ store: '', price: '' }]);
    const [image, setImage] = useState('');

    useEffect(() => {
        navigation.setOptions({
            headerTitle: 'Lisää uusi tuote'
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

    const onSubmit = async () => {
        const submissionData = {
            ...productName,
            stores,
            imageURL: image,
        };
        if (!productName.name) {
            ToastAndroid.show('Lisää tuotteen nimi', ToastAndroid.SHORT);
            return;
        }
        try {
            await SaveFormData(submissionData);
            ToastAndroid.show('Tuote tallennettu onnistuneesti', ToastAndroid.SHORT);
            navigation.goBack()
        } catch (error) {
            console.error('Error saving data:', error);
            ToastAndroid.show('Tallennus epäonnistui', ToastAndroid.SHORT);
        }
    };

    const SaveFormData = async (submissionData) => {
        const docId = Date.now().toString();
        // Transform stores array into a map
        const storesMap = submissionData.stores.reduce((map, store) => {
            if (store.store && store.price) {
                map[store.store] = parseFloat(store.price);
            }
            return map;
        }, {});
        try {
            await setDoc(doc(db, 'products', docId), {
                ...submissionData,
                stores: storesMap,
            });
            console.log('Data successfully saved to Firestore');
        } catch (error) {
            console.error('Error saving data to Firestore:', error);
            throw error;
        }
    };

    return (
        <View style={{ padding: 20 }}>
            <View style={styles.imageContainer}>
                {image ? (
                    <Image source={{ uri: image }} style={styles.image} />
                ) : (
                    <Image
                        source={require('./../../assets/images/placeholder.jpeg')}
                        style={styles.image}
                    />
                )}
            </View>
            <View style={{ alignSelf: 'center', marginTop: -25, marginBottom: 20 }}>
                <TextInput
                    style={[styles.input, { width: '70%' }]}
                    placeholder="Syötä kuvan URL"
                    value={image}
                    onChangeText={(value) => setImage(value)}
                />
            </View>
            <View style={styles.inputContainer}>
                <Text style={styles.label}>Tuotteen nimi *</Text>
                <TextInput
                    style={styles.input}
                    onChangeText={(value) => setProductName({ ...productName, name: value })}
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
                            <Picker.Item label="Prisma" value="prisma" />
                            <Picker.Item label="K-city" value="k-city" />
                            <Picker.Item label="Lidl" value="lidl" />
                            <Picker.Item label="Tokmanni" value="tokmanni" />
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
        marginTop: 20
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
