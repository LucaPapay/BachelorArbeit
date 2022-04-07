import { Text, View, StyleSheet, TextInput } from "react-native";
import { useDispatch, useSelector } from "react-redux";
import { initalState, nextId } from "../redux/actions";
import Button from "../Components/Button";
import React, { useState } from "react";

export function DebugScreen() {
  const dispatch = useDispatch();
  let counter = useSelector((state) => state.idCounter);
  let store = useSelector((state) => state);
  const [title, onChangeName] = React.useState("");
  const [ean, setEan] = useState("885909128525");

  return (
    <View
      style={{
        flex: 1,
        justifyContent: "space-between",
        alignItems: "center",
        marginTop: 100,
        marginBottom: 100,
      }}
    >
      <Button color="tomato" title="RESET STORE" onPress={() => dispatch(initalState())} />
      <Text>
        Current ID: {counter} <Button color="tomato" title="+" onPress={() => dispatch(nextId())} />
      </Text>
      <Button color="tomato" title="Store" onPress={() => console.log(store)} />
      <Button color="tomato" title="TEST api" onPress={() => testAPI()} />
      <TextInput style={styles.input} onChangeText={setEan} value={ean} placeholder="EAN / UPC / ISBN" />
      <Text>Name: {title}</Text>
    </View>
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
