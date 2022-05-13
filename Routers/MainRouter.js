import { NavigationContainer } from "@react-navigation/native";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import Ionicons from "@expo/vector-icons/Ionicons";
import { DebugScreen } from "../Screens/DebugScreen";
import { ItemGroupsStackRouter } from "./ItemGroupsStackRouter";
import { HomeScreenStackRouter } from "./HomeScreenStackRouter";
import { LowStockStackRouter } from "./LowStockStackRouter";
import { StyleSheet } from "react-native";

const Tab = createBottomTabNavigator();

export function MainRouter() {
  return (
    <NavigationContainer>
      <Tab.Navigator
        screenOptions={({ route }) => ({
          tabBarIcon: ({ focused, color, size }) => getTabIcons(route, focused, color, size),
          tabBarActiveTintColor: "#14213d",
          tabBarInactiveTintColor: "gray",
        })}
      >
        <Tab.Screen name={"Home"} component={HomeScreenStackRouter} options={{ headerShown: false }} />
        <Tab.Screen name={"Item Groups"} component={ItemGroupsStackRouter} options={{ headerShown: false }} />
        <Tab.Screen name={"Low Stock"} component={LowStockStackRouter} options={{ headerShown: false }} />
        <Tab.Screen name="Debug" component={DebugScreen} />
      </Tab.Navigator>
    </NavigationContainer>
  );
}

function getTabIcons(route, focused, color, size) {
  let iconName;

  if (route.name === "Home") {
    iconName = focused ? "ios-information-circle" : "ios-information-circle-outline";
  } else if (route.name === "Item Groups") {
    iconName = focused ? "file-tray-stacked" : "file-tray-stacked-outline";
  } else if (route.name === "Low Stock") {
    iconName = focused ? "cart" : "cart-outline";
  } else if (route.name === "Debug") {
    iconName = focused ? "settings" : "settings-outline";
  }

  return <Ionicons name={iconName} size={size} color={color} />;
}

const styles = StyleSheet.create({
  headerFont: {
    fontSize: 20,
    fontWeight: "600",
  },
  header: {
    flex: 3,
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
  },
  title: {
    fontSize: 24,
  },
});
