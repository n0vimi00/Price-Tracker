import { Text, View } from "react-native";
import React from 'react';
import { Tabs } from 'expo-router';
import Ionicons from '@expo/vector-icons/Ionicons';
import Foundation from '@expo/vector-icons/Foundation';
import color from "./../../constants/Colors";

export default function TabLayout() {
  return (
    <Tabs
    screenOptions={{
        tabBarActiveTintColor:color.primary
    }}
    >
        <Tabs.Screen name='home'
        options={{
            title:'Koti',
            headerShown:false,
            tabBarIcon:({color})=><Ionicons name="home" size={24} color={color} />
            }}
        />
        <Tabs.Screen name='shopList'
        options={{
            title:'Kauppalista',
            headerShown:false,
            tabBarIcon:({color})=><Foundation name="clipboard-pencil" size={24} color={color} />
            }}
        />
    </Tabs>
  )
}
