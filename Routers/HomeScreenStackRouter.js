import { createStackNavigator } from "@react-navigation/stack";
import { NavigationContainer } from "@react-navigation/native";
import { HomeScreen } from "../Screens/HomeScreen";
import { NewCategory } from "../Forms/NewCategory";

export function HomeScreenStackRouter() {
  const Stack = createStackNavigator();
  return (
    <NavigationContainer independent={true}>
      <Stack.Navigator initialRouteName="Home Screen">
        <Stack.Screen name="Home Screen" component={HomeScreen} />
        <Stack.Screen name="New Category" component={NewCategory} />
      </Stack.Navigator>
    </NavigationContainer>
  );
}
