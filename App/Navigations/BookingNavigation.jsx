import {createStackNavigator} from '@react-navigation/stack';
import BookingScreen from '../Screens/BookingScreen/BookingScreen';
import BusinessDetailsScreen from '../Screens/BusinessDetails/BusinessDetailsScreen';

const Stack = createStackNavigator();

export default function BookingNavigation(){
    return(
        <Stack.Navigator screenOptions={{
            headerShown: false,

        }}>
            <Stack.Screen name='booking' component={BookingScreen} />
            <Stack.Screen name='businessDetail' component={BusinessDetailsScreen} />
        </Stack.Navigator>
    )

}