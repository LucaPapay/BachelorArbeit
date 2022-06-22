import { View, StyleSheet, TextInput } from "react-native";
import { useDispatch, useSelector } from "react-redux";
import {
  addEntryToItemGroup,
  addItemGroupToInventories,
  addLowStockEntry,
  addNewCategory,
  addSubItemGroup,
  addSubItemGroupWithoutParentIds,
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

  let ITEMS_PER_LAYER_WIDE = 20;

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
        <Button onPress={() => speedTestAdd()}>TEST speed</Button>
        <Button onPress={() => speedTestWideWithoutParents()}>TEST speed without Parents</Button>
        <TextInput style={styles.input} onChangeText={setEan} value={ean} placeholder="EAN / UPC / ISBN" />
        <Text>Name: {title}</Text>
      </VStack>
    </Box>
  );

  function speedTestAdd() {
    let ITEMS_PER_LAYER = 3;
    const start = Date.now();

    let id = 1;
    dispatch(addNewCategory(id, "Test Category", [], "cube"));

    let id5 = [];

    for (let index = 0; index < ITEMS_PER_LAYER; index++) {
      id++;
      dispatch(nextId());
      dispatch(addItemGroupToInventories("test" + id, id));
      let parentId = id;
      for (let j = 0; j < ITEMS_PER_LAYER; j++) {
        id++;
        addSIG(id, "test " + id, [parentId]);
        let id1 = [parentId, id];
        for (let k = 0; k < ITEMS_PER_LAYER; k++) {
          id++;
          addSIG(id, "test " + id, id1);
          let id2 = id1.concat(id);
          for (let l = 0; l < ITEMS_PER_LAYER; l++) {
            id++;
            addSIG(id, "test " + id, id2);
            let id3 = id2.concat(id);
            for (let a = 0; a < ITEMS_PER_LAYER; a++) {
              id++;
              addSIG(id, "test " + id, id3);
              let id4 = id3.concat(id);
              for (let b = 0; b < ITEMS_PER_LAYER; b++) {
                id++;
                addSIG(id, "test " + id, id4);
                id5 = id4.concat(id);
                for (let c = 0; c < ITEMS_PER_LAYER; c++) {
                  id++;
                  addSIG(id, "test " + id, id5);
                }
              }
            }
          }
        }
      }
    }

    const millis = Date.now() - start;
    console.log(`seconds elapsed = ${millis / 1000}`);

    addAtTheEnd(id5, id);
  }

  function addAtTheEnd(parentIds, id) {
    const start = Date.now();

    for (let c = 0; c < 10; c++) {
      id++;
      addSIG(id, "test " + id, parentIds);
    }

    const millis = Date.now() - start;
    console.log(`Time to add another 10 fast = ${millis / 1000}`);
  }

  function addAtTheEndWithoutParent(parentIds, id) {
    const start = Date.now();

    for (let c = 0; c < 10; c++) {
      id++;
      addSIGWithoutParents(id, "test " + id, parentIds);
    }

    const millis = Date.now() - start;
    console.log(`Time to add another 10 slow = ${millis / 1000}`);
  }

  function speedTestAddWithoutParents() {
    let ITEMS_PER_LAYER = 1;
    let id5 = [];
    const start = Date.now();

    let id = 1;
    dispatch(addNewCategory(id, "Test Category", [], "cube"));

    for (let index = 0; index < ITEMS_PER_LAYER; index++) {
      id++;
      dispatch(nextId());
      dispatch(addItemGroupToInventories("test" + id, id));
      let parentId = id;
      for (let j = 0; j < ITEMS_PER_LAYER; j++) {
        id++;
        addSIGWithoutParents(id, "test " + id, [parentId]);
        let id1 = [parentId, id];
        for (let k = 0; k < ITEMS_PER_LAYER; k++) {
          id++;
          addSIGWithoutParents(id, "test " + id, id1);
          let id2 = id1.concat(id);
          for (let l = 0; l < ITEMS_PER_LAYER; l++) {
            id++;
            addSIGWithoutParents(id, "test " + id, id2);
            let id3 = id2.concat(id);
            for (let a = 0; a < ITEMS_PER_LAYER; a++) {
              id++;
              addSIGWithoutParents(id, "test " + id, id3);
              let id4 = id3.concat(id);
              for (let b = 0; b < ITEMS_PER_LAYER; b++) {
                id++;
                addSIGWithoutParents(id, "test " + id, id4);
                id5 = id4.concat(id);
                for (let c = 0; c < ITEMS_PER_LAYER; c++) {
                  id++;
                  addSIGWithoutParents(id, "test " + id, id5);
                }
              }
            }
          }
        }
      }
    }

    const millis = Date.now() - start;
    console.log(`seconds elapsed = ${millis / 1000}`);
  }

  function speedTestWide() {
    const start = Date.now();
    let ITEMS_PER_LAYER = ITEMS_PER_LAYER_WIDE;

    let id = 1;
    dispatch(addNewCategory(id, "Test Category", [], "cube"));

    for (let index = 0; index < ITEMS_PER_LAYER; index++) {
      id++;
      dispatch(nextId());
      dispatch(addItemGroupToInventories("test" + id, id));
      let parentId = id;
      for (let j = 0; j < ITEMS_PER_LAYER; j++) {
        id++;
        addSIG(id, "test " + id, [parentId]);
        let id1 = [parentId, id];
        for (let k = 0; k < ITEMS_PER_LAYER; k++) {
          id++;
          addSIG(id, "test " + id, id1);
        }
      }
    }

    const millis = Date.now() - start;
    console.log(`seconds elapsed = ${millis / 1000}`);
  }

  function speedTestWideWithoutParents() {
    const start = Date.now();
    let ITEMS_PER_LAYER = ITEMS_PER_LAYER_WIDE;

    let id = 1;
    dispatch(addNewCategory(id, "Test Category", [], "cube"));

    for (let index = 0; index < ITEMS_PER_LAYER; index++) {
      id++;
      dispatch(nextId());
      dispatch(addItemGroupToInventories("test" + id, id));
      let parentId = id;
      for (let j = 0; j < ITEMS_PER_LAYER; j++) {
        id++;
        addSIGWithoutParents(id, "test " + id, [parentId]);
        let id1 = [parentId, id];
        for (let k = 0; k < ITEMS_PER_LAYER; k++) {
          id++;
          addSIGWithoutParents(id, "test " + id, id1);
        }
      }
    }

    const millis = Date.now() - start;
    console.log(`seconds elapsed = ${millis / 1000}`);
  }

  function addSIG(id, name, parentIds) {
    dispatch(nextId());
    dispatch(addSubItemGroup(id, name, parentIds));
  }

  function addSIGWithoutParents(id, name, parentIds) {
    dispatch(nextId());
    dispatch(addSubItemGroupWithoutParentIds(id, name, parentIds));
  }

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
    temp = new Parameter("Amount", "number", "10");
    temp.id = 1;
    parameters.push(temp);
    temp = new Parameter("Threshold", "number", "5");
    temp.id = 2;
    parameters.push(temp);

    addEntry(19, "Tisch", [2, 5], parameters, "cube");

    parameters = [];
    temp = new Parameter("Amount", "number", "10");
    temp.id = 1;
    parameters.push(temp);
    temp = new Parameter("Threshold", "number", "20");
    temp.id = 2;
    parameters.push(temp);

    addEntry(20, "Sessel", [2, 5], parameters, "cube");
    dispatch(addLowStockEntry("Gushaus", 20, [2, 5]));
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
