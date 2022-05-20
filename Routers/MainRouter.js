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
        <Tab.Screen name={"Item Groups"} component={ItemGroupsStackRouter} options={{ headerShown: false }} />
        <Tab.Screen name={"Categories"} component={HomeScreenStackRouter} options={{ headerShown: false }} />
        <Tab.Screen name={"Low Stock"} component={LowStockStackRouter} options={{ headerShown: false }} />
        <Tab.Screen name="Debug" component={DebugScreen} />
      </Tab.Navigator>
    </NavigationContainer>
  );
}

function getTabIcons(route, focused, color, size) {
  let iconName;

  if (route.name === "Categories") {
    iconName = focused ? "apps" : "apps-outline";
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
