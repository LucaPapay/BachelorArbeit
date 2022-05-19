import { View, StyleSheet, TextInput } from "react-native";
import { useDispatch, useSelector } from "react-redux";
import {
  addEntryToItemGroup,
  addItemGroupToInventories,
  addLowStockEntry,
  addNewCategory,
  addSubItemGroup,
  initalState,
  nextId,
} from "../redux/actions";
import { Box, Button, VStack } from "native-base";
import React, { useState } from "react";
import { Text } from "native-base";
import { InventoryItemGroup, Parameter } from "../Entities/DataStorage";

export function DebugScreen() {
  const dispatch = useDispatch();
  let counter = useSelector((state) => state.idCounter);
  let store = useSelector((state) => state);
  const [title, onChangeName] = React.useState("");
  const [ean, setEan] = useState("885909128525");

  return (
    <Box bg="background.800" height="100%">
      <VStack space={10} alignItems="center" mt={10}>
        <Button onPress={() => dispatch(initalState())}>Reset</Button>
        <Text fontSize="lg">Current ID: {counter}</Text>
        <Button height="8" onPress={() => dispatch(nextId())}>
          id plus
        </Button>
        <Button onPress={() => console.log(store)}>Store</Button>
        <Button onPress={() => testAPI()}>TEST api</Button>
        <Button onPress={() => testData()}>TEST Data</Button>
        <TextInput style={styles.input} onChangeText={setEan} value={ean} placeholder="EAN / UPC / ISBN" />
        <Text>Name: {title}</Text>
      </VStack>
    </Box>
  );

  function testData() {
    let parameters = [];
    let temp = new Parameter("Amount", "number", "");
    temp.id = 1;
    parameters.push(temp);
    temp = new Parameter("Threshold", "number", "");
    temp.id = 2;
    parameters.push(temp);
    dispatch(nextId());
    dispatch(addNewCategory(1, "Test Category", parameters, "cube"));
    dispatch(nextId());
    dispatch(addItemGroupToInventories("Freihaus", 2));
    dispatch(nextId());
    dispatch(addItemGroupToInventories("Hauptgebäude", 3));
    dispatch(nextId());
    dispatch(addItemGroupToInventories("Gushaus", 4));

    addSIG(5, "Erdgeschoss", [2]);
    addSIG(6, "1. Stock", [2]);
    addSIG(7, "2. Stock", [2]);
    addSIG(8, "3. Stock", [2]);
    addSIG(9, "4. Stock", [2]);
    addSIG(10, "5. Stock", [2]);

    addSIG(11, "Erdgeschoss", [3]);
    addSIG(12, "1. Stock", [3]);
    addSIG(13, "2. Stock", [3]);

    addSIG(14, "Erdgeschoss", [4]);
    addSIG(15, "1. Stock", [4]);
    addSIG(16, "2. Stock", [4]);

    addSIG(17, "6. Stock", [2]);
    addSIG(18, "7. Stock", [2]);

    parameters = [];
    temp = new Parameter("Amount", "number", 10);
    temp.id = 1;
    parameters.push(temp);
    temp = new Parameter("Threshold", "number", 5);
    temp.id = 2;
    parameters.push(temp);

    addEntry(19, "Tisch", [2, 5], parameters, "cube");

    parameters = [];
    temp = new Parameter("Amount", "number", 10);
    temp.id = 1;
    parameters.push(temp);
    temp = new Parameter("Threshold", "number", 20);
    temp.id = 2;
    parameters.push(temp);

    addEntry(20, "Sessel", [2, 5], parameters, "cube");
    dispatch(addLowStockEntry("Gushaus", 20, [2, 5]));
  }

  function addSIG(id, name, parentIds) {
    dispatch(nextId());
    dispatch(addSubItemGroup(id, name, parentIds));
  }

  function addEntry(id, name, parentIds, parameters, icon) {
    dispatch(nextId());
    dispatch(addEntryToItemGroup(id, name, parentIds, parameters, icon));
  }

  function testAPI() {
    fetch("https://api.upcitemdb.com/prod/trial/lookup?upc=" + ean)
      .then((response) => response.json())
      .then((json) => {
        if (json.code === "OK") {
          onChangeName(json.items[0].title);
        } else {
          onChangeName(json.message);
        }
      })
      .catch((error) => {
        console.error(error);
      });
  }
}

const styles = StyleSheet.create({
  input: {
    height: 40,
    width: 300,
    paddingHorizontal: 5,
    backgroundColor: "white",
    marginBottom: 5,
  },
});
