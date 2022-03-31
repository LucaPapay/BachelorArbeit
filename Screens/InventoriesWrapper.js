import { createStackNavigator } from '@react-navigation/stack';
import { NewCategory } from '../Forms/NewCategory';
import { InventoriesScreen } from '../Screens/InventoriesScreen';
import { NavigationContainer } from '@react-navigation/native';
import { NewEntry } from '../Forms/NewEntry';
import { SubInventoryScreen } from './SubInventoryScreen';
import { NewSubCategory } from '../Forms/NewSubCategory';

export function InventoriesWrapper() {

    const Stack = createStackNavigator();
    return (
        <NavigationContainer independent={true}>
            <Stack.Navigator initialRouteName="Inventories">
                <Stack.Screen name="Inventories" component={InventoriesScreen} />
                <Stack.Screen name="Sub Inventory" options={({ route }) => ({ title: route.params.name })} component={SubInventoryScreen} />
                <Stack.Screen name="New Category" component={NewCategory} />
                <Stack.Screen name="New SubCategory" component={NewSubCategory} />
                <Stack.Screen name="New Entry" component={NewEntry} />
            </Stack.Navigator>
        </NavigationContainer>
    );
}

