import { NavigationContainer } from '@react-navigation/native';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import Ionicons from '@expo/vector-icons/Ionicons';
import { HomeScreen } from '../Screens/HomeScreen';
import { SettingsScreen } from '../Screens/SettingsScreen';
import { InventoriesScreen } from '../Screens/InventoriesScreen';
import { View, Text, StyleSheet } from 'react-native';
import { useDispatch } from 'react-redux';
import { addCategoryToInventories } from '../redux/actions';

const Tab = createBottomTabNavigator();

export function MainRouter() {

    const dispatch = useDispatch();

    return (
        <NavigationContainer>
            <Tab.Navigator screenOptions={({ route }) => ({
                tabBarIcon: ({ focused, color, size }) => getTabIcons(route, focused, color, size),
                tabBarActiveTintColor: 'tomato',
                tabBarInactiveTintColor: 'gray',
            })}>
                <Tab.Screen name={"Home"} component={HomeScreen} />
                <Tab.Screen name="Inventories" options={{
                    headerTitle: () =>
                        <View style={styles.header}>
                            <Text style={styles.headerFont}>
                                Home
                            </Text>
                            <Ionicons
                                onPress={() => dispatch(addCategoryToInventories('newEntry'))}
                                name="add-circle"
                                size={35}
                                color="black" />
                        </View>
                }} component={InventoriesScreen} />
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

const styles = StyleSheet.create({
    headerFont: {
        fontSize: 20,
        fontWeight: '600',
    },
    header: {
        flex: 3,
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-between',
    },
    title: {
        fontSize: 24,
    },
});