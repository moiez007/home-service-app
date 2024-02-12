import { Image, StyleSheet, Text, TouchableOpacity, View } from 'react-native'
import React from 'react'
import Colors from '../../Utils/Colors'
import { Ionicons } from '@expo/vector-icons';
import { useNavigation } from "@react-navigation/native"

export default function BusinessListItem({ business, booking }) {

    const navigation = useNavigation();
    return (
        <TouchableOpacity style={styles.container}
            onPress={() => navigation.push('businessDetail', {
                business
            })}>
            <Image source={{ uri: business?.images[0]?.url }}
                style={styles.businessImage} />
            <View style={styles.subContainer}>
                <Text style={{ color: Colors.GRAY, fontSize: 15 }}> {business.contactPerson} </Text>
                <Text style={{ fontSize: 18, fontWeight: 'bold' }}> {business.name} </Text>


                {!booking?.id ?
                    <Text style={{ color: Colors.GRAY, fontSize: 16 }}>
                        <Ionicons name="location-sharp" size={20} color={Colors.PRIMARY} />
                        {business.address} </Text>
                    :
                    <Text style={[{
                        padding: 5, borderRadius: 5, fontSize: 14,
                        alignSelf: 'flex-start'
                    },
                    booking?.bookingStatus == 'Completed' ? {
                        backgroundColor: Colors.LIGHT_GREEN, color: Colors.GREEN
                    } :
                        booking?.bookingStatus == 'Canceled' ? {
                            backgroundColor: Colors.LIGHT_RED, color: Colors.RED
                        } :
                            {
                                color: Colors.PRIMARY,
                                backgroundColor: Colors.PRIMARY_LIGHT
                            }]}>
                        {booking?.bookingStatus}
                    </Text>}

                {booking?.id ?
                    <Text style={{ color: Colors.GRAY, fontSize: 16 }}>
                        <Ionicons name="calendar" size={16} color={Colors.PRIMARY} />
                        {booking?.date} at {booking?.time} </Text> : null
                }
            </View>
        </TouchableOpacity>
    )
}

const styles = StyleSheet.create({
    container: {
        padding: 10,
        backgroundColor: Colors.WHITE,
        borderRadius: 15,
        marginBottom: 15,
        display: 'flex',
        flexDirection: 'row',
        gap: 10
    },
    subContainer: {
        display: 'flex',
        gap: 8
    },
    businessImage: {
        height: 100,
        width: 100,
        borderRadius: 15
    }
})