import { FlatList, StyleSheet, Text, TouchableOpacity, View } from 'react-native'
import React, { useEffect, useState } from 'react'
import {useRoute, useNavigation} from '@react-navigation/native';

import GlobalAPI from '../../Utils/GlobalAPI';
import BusinessListItem from './BusinessListItem';
import Colors from '../../Utils/Colors';
import BackIcon from '../../Components/BackIcon';

export default function BusinessListByCategoryScreen() {
  
  const param = useRoute().params;
  const navigation = useNavigation();

  const [businessList, setBusinessList] = useState([]);
  useEffect(()=>{

    param&&getBusinessByCategory();

  },[param])
  
const getBusinessByCategory = () => {
  GlobalAPI.getBusinessListByCategory(param.category).then((resp)=>{
    setBusinessList(resp.businessLists);
  })
}
  return (
    <View style={{padding:20, paddingTop:30}}>
    <BackIcon category={param?.category}/>
    {businessList?.length>0?<FlatList 
    data={businessList}
    style= {{marginTop: 10}}
    renderItem={({item, index})=>(
      <BusinessListItem business = {item}/>

  )}
    /> 
    : <Text style ={{
      fontSize: 20,
      textAlign: 'center',
      marginTop: '20%',
      color: Colors.GRAY,
      fontWeight:'bold'
    }}>No Business Found</Text>}

    </View>
  )
}

const styles = StyleSheet.create({})