import { View, Text, StyleSheet, FlatList, Image} from 'react-native'
import React, { useEffect, useState } from 'react'
import GlobalAPI from '../../Utils/GlobalAPI'
import Colors from '../../Utils/Colors';
import Heading from '../../Components/Heading';

export default function Slider() {

    const[slider, setSlider] = useState([]);
    useEffect(()=>{
        getSliders();

    }, [])
    const getSliders = () => {
        GlobalAPI.getSlider().then(resp => {

            setSlider(resp?.sliders);
        })
    }
  return (
    <View>
      <Heading text={'Offers For You'}/>
      <FlatList 
      data={slider}
      horizontal
      showsHorizontalScrollIndicator = {false}
      renderItem={({item, index})=> (
        <View style = {{marginRight: 20}}>
            <Image source={{uri: item?.image?.url}}
            style = {styles.SliderImage} />
        </View>
      )}
      />
    </View>
  )
}

const styles = StyleSheet.create({
  SliderImage: {
    width: 270,
    height: 130, //140
    borderRadius: 20,
    objectFit: 'contain'
  }
})
