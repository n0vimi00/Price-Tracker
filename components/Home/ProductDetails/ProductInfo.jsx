import { View, Text, Image, StyleSheet, TouchableOpacity, TextInput, Alert, BackHandler } from 'react-native';
import React, { useState, useEffect } from 'react';
import { useNavigation } from 'expo-router';
import placeholderImage from './../../../assets/images/placeholder.jpeg';
import Feather from '@expo/vector-icons/Feather';
import { doc, setDoc } from 'firebase/firestore';
import { db } from '../../../config/FirebaseConfig';

export default function ProductInfo({ product }) {
    const [isEditing, setIsEditing] = useState(false);
    const [editedName, setEditedName] = useState(product.name);
    const [editedImageURL, setEditedImageURL] = useState(product?.imageURL || '');
    const navigation = useNavigation();

    const imageSource = editedImageURL ? { uri: editedImageURL } : placeholderImage;

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

    const toggleEditing = async () => {
        if (isEditing) {
            try {
                const productRef = doc(db, "products", product.id);
                await setDoc(productRef, { name: editedName, imageURL: editedImageURL }, { merge: true });

            } catch (error) {
                console.error("Error updating product: ", error);
                Alert.alert("Virhe", "Tallennus epäonnistui.");
            }
        }
        setIsEditing((prev) => !prev);
    };

    return (
        <View style={styles.container}>
            {/* Custom back button */}
            <View style={styles.backBtnContainer}>
                <TouchableOpacity style={styles.button} onPress={() => navigation.goBack()}>
                    <Feather name="arrow-left" size={24} color="black" />
                </TouchableOpacity>
            </View>

            <View style={styles.imageContainer}>
                {isEditing ? (
                    <View style={styles.deleteContainer}>
                        <TouchableOpacity style={styles.deleteButton} onPress={toggleEditing}>
                            <Text style={{
                                fontFamily: 'outfit',
                                color: 'black'

                            }}>Poista tuote</Text>
                        </TouchableOpacity>
                    </View>
                ) : null}

                <Image source={imageSource} style={styles.image} />
                <View style={styles.imageOverlay} />
                <View style={styles.textContainer}>
                    {isEditing ? (
                        <TextInput
                            style={styles.nameInput}
                            value={editedName}
                            onChangeText={setEditedName}
                            placeholder="Nimi"
                        />
                    ) : (
                        <Text style={styles.productName}>{product?.name}</Text>
                    )}
                </View>
                {isEditing ? (
                    <View style={styles.editContainer}>
                        <TextInput
                            style={styles.imageInput}
                            value={editedImageURL}
                            onChangeText={setEditedImageURL}
                            placeholder="Syotä kuvan URL"
                        />
                    </View>
                ) : null}
                <View style={styles.editBtnContainer}>
                    <TouchableOpacity style={styles.button} onPress={toggleEditing}>
                        <Feather name={isEditing ? "check" : "edit-2"} size={22} color="black" />
                    </TouchableOpacity>
                </View>
            </View>
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        position: 'relative',
    },
    backBtnContainer: {
        position: 'absolute',
        top: 50,
        right: '82%',
        justifyContent: 'flex-start',
        alignItems: 'flex-start',
        zIndex: 100,
    },
    button: {
        padding: 15,
        paddingLeft: 30,
        paddingRight: 30,
        justifyContent: 'center',
        alignItems: 'center',
    },
    imageContainer: {
        position: 'relative',
        width: '100%',
        height: 400,
    },
    image: {
        width: '100%',
        height: '100%',
    },
    imageOverlay: {
        ...StyleSheet.absoluteFillObject,
        backgroundColor: 'rgba(0, 0, 0, 0.4)',
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
    nameInput: {
        fontFamily: 'outfit-bold',
        fontSize: 30,
        color: 'white',
        opacity: 0.8,
        textAlign: 'center',
        borderBottomWidth: 1,
        borderColor: 'rgba(0,0,0,0.3)',
        minWidth: 100,
    },
    productName: {
        fontFamily: 'outfit-bold',
        fontSize: 40,
        color: '#fff',
        textAlign: 'center',
    },
    editContainer: {
        position: 'absolute',
        bottom: 0,
        justifyContent: 'center',
        alignItems: 'center',
    },
    imageInput: {
        fontFamily: 'outfit-regular',
        fontSize: 10,
        color: '#000',
        backgroundColor: 'rgba(255, 255, 255, 0.5)',
        padding: 5,
        textAlign: 'center',
        width: '100%',
        minWidth: '100%'
    },
    editBtnContainer: {
        position: 'absolute',
        top: 50,
        left: '82%',
        justifyContent: 'flex-start',
        alignItems: 'flex-end',
        zIndex: 100,
    },
    deleteContainer: {
        position: 'absolute',
        top: '13%',
        left: 0,
        right: 0,
        justifyContent: 'center',
        alignItems: 'center',
        zIndex: 100,
    },
    deleteButton: {
        padding: 10,
        paddingLeft: 10,
        paddingRight: 10,
        backgroundColor: 'rgba(255, 0, 0, 0.5)',
        borderRadius: 5,
        borderColor: 'black',
        borderWidth: 1,
        justifyContent: 'center',
        alignItems: 'center',
    },
});
