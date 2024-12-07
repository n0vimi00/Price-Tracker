import { Text, View, Image, StyleSheet, TouchableOpacity } from "react-native";
import React, { useState } from 'react';
import Colors from "../../constants/Colors"; 
import { useRouter } from "expo-router";
import useProductStore from "../../app/states/store";
import placeholderImage from './../../assets/images/placeholder.jpeg'; 

const capitalizeFirstLetter = (string) => {
    return string.charAt(0).toUpperCase() + string.slice(1);
};

export default function ProductListItem({ product }) {
    const router = useRouter();
    const { setCurrentProduct } = useProductStore();
    const imageSource = product.imageURL ? { uri: product.imageURL } : placeholderImage;

    // Check if product.stores is defined and is an object
    const storeEntries = product.stores ? Object.entries(product.stores) : [];

    // Sort store entries by price in ascending order
    const sortedStoreEntries = storeEntries.sort((a, b) => a[1] - b[1]);

    return (
        <TouchableOpacity
        onPress={() => {
            setCurrentProduct(product); 
            router.push('/product-details');
          }}
          style={styles.container}
            >
            <View style={styles.imageContainer}>
            <Image source={imageSource} style={styles.image}
                />
                <View style={styles.imageOverlay} />
                {/* Overlay the product name on the bottom-left corner of the image */}
                <View style={styles.overlay}>
                    <Text style={styles.productName}>{product.name}</Text>
                </View>
            </View>

            {/* Stores and prices */}
            <View style={styles.priceContainer}>
                {sortedStoreEntries.length > 0 ? (
                    sortedStoreEntries.map(([store, price], index) => (
                        <View key={index} style={styles.priceRow}>
                            <Text style={{
                                fontSize: 16,
                                fontFamily: 'outfit',
                                color: Colors.storeColors[store] || '#000' // Assign color from Colors file
                            }}>
                                {capitalizeFirstLetter(store)}:  
                            </Text>
                            <Text style={{ fontSize: 18, fontFamily: 'outfit', color: '#000' }}>
                                {`${price}€`}
                            </Text>
                        </View>
                    ))
                ) : (
                    <Text style={{ fontSize: 16, color: '#000' }}>
                        Ei hintoja saatavilla
                    </Text>
                )}
            </View>
        </TouchableOpacity>
    );
}

const styles = StyleSheet.create({
    container: {
        backgroundColor: '#fff',
        borderRadius: 10,
        margin: 11,
        overflow: 'hidden', 
        width: 165,
        elevation: 5,
        flex: 1
    },
    imageContainer: {
        position: 'relative', 
        width: '100%',
        height: 135, 
    },
    image: {
        width: '100%', 
        height: '100%', 
    },
    imageOverlay: {
        ...StyleSheet.absoluteFillObject,
        backgroundColor: 'rgba(0, 0, 0, 0.3)', 
    },
    overlay: {
        position: 'absolute',
        top: 0,
        left: 0,
        right: 0,
        bottom: 0,
        justifyContent: 'center',
        alignItems: 'center',
    },
    productName: {
        fontFamily: 'outfit-bold',
        fontSize: 23,
        color: '#fff',
    },
    priceContainer: {
        padding: 10,
        paddingTop: 5,
        flex: 1, 
        },
    priceRow: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        padding: 1,
        
    }
});
