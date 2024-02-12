import { View, Text, Image, StyleSheet, TextInput } from 'react-native'
import React from 'react'
import { useUser } from '@clerk/clerk-expo';
import Colors from '../../Utils/Colors';
import { FontAwesome } from '@expo/vector-icons';

export default function Header() {
    const { user, isLoading } = useUser();
    return user&&(
        <View style={styles.container}>
           {/* Profile Section */}
            <View style= {styles.profileMainContainer}>
                <View style={styles.profileContainer}>
                    <Image source={{ uri: user.imageUrl }} style={styles.userImage} />
                    <View>
                        <Text style={{ color: Colors.WHITE }}> Welcome</Text>
                        <Text style={{ color: Colors.WHITE, fontSize: 20 }}>{user.fullName}</Text>
                    </View>
                </View>
                <FontAwesome name="bookmark-o" size={27} 
                color="white" />
            </View>
            {/*SEARCH BAR SECTION */}
            <View style = {styles.searchBarContainer}>
                <TextInput style = {styles.texInput} placeholder='Search' /> 
                <FontAwesome 
                name="search" 
                style = {styles.SearchButton}
                size={24} 
                color={Colors.PRIMARY} />
            </View>
        </View>
    );
}
const styles = StyleSheet.create({
    container: {
        padding: 20,
        paddingTop: 30,
        marginTop: 18,
        backgroundColor: Colors.PRIMARY,
        borderBottomLeftRadius: 25,
        borderBottomRightRadius: 25
    },
    profileMainContainer: {
        display: 'flex',
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-between'
    },
    profileContainer: {
        display: 'flex',
        flexDirection: 'row',
        alignItems: 'center',
        gap: 10
    },
    texInput: {
        padding: 7,
        paddingHorizontal: 16,
        backgroundColor: Colors.WHITE,
        borderRadius: 8,
        width: '85%',
        fontSize: 16,
    },
    searchBarContainer: {
        marginTop: 15,
        display: 'flex',
        flexDirection: 'row',
        gap: 10,
        marginBottom: 10

    },  
    SearchButton: {
        backgroundColor: Colors.WHITE,
        padding: 10,
        borderRadius: 8,
    },
    userImage: {
        width: 45,
        height: 45,
        borderRadius: 99,
    }
})
