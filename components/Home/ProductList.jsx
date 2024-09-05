import { Text, View, FlatList, Image } from "react-native";
import React, { useEffect, useState } from 'react';
import { collection, getDocs, query } from "firebase/firestore";
import { db } from '../../config/FirebaseConfig';
import ProductListItem from "./ProductListItem";
import useProductStore from "../../app/states/store";

export default function ProductList() {

    const { productList, setProductList, addProduct } = useProductStore(); // Access the global state and functions

    useEffect(() => {
      GetProductList();
    }, []);
  
    const GetProductList = async () => {
      const snapshot = await getDocs(collection(db, 'products'));
      let products = [];
      snapshot.forEach((doc) => {
        products.push(doc.data());
      });
      setProductList(products); // Set the product list globally
    };
  
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

//     const [productList, setProductList] = useState([]);

//     useEffect(() => {
//         GetProductList();
//     }, [])

//     const GetProductList = async () => {
//         const snapshot = await getDocs(collection(db, 'products'));
//         snapshot.forEach((doc) => {
//             // console.log(doc.data());
//             setProductList(productList => [...productList, doc.data()])
//         });

//     }

//     return (
//         <View>
//             <FlatList
//                 data={productList}
//                 horizontal={true}
//                 renderItem={({ item, index }) => (
//                     <ProductListItem product={item} />
//                 )}
//                 keyExtractor={(item) => item.id}
//             />
//         </View>
//     )

// }

