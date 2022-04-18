import { Box, Button, Icon, Pressable, Text } from "native-base";
import { Platform, StyleSheet, StatusBar, FlatList, Dimensions, Animated } from "react-native";
import { useSelector } from "react-redux";
import EntryListEntry from "../Components/EntryListEntry";
import SubItemGroupListEntry from "../Components/SubItemGroupListEntry";
import Ionicons from "@expo/vector-icons/Ionicons";
import { TabView, SceneMap } from "react-native-tab-view";
import * as React from "react";

export function SubItemGroupScreen({ route, navigation }) {
  const { parentIds } = route.params;

  let DATA = getCorrectSubItemGroup(parentIds);

  const [index, setIndex] = React.useState(0);

  const [routes] = React.useState([
    { key: "first", title: "Item Groups" },
    { key: "second", title: "Entrys" },
  ]);

  const FirstRoute = () => (
    <Box flex={1} mx="4" mt="4">
      <Button
        height="12"
        leftIcon={<Icon as={Ionicons} name="add-circle-outline" size="lg" />}
        size={"lg"}
        mb="3"
        onPress={() =>
          navigation.navigate("New SubItemGroup", {
            parentIds: parentIds,
            name: DATA.name,
          })
        }
      >
        Item Group
      </Button>
      <FlatList data={DATA.subItemGroups} renderItem={renderSubItemGroupItem} keyExtractor={(item) => item.id} />
    </Box>
  );

  const SecondRoute = () => (
    <Box flex={1} mx="4" mt="4">
      <Button
        height="12"
        leftIcon={<Icon as={Ionicons} name="add-circle-outline" size="lg" />}
        size={"lg"}
        mb="3"
        onPress={() =>
          navigation.navigate("New Entry", {
            parentIds: parentIds,
            name: DATA.name,
          })
        }
      >
        Entry
      </Button>
      <FlatList data={DATA.data} renderItem={renderEntryItem} keyExtractor={(item) => item.id} />
    </Box>
  );

  const initialLayout = {
    width: Dimensions.get("window").width,
  };

  const renderScene = SceneMap({
    first: FirstRoute,
    second: SecondRoute,
  });

  const renderTabBar = (props) => {
    const inputRange = props.navigationState.routes.map((x, i) => i);
    return (
      <Box flexDirection="row" mx="4">
        {props.navigationState.routes.map((route, i) => {
          const opacity = props.position.interpolate({
            inputRange,
            outputRange: inputRange.map((inputIndex) => (inputIndex === i ? 1 : 0.5)),
          });
          const color = index === i ? "#e5e5e5" : "#a1a1aa";
          const borderColor = index === i ? "cyan.500" : "gray.400";
          return (
            <Pressable
              key={i}
              borderBottomWidth="3"
              borderColor={borderColor}
              flex={1}
              alignItems="center"
              p="3"
              onPress={() => {
                setIndex(i);
              }}
            >
              <Animated.Text
                style={{
                  color,
                  fontSize: 20,
                }}
              >
                {route.title}
              </Animated.Text>
            </Pressable>
          );
        })}
      </Box>
    );
  };

  return (
    <Box height="100%" bg="background.800" style={styles.container}>
      <TabView
        navigationState={{
          index,
          routes,
        }}
        renderScene={renderScene}
        renderTabBar={renderTabBar}
        onIndexChange={setIndex}
        initialLayout={initialLayout}
        style={{
          marginTop: StatusBar.currentHeight,
        }}
      />
    </Box>
  );
}

const renderSubItemGroupItem = ({ item }) => {
  return <SubItemGroupListEntry entry={item} parentIds={item.parentIds.concat(item.id)} />;
};

const renderEntryItem = ({ item }) => {
  return <EntryListEntry entry={item} parentIds={item.parentIds.concat(item.id)} />;
};

function getCorrectSubItemGroup(parentIds) {
  return useSelector((state) => {
    let itemgroup = state.data;
    itemgroup = state.data.find((entry) => entry.id === parentIds[0]);

    for (var i = 1; i < parentIds.length; i++) {
      itemgroup = itemgroup.subItemGroups.find((entry) => entry.id === parentIds[i]);
    }

    return itemgroup;
  });
}

const styles = StyleSheet.create({
  btnContainer: {
    flexDirection: "row",
    justifyContent: "space-between",
    paddingBottom: 5,
  },
  container: {
    flex: 1,
    paddingTop: Platform.OS === "ios" ? StatusBar.currentHeight + 15 : 15,
  },
  title: {
    fontSize: 24,
    color: "#14213d",
  },
});
