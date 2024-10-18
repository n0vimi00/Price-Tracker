import { Text, View, FlatList, Image, ActivityIndicator, StyleSheet } from "react-native";
import React, { useEffect, useState } from 'react';
import { collection, getDocs } from "firebase/firestore";
import { db } from '../../config/FirebaseConfig';
import ProductListItem from "./ProductListItem";
import useProductStore from "../../app/states/store";

export default function ProductList() {
    const { productList, setProductList } = useProductStore(); // Access the global state and functions
    const [loading, setLoading] = useState(true); // Add loading state

    useEffect(() => {
        GetProductList();
    }, []);

    const GetProductList = async () => {
        setLoading(true); // Start loading
        try {
            const snapshot = await getDocs(collection(db, 'products'));
            const products = snapshot.docs.map(doc => doc.data());
            setProductList(products); // Set the product list globally
        } catch (error) {
            console.error("Error fetching products:", error);
        } finally {
            setLoading(false); // Stop loading
        }
    };

    if (loading) {
        return (
            <View>
                <ActivityIndicator size="large" color="#0000ff" />
            </View>
        );
    }

    return (
        <View>
            <FlatList
                data={productList}
                horizontal={true}
                renderItem={({ item }) => <ProductListItem product={item} />}
                keyExtractor={(item) => item.id}
            />
        </View>
    );
}
