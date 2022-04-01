import { Platform, StyleSheet, Text, View, StatusBar, FlatList } from "react-native";
import { useSelector } from "react-redux";
import Button from "../Components/Button";
import SubCategoryListEntry from "../Components/SubCategoryListEntry";

export function SubInventoryScreen({ route, navigation }) {
  const { parentIds } = route.params;

  let DATA = getCorrectSubCategory(parentIds);

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
          title="add SubCategory"
          onPress={() =>
            navigation.navigate("New SubCategory", {
              parentIds: parentIds,
              name: DATA.name,
            })
          }
        ></Button>
      </View>
      <Text style={styles.title}>Sub Categories</Text>
      <FlatList data={DATA.subCategories} renderItem={renderItem} keyExtractor={(item) => item.id} />
      <Text style={styles.title}>Entrys</Text>
      <FlatList data={DATA.data} renderItem={renderItem} keyExtractor={(item) => item.id} />
    </View>
  );
}

const renderItem = ({ item }) => {
  return <SubCategoryListEntry entry={item} parentIds={item.parentIds.concat(item.id)} />;
};

function getCorrectSubCategory(parentIds) {
  return useSelector((state) => {
    let category = state.data;
    category = state.data.find((entry) => entry.id === parentIds[0]);

    for (var i = 1; i < parentIds.length; i++) {
      category = category.subCategories.find((entry) => entry.id === parentIds[i]);
    }

    return category;
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
