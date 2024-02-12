import { View, Text, StyleSheet, FlatList, Image, TouchableOpacity } from 'react-native'
import React, {useEffect, useState} from 'react'
import GlobalAPI from '../../Utils/GlobalAPI'
import Heading from '../../Components/Heading';
import Colors from '../../Utils/Colors';
import {useNavigation} from '@react-navigation/native';

export default function Categories() {
    const navigation = useNavigation();

    const[category, setCategory] = useState([]);

    useEffect(() => {
        getCategories()
    }, [])

    const getCategories = () => {
        GlobalAPI.getCategoies().then(resp => {
            setCategory(resp?.categories);
        })
    }

    return (
        <View>
            <Heading text={'Categories'} isViewAll={true}/>
            <FlatList 
            data={category}
            numColumns={5}
            renderItem={({item, index})=>index<=3&&(
                <TouchableOpacity style = {styles.container}
                onPress={()=>{
                    navigation.push('businessList', {
                        category: item.name
                    })
                }}>
                    <View style = {styles.iconContainer}>
                        <Image source={{uri: item?.icon?.url}} 
                        style={{height: 30 , width: 30}}/>
                    </View>
                    <Text style = {{marginTop: 5, fontSize:13}}>{item?.name}</Text>
                </TouchableOpacity>
            )}
            
            />
        </View>
    )
}

const styles = StyleSheet.create({
    container:{
        flex: 1,
        alignItems: 'center'

    },

    iconContainer:{
    backgroundColor: Colors.LIGHT_GRAY,
    padding: 17,
    borderRadius: 99

 }
})
