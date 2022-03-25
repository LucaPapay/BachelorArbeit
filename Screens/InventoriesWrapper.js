import { createStackNavigator } from '@react-navigation/stack';
import { NewCategory } from '../Forms/NewCategory';
import { InventoriesScreen } from '../Screens/InventoriesScreen';
import { NavigationContainer } from '@react-navigation/native';
import { StyleSheet } from 'react-native';
export function InventoriesWrapper() {

    const Stack = createStackNavigator();
    return (
        <NavigationContainer independent={true}>
            <Stack.Navigator initialRouteName="Inventories">
                <Stack.Screen name="Inventories" component={InventoriesScreen} />
                <Stack.Screen name="New Category" component={NewCategory} />
            </Stack.Navigator>
        </NavigationContainer>
    );
}

