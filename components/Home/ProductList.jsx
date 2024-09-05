import { Text, View, FlatList, Image } from "react-native";
import React, { useEffect, useState } from 'react';
import { collection, getDocs, query } from "firebase/firestore";
import { db } from '../../config/FirebaseConfig';
import ProductListItem from "./ProductListItem";

export default function ProductList() {

    const [productList, setProductList] = useState([]);

    useEffect(() => {
        GetProductList();
    }, [])

    const GetProductList = async () => {
        const snapshot = await getDocs(collection(db, 'products'));
        snapshot.forEach((doc) => {
            console.log(doc.data());
            setProductList(productList => [...productList, doc.data()])
        });

    }

    return (
        <View>
            <FlatList
                data={productList}
                horizontal={true}
                renderItem={({ item }) => (
                    <ProductListItem product={item} />
                )}
                keyExtractor={(item) => item.id}
            />
        </View>
    )

}

