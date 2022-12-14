import { createStackNavigator } from "@react-navigation/stack";
import { NavigationContainer } from "@react-navigation/native";
import { HomeScreen } from "../Screens/HomeScreen";
import { NewCategory } from "../Forms/NewCategory";
import { EditCategory } from "../Forms/EditCategory";

export function HomeScreenStackRouter() {
  const Stack = createStackNavigator();
  return (
    <NavigationContainer independent={true}>
      <Stack.Navigator
        initialRouteName="Categories"
        screenOptions={({ route }) => ({
          headerStyle: {
            height: 80,
            backgroundColor: "#1f2937",
            elevation: 0, // remove shadow on Android
            shadowOpacity: 0, // remove shadow on iOS
            borderBottomWidth: 0, // Just in case.
          },
          headerTitleStyle: { color: "#ffffff", fontSize: 20 },
          headerTintColor: "#06b6d4",
        })}
      >
        <Stack.Screen name="Categories" component={HomeScreen} />
        <Stack.Screen name="New Category" component={NewCategory} />
        <Stack.Screen name="Edit Category" component={EditCategory} />
      </Stack.Navigator>
    </NavigationContainer>
  );
}
