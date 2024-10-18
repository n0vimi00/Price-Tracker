import { View, Text, Image, StyleSheet } from 'react-native';
import React from 'react';

export default function ProductInfo({ product }) {
    return (
        <View>
            <View style={styles.imageContainer}>
                <Image
                    source={{ uri: product.imageURL }}
                    style={styles.image}
                />
                <View style={styles.imageOverlay} />
                <View style={styles.textContainer}>
                    <Text style={styles.productName}>{product?.name}</Text>
                </View>
            </View>
            {/* <View style={styles.detailsContainer}>
            </View> */}
        </View>
    );
}

const styles = StyleSheet.create({
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
    productName: {
        fontFamily: 'outfit-bold',
        fontSize: 40,
        color: '#fff', // White text color to stand out on the black overlay
        textAlign: 'center',
    },
    detailsContainer: {
        padding: 20,
    },
});
