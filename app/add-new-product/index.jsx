import { View, Text, StyleSheet, Image } from 'react-native'
import React, { useEffect } from 'react'
import { useNavigation } from 'expo-router'
import { TextInput } from 'react-native';

export default function AddNewProduct() {
    const navigation=useNavigation();

    useEffect(() =>{
        navigation.setOptions({
            headerTitle:'Lisaa uusi tuote'
        })
    },[])
    return (
        <View style={{padding:20}}>
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
            <TextInput style={styles.input}/>
        </View>
    </View>
    )
}

const styles = StyleSheet.create({
    imageContainer: {
        width: 200,             // Set a specific width for the small rectangle
        height: 200,            // Set a specific height for the small rectangle
        alignSelf:'center',
        marginBottom:20
    },
    image: {
        width: '100%',
        height: '100%',
        borderWidth:2,
        borderColor:'#ccc',
        borderRadius:15
    },
    imageOverlay: {
        ...StyleSheet.absoluteFillObject,
        backgroundColor: 'rgba(0, 0, 0, 0.4)', // Black overlay with 40% opacity
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
        color: '#595959', // White text color to stand out on the black overlay
        textAlign: 'center',
        fontFamily:'outfit'
    },
    inputContainer: {
        marginVertical:5,
    }, 
    label: {
        fontSize:18,
        fontFamily:'outfit-medium',
        color:'#595959',
    },
    input: {
        fontFamily: 'outfit',
        color: '#000',
        borderBottomWidth: 1,
        borderColor: '#ccc',
        minWidth: 60,
        fontSize:18,
        marginTop:9
    }
});