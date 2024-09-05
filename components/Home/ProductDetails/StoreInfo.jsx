import { View, Text, StyleSheet } from 'react-native';
import React from 'react';
import Colors from '../../../constants/Colors';

const capitalizeFirstLetter = (string) => {
    return string.charAt(0).toUpperCase() + string.slice(1);
};

export default function StoreInfo({ product }) {
    const stores = product?.stores || {};

    // Sort store entries by price in ascending order
    const sortedStoreEntries = Object.entries(stores).sort((a, b) => a[1] - b[1]);

    return (
        <View style={styles.container}>
            {sortedStoreEntries.length > 0 ? (
                sortedStoreEntries.map(([store, price], index) => (
                    <View key={index} style={styles.storeRow}>
                          <Text style={{
                                fontSize: 20,
                                fontFamily: 'outfit-medium',
                                flex: 1,
                                color: Colors.storeColors[store] || '#000' // Assign color from Colors file
                            }}>
                            {capitalizeFirstLetter(store)}:
                            </Text>
                        <Text style={styles.storePrice}>
                            {`${price}€`}
                        </Text>
                    </View>
                ))
            ) : (
                <Text>No prices available</Text>
            )}
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
        margin:10,
    },
    storePrice: {
        fontSize: 20,
        fontFamily: 'outfit-medium',
        color: '#000',
    },
});
