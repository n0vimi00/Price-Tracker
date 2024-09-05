import { Text, View, Image, StyleSheet } from "react-native";
import React, { useEffect } from 'react';
import { useLocalSearchParams, useNavigation } from "expo-router";
import ProductInfo from "../../components/Home/ProductDetails/ProductInfo";
import StoreInfo from "../../components/Home/ProductDetails/StoreInfo";
import useProductStore from "../states/store";

export default function ProductDetails() {

    const { currentProduct } = useProductStore(); // Access the current product globally
    const navigation = useNavigation();
  
    useEffect(() => {
      navigation.setOptions({
        headerTransparent: true,
        headerTitle: '',
      });
    }, []);
  
    return (
      <View>
        {currentProduct ? (
          <>
            <ProductInfo product={currentProduct} />
            <StoreInfo product={currentProduct} />
          </>
        ) : (
          <Text>No product selected</Text>
        )}
      </View>
    );
  }
    
//     const product=useLocalSearchParams();
//     console.log('Product in ProductDetails:', product);
//     const navigation=useNavigation();

//     useEffect(()=>{
//         navigation.setOptions({
//             headerTransparent:true,
//             headerTitle:''
//         })
//     },[]);

//     console.log('Product Data in ProductDetails:', product);

//     return (
//         <View>
//             <ProductInfo product={product} />

//             <StoreInfo product={product}/>
//         </View>
//     )
// }