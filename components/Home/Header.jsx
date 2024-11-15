import { Text, View } from "react-native";
import React from 'react';
import color from "./../../constants/Colors";
import AntDesign from '@expo/vector-icons/AntDesign';
import Ionicons from '@expo/vector-icons/Ionicons';
import { TouchableOpacity } from "react-native";
import { Link } from "expo-router";

export default function Header() {
  return (
    <View style={{
      display:"flex",
      flexDirection:'row',
      justifyContent:'space-between',
      marginTop:10,
      padding:10
    }}>
{/* <Ionicons name="filter" size={40} color={color.secondary} /> */}
      <View>
      <Text style={{
        color:color.title,
        fontFamily:'outfit-medium',
        fontSize:40,
      }}>Welcome</Text>
      </View>
      <Link href={'/add-new-product'}>
      <AntDesign name="pluscircle" size={43} color={color.primary}/>
      </Link>
    </View>
  )
}
