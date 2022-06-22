import { Platform, StyleSheet, View, StatusBar, FlatList } from "react-native";
import { useSelector } from "react-redux";
import { Box, Button, Center, Text } from "native-base";
import SubItemGroupListEntry from "../Components/SubItemGroupListEntry";
import { Icon } from "native-base";
import Ionicons from "@expo/vector-icons/Ionicons";
import EntryListEntry from "./EntryListEntry";

import { useDispatch } from "react-redux";
import { addItemGroupToInventories, addNewCategory, addSubItemGroup, initalState, nextId } from "../redux/actions";

export function InventoryList({ navigation }) {
  const dispatch = useDispatch();
  let DATA = useSelector((state) => state.data);

  let entries = getItemList(DATA);

  return (
    <Box bg="background.800" height="100%">
      <Box flex={1} mx="4" mt="4">
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
