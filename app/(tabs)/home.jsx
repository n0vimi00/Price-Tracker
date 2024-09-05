import { Text, View } from "react-native";
import React from 'react';
import Header from "../../components/Home/Header";
import ProductList from "../../components/Home/ProductList";

export default function Home() {
  return (
    <View style={{
        padding:20,marginTop:20
    }}>
        {/* search bar */}
        <Header/>

        {/* list of products  */}
        <ProductList/>
        {/* add new product - floating icon */}
   
    </View>
  )
}
