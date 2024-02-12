import { View, Text, FlatList } from 'react-native'
import React, { useEffect, useState } from 'react'
import Heading from '../../Components/Heading'
import GlobalAPI from '../../Utils/GlobalAPI'
import BusinessListItemSmall from './BusinessListItemSmall';

export default function BusinessList() {
    
    const[businessList, setBusinessList] = useState([]);
    useEffect(()=>{
        getBusinessList();

    },[])

    const getBusinessList = () => {
        GlobalAPI.getBusinessList().then(resp => {
            setBusinessList(resp?.businessLists)
        })
    }


  return (
    <View style = {{marginTop: 20}}>
      <Heading text={'Latest Business'} isViewAll = {true}/>
      <FlatList 
      data={businessList}
      horizontal
      showsHorizontalScrollIndicator = {false}
      renderItem={({item, index})=> (
        <View style={{marginRight: 10}}>
            <BusinessListItemSmall business={item} />
        </View>
      )} 
      />
    </View>
  )
}