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
      <Stack.Navigator initialRouteName="Low Stock">
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
