import { Text, View, Image, StyleSheet } from "react-native";
import React, { useEffect } from 'react';
import { useLocalSearchParams, useNavigation } from "expo-router";
import ProductInfo from "../../components/Home/ProductDetails/ProductInfo";

export default function ProductDetails() {
    const product=useLocalSearchParams();
    const navigation=useNavigation();

    useEffect(()=>{
        navigation.setOptions({
            headerTransparent:true,
            headerTitle:''
        })
    },[]);
    return (
        <View>
            <ProductInfo product={product} />
        </View>
    )
}