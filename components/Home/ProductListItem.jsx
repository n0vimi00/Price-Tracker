import { Text, View, Image, StyleSheet, TouchableOpacity } from "react-native";
import React, { useState } from 'react';
import Colors from "../../constants/Colors"; // Import Colors from your Colors file
import { useRouter } from "expo-router";
import useProductStore from "../../app/states/store";

// Function to capitalize the first letter of the store name
const capitalizeFirstLetter = (string) => {
    return string.charAt(0).toUpperCase() + string.slice(1);
};

export default function ProductListItem({ product }) {
    const router = useRouter();
    const { setCurrentProduct } = useProductStore();

    // Check if product.stores is defined and is an object
    const storeEntries = product.stores ? Object.entries(product.stores) : [];

    // Sort store entries by price in ascending order
    const sortedStoreEntries = storeEntries.sort((a, b) => a[1] - b[1]);

    return (
        <TouchableOpacity
        onPress={() => {
            setCurrentProduct(product); // Set the current product globally
            router.push('/product-details'); // Navigate to the product details screen
          }}
            style={styles.container}>
            {/* Image section */}
            <View style={styles.imageContainer}>
                <Image
                    source={{ uri: product?.imageURL }}
                    style={styles.image}
                />
                {/* Black transparent overlay on top of the image */}
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
                        No prices available
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
        overflow: 'hidden', // Ensures the image and text don't overflow the container
        width: 165,
        elevation: 5
    },
    imageContainer: {
        position: 'relative', // To allow absolute positioning of the overlay
        width: '100%',
        height: 135, // Adjust the height as needed
    },
    image: {
        width: '100%', // Take up the full width of the container
        height: '100%', // Ensure the image fills the image container
    },
    imageOverlay: {
        ...StyleSheet.absoluteFillObject, // Fills the entire image
        backgroundColor: 'rgba(0, 0, 0, 0.3)', // Semi-transparent black background
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
        color: '#fff', // White text for contrast
    },
    priceContainer: {
        padding: 10,
        paddingTop: 5,
    },
    priceRow: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        padding: 1
    }
});
