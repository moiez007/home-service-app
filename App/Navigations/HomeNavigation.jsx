import { StyleSheet, Text, View } from 'react-native'
import React from 'react'
import { createStackNavigator } from '@react-navigation/stack';
import HomeScreen from '../Screens/HomeScreen/HomeScreen';
import BusinessListByCategoryScreen from '../Screens/BusinessListScreen/BusinessListByCategoryScreen';
import BusinessDetailsScreen from '../Screens/BusinessDetails/BusinessDetailsScreen';


const Stack = createStackNavigator();
export default function HomeNavigation() {
  return (
    <Stack.Navigator screenOptions={{headerShown: false}}>
        <Stack.Screen name='home' component={HomeScreen}/>
        <Stack.Screen name ='businessList' component={BusinessListByCategoryScreen} />
        <Stack.Screen name = 'businessDetail' component={BusinessDetailsScreen} />
    </Stack.Navigator>
  )
}

const styles = StyleSheet.create({})