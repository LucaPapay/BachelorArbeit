import React from "react";
import { Text, View, TextInput, StyleSheet, Button } from "react-native";
import { useDispatch, useSelector } from "react-redux";
import { addEntryToCategory, addCategoryToInventories, nextId } from "../redux/actions";

export function NewEntry({ route, navigation }) {
  const { parentIds } = route.params;
  const [text, onChangeText] = React.useState("");

  const dispatch = useDispatch();
  let nextID = useSelector((state) => state.idCounter);

  return (
    <View style={{ flex: 1, justifyContent: "center", alignItems: "center" }}>
      <Text>New Entry Or New Sub Category</Text>
      <TextInput style={styles.input} onChangeText={onChangeText} value={text} placeholder="Name" />
      <Button
        title="SAVE Entry"
        onPress={() => addNewEntryToCategory(dispatch, nextID, text, navigation, parentIds)}
      ></Button>
    </View>
  );
}

function addNewEntryToCategory(dispatch, nextID, text, navigation, parentIds) {
  dispatch(nextId());
  dispatch(addEntryToCategory(nextID, text, parentIds));
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
