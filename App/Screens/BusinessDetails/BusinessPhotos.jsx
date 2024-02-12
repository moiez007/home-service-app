import { FlatList, Image, StyleSheet, Text, View } from 'react-native'
import React from 'react'
import Heading from '../../Components/Heading'

export default function BusinessPhotos({business}) {
  return (
    <View>
        <Heading text={'Photos'} />
        
        <FlatList 
        data={business.images}
        numColumns={2}
        renderItem={({item})=>(
            <Image source={{uri: item.url}} 
            style = {{width:'50%', flex:1 , borderRadius: 10, 
            margin:5, 
            height: 200}}/>
        )}
        />
      
    </View>
  )
}

const styles = StyleSheet.create({

})