import { Text, View } from "react-native";
import React from 'react';
import color from "./../../constants/Colors";
import AntDesign from '@expo/vector-icons/AntDesign';
import Ionicons from '@expo/vector-icons/Ionicons';
import { Link } from "expo-router";

export default function Header() {
  return (
    <View style={{
      display: "flex",
      flexDirection: 'row',
      justifyContent: 'space-between',
      marginTop: 10,
      padding: 10
    }}>
      <Ionicons name="filter-circle-sharp" size={60} color={color.primary} />
      <View>
        <Text style={{
          color: color.title,
          fontFamily: 'outfit-medium',
          fontSize: 40,
        }}>Hintavahti</Text>
      </View>
      <Link href={'/add-new-product'}>
        <AntDesign name="pluscircle" size={60} color={color.primary} />
      </Link>
    </View>
  )
}
