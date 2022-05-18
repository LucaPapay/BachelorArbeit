import { Platform, StyleSheet, View, StatusBar, FlatList } from "react-native";
import { useSelector } from "react-redux";
import { Box, Button } from "native-base";
import SubItemGroupListEntry from "../Components/SubItemGroupListEntry";
import { Icon } from "native-base";
import Ionicons from "@expo/vector-icons/Ionicons";
import EntryListEntry from "../Components/EntryListEntry";
import { Text } from "native-base";

export function LowStockScreen({ navigation }) {
  let DATA = useSelector((state) => state.data);
  let lowStockEntrys = useSelector((state) => state.lowStockEntrys);
  let entrys = [];
  getEntrys();

  return (
    <Box bg="background.800" height="100%">
      <Box style={styles.container} mx="4">
        <View style={styles.btnContainer}></View>
        <FlatList data={entrys} renderItem={renderItem} keyExtractor={(item) => item.id} />
      </Box>
    </Box>
  );

  function getEntrys() {
    DATA.forEach((element) => {
      getEntryRecur(element);
    });
  }

  function getEntryRecur(itemGroup) {
    itemGroup.data.forEach((entry) => {
      if (lowStockEntrys.some((e) => e.entryId === entry.id)) {
        entrys.push(entry);
      }
    });
    itemGroup.subItemGroups.forEach((subItemGroup) => getEntryRecur(subItemGroup));
  }
}

const renderItem = ({ item }) => {
  return <EntryListEntry entry={item} parentIds={item.parentIds.concat(item.id)} />;
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
