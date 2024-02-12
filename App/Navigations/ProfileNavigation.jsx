import {createStackNavigator} from '@react-navigation/stack';
import BookingScreen from '../Screens/BookingScreen/BookingScreen';
import BusinessDetailsScreen from '../Screens/BusinessDetails/BusinessDetailsScreen';
import HomeScreen from '../Screens/HomeScreen/HomeScreen';
import ProfileScreen from '../Screens/ProfileScreen/ProfileScreen';

const Stack = createStackNavigator();

export default function ProfileNavigation(){
    return(
        <Stack.Navigator screenOptions={{
            headerShown: false,

        }}>
            <Stack.Screen name='profile' component={ProfileScreen} />
            <Stack.Screen name='booking' component={BookingScreen} />
            <Stack.Screen name='home' component={HomeScreen} />
        </Stack.Navigator>
    )

}