import { FlatList } from "react-native";
import { useSelector, useDispatch } from "react-redux";
import { Box, HStack, Button, Input, Icon } from "native-base";
import EntryListEntry from "./EntryListEntry";
import { exportDataToExcel, importData } from "../Services/XLSXHandler";
import React, { useState, useEffect } from "react";
import * as DocumentPicker from "expo-document-picker";
import Ionicons from "@expo/vector-icons/Ionicons";

export function InventoryList({ navigation }) {
  let DATA = useSelector((state) => state.data);
  const dispatch = useDispatch();

  let entries = getItemList(DATA);
  const [filteredEntries, setFilteredEntries] = React.useState(entries);

  const [searchText, setSearchText] = React.useState("");

  useEffect(() => {
    entries = getItemList(DATA);
    setFilteredEntries(entries);
  }, [DATA]);

  const pickDocument = async () => {
    let result = await DocumentPicker.getDocumentAsync({});
    await importData(result, DATA, dispatch);
    setSearchText("");
  };

  return (
    <Box bg="background.800" height="100%">
      <Box flex={1} mx="4" mt="4">
        <HStack w="100%">
          <Button height="8" size={"sm"} mb="3" w="49%" mr="1" onPress={() => pickDocument()}>
            Import
          </Button>
          <Button
            height="8"
            ml="1"
            size={"sm"}
            mb="3"
            w="49%"
            onPress={() => {
              exportDataToExcel(entries);
            }}
          >
            Export
          </Button>
        </HStack>
        <Input
          color="black"
          bg="white"
          onChangeText={(text) => filterEntrys(text)}
          value={searchText}
          placeholder="Search"
          variant="filled"
          h="12"
          mb="2"
          _focus={{ backgroundColor: "white" }}
          InputLeftElement={<Icon ml="2" size="4" color="gray.400" as={<Ionicons name="ios-search" />} />}
        ></Input>
        <FlatList data={filteredEntries} renderItem={renderEntryItem} keyExtractor={(item) => item.id} />
      </Box>
    </Box>
  );

  function filterEntrys(searchText) {
    if (searchText) {
      const filtered = entries.filter(function (item) {
        const nameUppercase = item.name.toUpperCase();
        const textUppercase = searchText.toUpperCase();
        return nameUppercase.includes(textUppercase);
      });
      setFilteredEntries(filtered);
    } else {
      setFilteredEntries(entries);
    }

    setSearchText(searchText);
  }

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
