import { View, Text, StyleSheet } from 'react-native';
import React from 'react';

export default function ProductSubInfo({ product }) {

    const validPrices = Array.isArray(product?.prices)
        ? product.prices
            .filter(priceInfo => priceInfo.price !== 'N/A' && priceInfo.price !== undefined)
            .sort((a, b) => a.price - b.price)
        : [];

    console.log('product:', product.prices); // Log filtered prices

    return (
        <View>
            <View style={styles.priceContainer}>
                {validPrices.length > 0 ? (
                    validPrices.map((priceInfo, index) => (
                        <View key={index} style={styles.priceRow}>
                            <Text 
                                style={{
                                    fontSize: 16,
                                    color: '#000',
                                    flex: 1,
                                    fontFamily: 'outfit',
                                }}>
                                {priceInfo.store}: {/* Store name */}
                            </Text>
                            <Text 
                                style={{
                                    fontSize: 17,
                                    color: '#000',
                                    flex: 1,
                                    textAlign: 'right',
                                    fontFamily: 'outfit-medium',
                                }}>
                                {`${priceInfo.price}€`} {/* Price */}
                            </Text>
                        </View>
                    ))
                ) : (
                    <Text style={styles.noPriceText}>No prices available</Text>
                )}
            </View>
        </View>
    );
}

const styles = StyleSheet.create({
    priceContainer: {
        padding: 20,
        marginTop: 10,
    },
    priceRow: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        marginBottom: 10,
    },
    noPriceText: {
        textAlign: 'center',
        fontSize: 16,
        fontFamily: 'outfit',
        color: '#999',
    },
});
