import { createStackNavigator } from "@react-navigation/stack";
import { NewItemGroup } from "../Forms/NewItemGroup";
import { ItemGroupsScreen } from "../Screens/ItemGroupsScreen";
import { NavigationContainer } from "@react-navigation/native";
import { NewEntry } from "../Forms/NewEntry";
import { SubItemGroupScreen } from "../Screens/SubItemGroupScreen";
import { NewSubItemGroup } from "../Forms/NewSubItemGroup";
import Scanner from "../Components/Scanner";
import ScannerResult from "../Components/ScannerResult";
import { EntryCodeView } from "../Components/EntryCodeView";
import FormScanner from "../Components/FormScanner";
import { EntryDetails } from "../Components/EntryDetails";
import { EntryEditAmountView } from "../Components/EntryEditAmountView";

export function ItemGroupsStackRouter() {
  const Stack = createStackNavigator();
  return (
    <NavigationContainer independent={true}>
      <Stack.Navigator initialRouteName="Item Groups">
        <Stack.Screen name="Item Groups" component={ItemGroupsScreen} />
        <Stack.Screen
          name="Sub Item Group"
          options={({ route }) => ({ title: route.params.name })}
          component={SubItemGroupScreen}
        />
        <Stack.Screen name="New ItemGroup" component={NewItemGroup} />
        <Stack.Screen name="New SubItemGroup" component={NewSubItemGroup} />
        <Stack.Screen name="QR Code" component={EntryCodeView} />
        <Stack.Screen name="Edit Amount" component={EntryEditAmountView} />
        <Stack.Screen name="New Entry" component={NewEntry} />
        <Stack.Screen name="Scanner" component={Scanner} />
        <Stack.Screen name="Scanner Result" component={ScannerResult} />
        <Stack.Screen name="Form Scanner" component={FormScanner} />
        <Stack.Screen
          name="Entry Details"
          component={EntryDetails}
          options={({ route }) => ({ title: route.params.entry.name })}
        />
      </Stack.Navigator>
    </NavigationContainer>
  );
}
