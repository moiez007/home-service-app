import { View, Text, FlatList } from 'react-native'
import React, { useEffect, useState } from 'react'
import GlobalAPI from '../../Utils/GlobalAPI'
import {useUser} from '@clerk/clerk-expo'
import BusinessListItem from '../BusinessListScreen/BusinessListItem'
export default function BookingScreen() {

  const {user} = useUser();
  const [bookingList, setBookingList] = useState([])
  const [loading, setLoading] =useState(false);

  useEffect(()=>{
    getUserBookings()
  }, [user]);
  const getUserBookings = () => {
    setLoading(true);
    GlobalAPI.getUserBooking(user.primaryEmailAddress.emailAddress).then(resp =>{
      console.log("resp: ", resp);
      setBookingList(resp.bookings);
      setLoading(false);
    })
  }
  return (
    <View style = {{padding:20, marginTop: 10}}>
      <Text style = {{fontSize: 24, fontWeight: '500', marginBottom: 10}}>Booking Screen</Text>

      <View> 
        <FlatList
        data={bookingList}
        onRefresh={()=> getUserBookings()}
        refreshing = {loading}
        renderItem={({item, index}) => (
          <BusinessListItem business={item?.businessList}
          booking = {item}
          />
        )}


        />
      </View>
    </View>
  )
}