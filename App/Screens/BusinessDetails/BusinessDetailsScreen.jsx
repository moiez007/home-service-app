import { Image, Linking, Modal, ScrollView, StyleSheet, Text, TouchableOpacity, View } from 'react-native'
import React, { useEffect, useState } from 'react'
import {useRoute, useNavigation} from "@react-navigation/native";
import { Ionicons } from '@expo/vector-icons';
import Colors from '../../Utils/Colors';
import Heading from '../../Components/Heading';
import BusinessAboutSection from './BusinessAboutSection';
import BusinessPhotos from './BusinessPhotos';
import BookingModal from './BookingModal';

export default function BusinessDetailsScreen() {

    const param = useRoute().params;
    const [business, setBusiness] = useState(param.business);
    const [showModal, setShowModal] = useState(false) 
    const navigation = useNavigation();

    const onMessagebtnClick = async()=>{
        const recipient = business?.email
        const subject = "I am looking for service";
        const body = "Hi there!";
        const encodedSubject = encodeURIComponent(subject);
        const encodedBody = encodeURIComponent(body);
    
        await Linking.openURL(
          `mailto:${recipient}?subject=${encodedSubject}&body=${encodedBody}`
        );
    }
 
  return business&&(
    <View>
    <ScrollView style = {{height:'91%'}}>
        <TouchableOpacity style ={styles.backButtonContainer} onPress={()=>navigation.goBack()}>  
            <Ionicons name="arrow-back-outline" size={26} color={Colors.WHITE} /> 
        </TouchableOpacity>
      <Image source={{uri:business?.images[0]?.url}}
      style = {{marginTop: 20, width: '100%', height: 250}} />
      <View style={styles.infoContainer}>
        <Text style={{fontWeight:'bold', fontSize: 25}}>{business?.name}</Text>
        <View style = {styles.subContainer}>
            <Text style = {{color:Colors.PRIMARY, fontSize: 20}}>{business?.contactPerson} 🌟 </Text>
        <Text 
            style = {{color:Colors.PRIMARY,backgroundColor:Colors.PRIMARY_LIGHT, padding: 5, borderRadius: 5, fontSize: 14}}
            >{business?.category.name}</Text>
        </View>
        <Text style ={{fontSize: 17, color:Colors.GRAY}}><Ionicons name="location-sharp" size={25} color={Colors.PRIMARY} /> {business?.address}</Text>
        <View style={{borderWidth:0.4, borderColor: Colors.GRAY, marginTop: 20, marginBottom: 20}}></View>
         {/* BUSNIESS DETAILS */}
         <BusinessAboutSection business = {business}/>
        <View style={{borderWidth:0.4, borderColor: Colors.GRAY, marginTop: 20, marginBottom: 20}}></View>
        <BusinessPhotos business={business} />
         
      </View>
    </ScrollView>
    <View style = {{display: 'flex', flexDirection: 'row', margin: 5, gap: 5}}>
    <TouchableOpacity onPress={()=> onMessagebtnClick()}
    style = {styles.messageButton}>
        <Text style = {{ textAlign: 'center', fontWeight: '500', fontSize: 18, color: Colors.PRIMARY}}>Message</Text>
    </TouchableOpacity>
    <TouchableOpacity style = {styles.bookingButton} onPress={()=> setShowModal(true)}>
        <Text style = {{ textAlign: 'center', fontWeight: '500', fontSize: 18, color: Colors.WHITE}}>Book Now</Text>
    </TouchableOpacity>
    </View>
    <Modal
    animationType='false'
    visible = {showModal}
    >
        <BookingModal 
        businessId={business.id}
        hideModal={()=>setShowModal(false)} />
    </Modal>
    </View>
  )
}

const styles = StyleSheet.create({
    backButtonContainer:{
        position: 'absolute',
        zIndex: 20,
        padding: 20
    }, 
    infoContainer:{
        padding:20,
        display: 'flex',
        gap: 7
    },
    subContainer:{
        display: 'flex',
        flexDirection: 'row',
        gap: 6,
        alignItems: 'center'

    },
    messageButton:{
        padding: 15,
        backgroundColor: Colors.WHITE,
        borderWidth: 1,
        borderColor: Colors.PRIMARY,
        borderRadius: 99,
        flex: 1,
    },
    bookingButton:{
        padding: 15,
        backgroundColor: Colors.PRIMARY,
        borderWidth: 1,
        borderColor: Colors.PRIMARY,
        borderRadius: 99,
        flex: 1
    }
})