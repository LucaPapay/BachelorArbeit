import { Platform, StyleSheet, Text, View, StatusBar, FlatList } from "react-native";
import { useSelector } from "react-redux";
import Button from "../Components/Button";
import EntryListEntry from "../Components/EntryListEntry";
import SubItemGroupListEntry from "../Components/SubItemGroupListEntry";

export function SubItemGroupScreen({ route, navigation }) {
  const { parentIds } = route.params;

  let DATA = getCorrectSubItemGroup(parentIds);

  return (
    <View style={styles.container}>
      <View style={styles.btnContainer}>
        <Button
          title="add Entry"
          onPress={() =>
            navigation.navigate("New Entry", {
              parentIds: parentIds,
              name: DATA.name,
            })
          }
        ></Button>
        <Button
          title="add Item Group"
          onPress={() =>
            navigation.navigate("New SubItemGroup", {
              parentIds: parentIds,
              name: DATA.name,
            })
          }
        ></Button>
      </View>
      <View style={{ flex: 2 }}>
        <Text style={styles.title}>Item Groups</Text>
        <FlatList data={DATA.subItemGroups} renderItem={renderSubItemGroupItem} keyExtractor={(item) => item.id} />
      </View>
      <View style={{ flex: 3 }}>
        <Text style={styles.title}>Entrys</Text>
        <FlatList data={DATA.data} renderItem={renderEntryItem} keyExtractor={(item) => item.id} />
      </View>
    </View>
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
    paddingTop: Platform.OS === "ios" ? StatusBar.currentHeight + 10 : 10,
    marginHorizontal: 16,
  },
  title: {
    fontSize: 24,
    color: "#14213d",
  },
});
