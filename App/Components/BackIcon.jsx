import { StyleSheet, Text, TouchableOpacity, View } from 'react-native'
import React from 'react'
import {useNavigation} from "@react-navigation/native";
import { Ionicons } from '@expo/vector-icons';

export default function BackIcon({category}) {
    const navigation = useNavigation();
  return (
    <View>
    <TouchableOpacity style = {{display: 'flex', flexDirection:'row', gap: 10, alignItems: 'center'}}
    onPress={()=>navigation.goBack()}
    >
      <Ionicons name="arrow-back-outline" size={24} color="black" />
      <Text style={{fontSize: 25}}>{category}</Text>
    </TouchableOpacity>
    </View>
  )
}

const styles = StyleSheet.create({})