import { StyleSheet, Text, TouchableOpacity, View } from 'react-native'
import React, { useState } from 'react'
import Heading from '../../Components/Heading'
import Colors from '../../Utils/Colors'

export default function BusinessAboutSection({ business }) {

    const [readMore, setReadMore] = useState(false);

    return business&&(
        <View>
            <Heading text={'About Me'} isViewAll={false} />
            <Text style={{ color: Colors.GRAY, lineHeight: 25, fontSize: 16 }} numberOfLines={readMore ? 10 : 1}>{business.about}</Text>
            <TouchableOpacity onPress={() => setReadMore(!readMore)}>
                <Text style={{ color: Colors.PRIMARY, fontSize: 16 }}>
                    {readMore ? 'Read Less' : 'Read More'}</Text>
            </TouchableOpacity>
        </View>
    )
}

const styles = StyleSheet.create({})