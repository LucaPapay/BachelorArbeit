import { createStackNavigator } from "@react-navigation/stack";
import { NavigationContainer } from "@react-navigation/native";
import { EntryCodeView } from "../Components/EntryCodeView";
import { EntryDetails } from "../Components/EntryDetails";
import { EntryEditAmountView } from "../Components/EntryEditAmountView";
import { LowStockScreen } from "../Screens/LowStockScreen";

export function LowStockStackRouter() {
  const Stack = createStackNavigator();
  return (
    <NavigationContainer independent={true}>
      <Stack.Navigator
        initialRouteName="Low Stock"
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
        <Stack.Screen name="Low Stock" component={LowStockScreen} />
        <Stack.Screen name="QR Code" component={EntryCodeView} />
        <Stack.Screen name="Edit Amount" component={EntryEditAmountView} />
        <Stack.Screen
          name="Entry Details"
          component={EntryDetails}
          options={({ route }) => ({ title: route.params.entry.name })}
        />
      </Stack.Navigator>
    </NavigationContainer>
  );
}
