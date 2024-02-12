import { View, Text, Image, StyleSheet, Button, TouchableOpacity } from 'react-native'
import React from 'react'
import Colors from '../../Utils/Colors'
import * as WebBrowser from "expo-web-browser"
import { useOAuth } from "@clerk/clerk-expo";
import { useWarmUpBrowser } from '../../hooks/warmUpBrowser';

WebBrowser.maybeCompleteAuthSession();

//For Token saving, we installed expo-secure-store it gave us the functions of getToken and Savetoken

export default function Login() {
    useWarmUpBrowser();
    const { startOAuthFlow } = useOAuth({ strategy: "oauth_google" });
    
    const onPress = React.useCallback(async () => {
        try {
          const { createdSessionId, signIn, signUp, setActive } =
            await startOAuthFlow();
     
          if (createdSessionId) {
            setActive({ session: createdSessionId });
          } else {
            // Use signIn or signUp for next steps such as MFA
          }
        } catch (err) {
          console.error("OAuth error", err);
        }
      }, []);
    return (
        <View style={{ alignItems: 'center' }}>
            <Image source={require('./../../../assets/Images/login.png')}
                style={styles.loginImage} />

            <View style={styles.subContainer}>
                <Text style = {{fontSize: 27, color: Colors.WHITE, textAlign:'center'}}>Let's Find 
                <Text style={{fontWeight: 'bold'}}> Professional Cleaning and Repair</Text>
                <Text> Services!</Text>

                </Text>
                <Text style={{fontSize: 16, color: Colors.WHITE, textAlign:'center', marginTop: 20}}>  Best App to find Services Near You Which Delivers you Professional Service</Text>
                <TouchableOpacity style = {styles.buttonStyle} onPress={onPress}>
                    <Text style = {{textAlign: 'center', fontSize: 17, color: Colors.PRIMARY}}>Let's get started!</Text>
                </TouchableOpacity>
            </View>
        </View>
    )
}
const styles = StyleSheet.create({
    loginImage: {
        width: 230,
        height: 450,
        marginTop: 65,
        borderWidth: 4,
        borderColor: Colors.BLACK,
        borderRadius: 15
    },
    subContainer: {
        width: '100%',
        backgroundColor: Colors.PRIMARY,
        height: '70%',
        marginTop: -20,
        borderTopLeftRadius: 30,
        borderTopRightRadius: 30,
        padding: 20

    },
    buttonStyle:{
        padding: 15,
        backgroundColor: Colors.WHITE,
        borderRadius: 99,
        marginTop: 40

    }
})
