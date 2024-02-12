import { View, Text, Image, FlatList, TouchableOpacity} from 'react-native'
import React from 'react'
import { Ionicons } from '@expo/vector-icons';
import {useUser} from '@clerk/clerk-expo';
import Colors from '../../Utils/Colors';
import {useNavigation} from "@react-navigation/native";

export default function ProfileScreen() {

  const {user} = useUser();
  const navigation = useNavigation();
  const profile = [
    {
      id: 1,
      screenName: 'home',
      name: 'Home',
      icon:'home',
    },
    {
      id: 2, 
      screenName: 'booking',
      name: 'My Booking',
      icon:'bookmark-sharp',
    },
    {
      id: 3, 
      name: 'Contact Us',
      icon:'mail',
    },
    {
      id: 4, 
      name: 'Log Out',
      icon:'log-out',
    }
  ]
  return (
    <View style = {{}}>
    <View style = {{padding: 20, paddingTop: 30,backgroundColor: Colors.PRIMARY }}>
      <Text style = {{fontWeight:'500', fontSize: 30, color: Colors.WHITE}}>Profile</Text>
      <View style ={{
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        padding: 20,
        
      }}>
        <Image source={{uri: user.imageUrl}}
        style= {{height: 90, width: 90, borderRadius: 50,
        }}
        />
        <Text style ={{fontSize: 20, fontWeight: '300', color: Colors.WHITE, marginTop: 8}}>
          {user.fullName}
        </Text>
        <Text style ={{fontSize: 16, fontWeight: '300', color: Colors.WHITE, marginTop: 8}}>
          {user.primaryEmailAddress.emailAddress} 
        </Text>
      </View>
    </View>

    <View style = {{paddingTop: 60}}>
      <FlatList 
      data={profile}
      renderItem={({item, index}) =>(
        <TouchableOpacity onPress={()=>{navigation.push(item.screenName)}}
        style = {{display: 'flex',flexDirection: 'row', alignItems: 'center', gap: 10, marginBottom: 40, paddingHorizontal: 80}}>
          <Ionicons name={item.icon} size={35} color={Colors.PRIMARY} />
          <Text style = {{fontSize: 20, fontWeight: 300,}}> {item.name}</Text>
        </TouchableOpacity>
      )}
      />
    </View>
    </View>
  )
}