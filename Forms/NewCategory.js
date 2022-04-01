import React from "react";
import { Text, View, TextInput, StyleSheet, Button } from "react-native";
import { useDispatch, useSelector } from "react-redux";
import { addCategoryToInventories, nextId } from "../redux/actions";

export function NewCategory({ navigation }) {
  const [text, onChangeText] = React.useState("");

  const dispatch = useDispatch();
  let nextID = useSelector((state) => state.idCounter);

  return (
    <View style={{ flex: 1, justifyContent: "center", alignItems: "center" }}>
      <Text>New Category</Text>
      <TextInput style={styles.input} onChangeText={onChangeText} value={text} placeholder="category Name" />
      <Button title="SAVE" onPress={() => addNewInventoryCategroy(dispatch, nextID, text, navigation)}></Button>
    </View>
  );
}

function addNewInventoryCategroy(dispatch, nextID, text, navigation) {
  dispatch(nextId());
  dispatch(addCategoryToInventories(text, nextID));
  navigation.goBack();
}

const styles = StyleSheet.create({
  input: {
    height: 40,
    margin: 12,
    borderWidth: 1,
    padding: 10,
  },
});
