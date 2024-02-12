import { Image, StyleSheet, Text, TouchableOpacity, View } from 'react-native'
import React from 'react'
import Colors from '../../Utils/Colors'
import {useNavigation} from '@react-navigation/native'

export default function BusinessListItemSmall({business}) {

  const navigation = useNavigation()
    return (
    <TouchableOpacity onPress={()=>navigation.push('businessDetail', {
      business: business
    })}
    style = {styles.container}>
      <Image source={{uri:business?.images[0]?.url}} 
      style = {styles.imageStyle}
      />
      <View style = {styles.infoContainer}>
        <Text style = {{fontSize: 18}}>{business?.name}</Text>
        <Text style = {{fontSize: 14, color: Colors.GRAY}}>{business?.contactPerson}</Text>
        <Text style = {{
            fontSize: 12,
            padding: 2,
            color: Colors.PRIMARY,
            backgroundColor: Colors.PRIMARY_LIGHT,
            borderRadius: 3,
            alignSelf: 'flex-start',
            paddingHorizontal: 7
            }}>{business?.category.name}</Text>
        
      </View>
    </TouchableOpacity>
  )
}

const styles = StyleSheet.create({
    
    container:{
        padding: 8,
        backgroundColor: Colors.WHITE,
        borderRadius: 10

    },
    infoContainer:{
      padding: 7,
      display: 'flex',
      gap: 3  

    },
    imageStyle:{
        height:100,
        width: 160,
        borderRadius: 10
    }
})