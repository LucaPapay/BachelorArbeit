import { FlatList } from "react-native";
import { useSelector } from "react-redux";
import { Box, HStack, Button } from "native-base";
import EntryListEntry from "./EntryListEntry";
import { exportDataToExcel } from "../Services/XLSXHandler";

export function InventoryList({ navigation }) {
  let DATA = useSelector((state) => state.data);
  let entries = getItemList(DATA);

  return (
    <Box bg="background.800" height="100%">
      <Box flex={1} mx="4" mt="4">
        <HStack w="100%">
          <Button height="8" size={"md"} mb="3" w="49%" mr="1">
            Import
          </Button>
          <Button
            height="8"
            ml="1"
            size={"md"}
            mb="3"
            w="49%"
            onPress={() => {
              exportDataToExcel(entries);
            }}
          >
            Export
          </Button>
        </HStack>
        <FlatList data={entries} renderItem={renderEntryItem} keyExtractor={(item) => item.id} />
      </Box>
    </Box>
  );

  function getItemList(itemGroup) {
    let entries = [];
    for (let i = 0; i < itemGroup.length; i++) {
      entries = entries.concat(recurList(itemGroup[i]));
    }
    return entries;
  }

  function recurList(itemGroup) {
    let entries = itemGroup.data;

    for (let i = 0; i < itemGroup.subItemGroups.length; i++) {
      entries = entries.concat(recurList(itemGroup.subItemGroups[i]));
    }

    return entries;
  }
}

const renderEntryItem = ({ item }) => {
  return <EntryListEntry entry={item} parentIds={item.parentIds.concat(item.id)} />;
};
