import { FlatList, KeyboardAvoidingView, ScrollView, Platform, StyleSheet, Text, TextInput, TouchableOpacity, View, ToastAndroid } from 'react-native'
import React, { useEffect, useState } from 'react'
import { Ionicons } from '@expo/vector-icons';
import CalendarPicker from 'react-native-calendar-picker';
import Colors from '../../Utils/Colors';
import Heading from '../../Components/Heading';
import GlobalAPI from '../../Utils/GlobalAPI';
import {useUser} from '@clerk/clerk-expo'
import moment from 'moment';

export default function BookingModal({businessId ,hideModal}) {
    const [dateValue, setDateValue] = useState()
    const [time, setTime] = useState()
    const [selectedTime, setSelectedTime] = useState();
    const [note, setNote] = useState('')
    const {user} = useUser();
    const handleDateChange = value => {
        setDateValue(value)
    }
    useEffect(()=>{
        getTime();
    },[])
    const getTime= () =>{
    const timeList = [];
    for(let i =8; i<=12; i++){
        timeList.push({
            time: i+':00 AM'
        })
        timeList.push({
            time: i+':30 AM'
        })
        
    }
    for(let i = 1; i<=7;i++){
        timeList.push({
            time: i+':00 PM'
        })
        timeList.push({
            time: i+':30 PM'
        })
    }
    setTime(timeList);
    }

    //CREATE BOOKING 
    const createBooking = () =>{

        if(!selectedTime || !dateValue){
            ToastAndroid.show("Please Selecte Date and Time", ToastAndroid.LONG);
            return
        }

        const data = {
            businessId: businessId,
            userName: user?.fullName,
            userEmail: user?.primaryEmailAddress.emailAddress,
            time: selectedTime,
            date: moment(dateValue).format('DD-MM-YYYY'),

        }


        GlobalAPI.createBooking(data).then(resp =>{
            console.log("Resp: ", resp);
            ToastAndroid.show("Booking Created Successfully!", ToastAndroid.LONG);
            hideModal();
        })
    }

  return (
    <ScrollView>
    <KeyboardAvoidingView behavior= {(Platform.OS === 'ios')? "padding" : 10}
    style= {{padding:20, paddingTop:40}}>
    <TouchableOpacity style = {{display: 'flex', flexDirection:'row', gap: 10}}
    onPress={()=>hideModal()}
    >
      <Ionicons name="arrow-back-outline" size={24} color="black" />
      <Text style={{fontSize: 25}}>Booking</Text>
    </TouchableOpacity>
    {/*CALENDAR SECTION */}
    <Heading text={'Select Date'} isViewAll= {false}/>
    <View style = {styles.calendarContainer}>
        <CalendarPicker
            value={dateValue}
            onDateChange={handleDateChange} 
            width = {340}
            minDate = {Date.now()}
            todayBackgroundColor = {Colors.BLACK}
            todayTextStyle = {{color: Colors.WHITE}}
            selectedDayColor = {Colors.PRIMARY}
            selectedDayTextColor = {Colors.BLACK}
        />
    </View>
    {/*TIME SELECT SECTION*/}
    <View style = {{marginTop: 20}}>
        <Heading text={'Select Time Slots'} />
        <FlatList 
        data={time}
        horizontal= {true}
        showsHorizontalScrollIndicator = {false}
        renderItem={({item}) =>(
            <TouchableOpacity style = {{ padding:5}} onPress={()=> setSelectedTime(item.time)}>
                <Text style = {selectedTime == item.time? 
                    styles.selectedTime: styles.unSelectedTime}>{item.time}</Text>
            </TouchableOpacity>
            )}
        />
    </View>
    {/*NOTE SECTION */}
    <View style={{marginTop:20}}>
        <Heading text={'Any Suggestions '} />
        <TextInput placeholder='note'
        numberOfLines={4}
        multiline = {true}
        style = {styles.noteContainer}
        onChange={(text)=>setNote(text)}
        />
    </View>
    {/*Confirmation Button*/}
    <TouchableOpacity onPress={()=> createBooking()}>
        <Text style = {styles.confirmationButtonStyle}>Confirm & Book!</Text>
    </TouchableOpacity>

    </KeyboardAvoidingView>
    </ScrollView>
  )
}

const styles = StyleSheet.create({
    calendarContainer: {
        backgroundColor: Colors.PRIMARY_LIGHT,
        borderRadius: 15,
        padding: 20

    },
    selectedTime:{
        padding: 8,
        borderWidth: 0.5,
        borderRadius: 10,
        paddingHorizontal: 18,
        backgroundColor: Colors.PRIMARY,
        color: Colors.WHITE,
        overflow:'hidden'
    },
    unSelectedTime:{
        padding: 8,
        borderWidth: 0.5,
        borderColor: Colors.PRIMARY,
        borderRadius: 10,
        paddingHorizontal: 18,
        color: Colors.PRIMARY,
    },
    noteContainer:{
        borderWidth: 1,
        borderRadius: 15,
        height: 100,
        textAlignVertical:'top',
        padding: 20,
        fontSize: 16,
        borderColor: Colors.PRIMARY,

    },
    confirmationButtonStyle:{
        textAlign: 'center',
        fontSize: 17,
        marginTop: 10,
        backgroundColor:Colors.PRIMARY,
        color: Colors.WHITE,
        borderRadius: 20,
        elevation: 5,
        overflow: 'hidden',
        padding: 13,
        fontWeight: '500',


    }
})