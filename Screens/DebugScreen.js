import { View, StyleSheet, TextInput } from "react-native";
import { useDispatch, useSelector } from "react-redux";
import { initalState, nextId } from "../redux/actions";
import { Box, Button, VStack } from "native-base";
import React, { useState } from "react";
import { Text } from "native-base";

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
        <TextInput style={styles.input} onChangeText={setEan} value={ean} placeholder="EAN / UPC / ISBN" />
        <Text>Name: {title}</Text>
      </VStack>
    </Box>
  );

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
