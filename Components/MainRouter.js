import { NavigationContainer } from '@react-navigation/native';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import Ionicons from '@expo/vector-icons/Ionicons';
import { HomeScreen } from '../Screens/HomeScreen';
import { SettingsScreen } from '../Screens/SettingsScreen';
import { InventoriesScreen } from '../Screens/InventoriesScreen';


const Tab = createBottomTabNavigator();

export function MainRouter() {
    return (
        <NavigationContainer>
            <Tab.Navigator screenOptions={({ route }) => ({
                tabBarIcon: ({ focused, color, size }) => getTabIcons(route, focused, color, size),
                tabBarActiveTintColor: 'tomato',
                tabBarInactiveTintColor: 'gray',
            })}>
                <Tab.Screen name="Home" component={HomeScreen} />
                <Tab.Screen name="Inventories" component={InventoriesScreen} />
                <Tab.Screen name="Settings" component={SettingsScreen} />
            </Tab.Navigator>
        </NavigationContainer>

    );
}




function getTabIcons(route, focused, color, size) {
    let iconName;

    if (route.name === 'Home') {
        iconName = focused
            ? 'ios-information-circle'
            : 'ios-information-circle-outline';
    } else if (route.name === 'Inventories') {
        iconName = focused ? 'file-tray-stacked' : 'file-tray-stacked-outline';
    } else if (route.name === 'Settings') {
        iconName = focused ? 'settings' : 'settings-outline';
    }

    return <Ionicons name={iconName} size={size} color={color} />;
}