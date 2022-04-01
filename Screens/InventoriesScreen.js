import { Platform, StyleSheet, Text, View, StatusBar, FlatList } from "react-native";
import { useSelector } from "react-redux";
import Button from "../Components/Button";
import SubCategoryListEntry from "../Components/SubCategoryListEntry";

export function InventoriesScreen({ navigation }) {
  let DATA = useSelector((state) => state.data);

  return (
    <View style={styles.container}>
      <Button title="add Category" onPress={() => navigation.navigate("New Category")}></Button>
      <FlatList data={DATA} renderItem={renderItem} keyExtractor={(item) => item.id} />
    </View>
  );
}

const renderItem = ({ item }) => {
  return <SubCategoryListEntry entry={item} parentIds={[item.id]} />;
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingTop: Platform.OS === "ios" ? StatusBar.currentHeight + 10 : 10,
    marginHorizontal: 16,
  },
});
