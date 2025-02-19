import { Text, View, ScrollView, KeyboardAvoidingView, Platform, StyleSheet } from "react-native";
import React, { useEffect } from 'react';
import { useNavigation } from "expo-router";
import ProductInfo from "../../components/Home/ProductDetails/ProductInfo";
import StoreInfo from "../../components/Home/ProductDetails/StoreInfo";
import useProductStore from "../states/store";

export default function ProductDetails() {
  const { currentProduct } = useProductStore();
  const navigation = useNavigation();

  useEffect(() => {
    navigation.setOptions({
      // headerTransparent: true,
      // headerTitle: 'kkk',
      headerShown: false, //
    });
  }, []);

  return (
    <KeyboardAvoidingView
      style={styles.container}
      behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
      keyboardVerticalOffset={100}
    >
      <ScrollView contentContainerStyle={styles.scrollContainer}>
        {currentProduct ? (
          <>
            <ProductInfo product={currentProduct} />
            <StoreInfo product={currentProduct} />
          </>
        ) : (
          <Text>Ei valintaa</Text>
        )}
      </ScrollView>
    </KeyboardAvoidingView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  scrollContainer: {
    flexGrow: 1,
  },
});
