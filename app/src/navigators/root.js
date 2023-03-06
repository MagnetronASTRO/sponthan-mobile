import { NavigationContainer } from '@react-navigation/native';
import { createDrawerNavigator } from '@react-navigation/drawer';
import RegisterPage from '../pages/register';
import LoginPage from '../pages/login';
import EventsList from '../components/EventsList';

const Drawer = createDrawerNavigator();

export default function RootNavigator() {
    return (
        <NavigationContainer>
            <Drawer.Navigator>
                <Drawer.Screen name="SingIn" component={RegisterPage} />
                <Drawer.Screen name="LogIn" component={LoginPage} />
                <Drawer.Screen name="Events" component={EventsList} />
            </Drawer.Navigator>
        </NavigationContainer>
    )    
}