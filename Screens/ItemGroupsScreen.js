import { Platform, StyleSheet, Text, View, StatusBar, FlatList } from "react-native";
import { useSelector } from "react-redux";
import Button from "../Components/Button";
import SubItemGroupListEntry from "../Components/SubItemGroupListEntry";

export function ItemGroupsScreen({ navigation }) {
  let DATA = useSelector((state) => state.data);

  return (
    <View style={styles.container}>
      <View style={styles.btnContainer}>
        <Button title="add ItemGroup" onPress={() => navigation.navigate("New ItemGroup")}></Button>
        <Button title="Scanner Test" onPress={() => navigation.navigate("Scanner")}></Button>
      </View>
      <FlatList data={DATA} renderItem={renderItem} keyExtractor={(item) => item.id} />
    </View>
  );
}

const renderItem = ({ item }) => {
  return <SubItemGroupListEntry entry={item} parentIds={[item.id]} />;
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingTop: Platform.OS === "ios" ? StatusBar.currentHeight + 10 : 10,
    marginHorizontal: 16,
  },
  btnContainer: {
    flexDirection: "row",
    justifyContent: "space-between",
    paddingBottom: 5,
  },
});
