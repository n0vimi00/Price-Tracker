import { Text, View, FlatList, Image, ActivityIndicator, StyleSheet, Dimensions } from "react-native";
import React, { useEffect, useState } from 'react';
import { collection, onSnapshot } from "firebase/firestore";
import { db } from '../../config/FirebaseConfig';
import ProductListItem from "./ProductListItem";
import useProductStore from "../../app/states/store";

const { width, height } = Dimensions.get("window"); 

export default function ProductList() {
    const { productList, setProductList } = useProductStore(); 
    const [loading, setLoading] = useState(true);
    const numColumns = 2; 

    useEffect(() => {
        const unsubscribe = onSnapshot(
            collection(db, "products"),
            (snapshot) => {
                const products = snapshot.docs.map((doc) => ({
                    id: doc.id,
                    ...doc.data(),
                }));
                setProductList(products); 
                setLoading(false); 
            },
            (error) => {
                console.error("Error listening to products collection:", error);
                setLoading(false); 
            }
        );
        return () => unsubscribe();
    }, []);

    if (loading) {
        return (
            <View style={styles.loadingContainer}>
                <ActivityIndicator size="large" color="#0000ff" />
            </View>
        );
    }

    return (
        <View style={{ paddingBottom: height * 0.2 }}>
         <FlatList
                data={productList}
                numColumns={numColumns}
                renderItem={({ item }) => (
                    <View style={styles.cardWrapper}>
                        <ProductListItem product={item} />
                    </View>
                )}
                keyExtractor={(item) => item.id}
                contentContainerStyle={styles.listContent}
            />
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: "#f5f5f5",
    },
    loadingContainer: {
        flex: 1,
        justifyContent: "center",
        alignItems: "center",
    },
    cardWrapper: {
        flex: 1,
        maxWidth: width / 2, 
    }
});