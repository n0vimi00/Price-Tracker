import { Text, View } from "react-native";
import React from 'react';
import { Tabs } from 'expo-router';
import Foundation from '@expo/vector-icons/Foundation';
import color from "./../../constants/Colors";

export default function TabLayout() {
  return (
    <Tabs
    screenOptions={{
        tabBarActiveTintColor:color.primary,
        tabBarLabelStyle: {
          fontSize: 11, 
          fontWeight: 'bold', 
          paddingBottom: 2
        }

    }}
    >
        <Tabs.Screen name='manualPrices'
        options={{
            title:'Omat hinnat',
            headerShown:false,
            tabBarIcon:({color})=><Foundation name="clipboard-pencil" size={24} color={color} />
            }}
        />
         <Tabs.Screen name='livePrices'
        options={{
            title:'Live-hinnat',
            headerShown:false,
            tabBarIcon:({color})=><Foundation name="web" size={24} color={color} />
            }}
        />
        <Tabs.Screen name='shopList'
        options={{
            title:'Kauppalista',
            headerShown:false,
            tabBarIcon:({color})=><Foundation name="shopping-cart" size={24} color={color} />
            }}
        />
    </Tabs>
  )
}
