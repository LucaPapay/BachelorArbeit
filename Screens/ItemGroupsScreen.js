import { Platform, StyleSheet, View, StatusBar, FlatList } from "react-native";
import { useSelector } from "react-redux";
import { Box, Button, Center, Text } from "native-base";
import SubItemGroupListEntry from "../Components/SubItemGroupListEntry";
import { Icon } from "native-base";
import Ionicons from "@expo/vector-icons/Ionicons";

import { useDispatch } from "react-redux";
import { addItemGroupToInventories, addNewCategory, addSubItemGroup, initalState, nextId } from "../redux/actions";

export function ItemGroupsScreen({ navigation }) {
  const dispatch = useDispatch();
  //dispatch(initalState());
  let DATA = useSelector((state) => state.data);
  let categories = useSelector((state) => state.categories);
  let hasCategories = categories.length > 0;

  return (
    <Box bg="background.800" height="100%">
      <Box style={styles.container} mx="4">
        {hasCategories ? (
          <>
            <View style={styles.btnContainer}>
              <Button
                height="12"
                leftIcon={<Icon as={Ionicons} name="add-circle-outline" size="lg" />}
                size={"lg"}
                onPress={() => navigation.navigate("New ItemGroup")}
              >
                ItemGroup
              </Button>
              <Button
                height="12"
                leftIcon={<Icon as={Ionicons} name="barcode-outline" size="lg" />}
                size={"lg"}
                onPress={() => navigation.navigate("Scanner")}
              >
                Scanner
              </Button>
            </View>
            <FlatList data={DATA} renderItem={renderItem} keyExtractor={(item) => item.id} />
          </>
        ) : (
          <Center>
            <Text mt="20">Please create your first Item Catgeory</Text>
          </Center>
        )}
      </Box>
    </Box>
  );
}

const renderItem = ({ item }) => {
  return <SubItemGroupListEntry entry={item} parentIds={[item.id]} />;
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingTop: Platform.OS === "ios" ? StatusBar.currentHeight + 15 : 15,
  },
  btnContainer: {
    flexDirection: "row",
    justifyContent: "space-between",
    paddingBottom: 5,
  },
});
