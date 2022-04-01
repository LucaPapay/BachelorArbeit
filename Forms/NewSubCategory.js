import React from "react";
import { Text, View, TextInput, StyleSheet, Button } from "react-native";
import { useDispatch, useSelector } from "react-redux";
import { addSubCategory, nextId } from "../redux/actions";

export function NewSubCategory({ route, navigation }) {
  const { parentIds } = route.params;
  const [text, onChangeText] = React.useState("");

  const dispatch = useDispatch();
  let nextID = useSelector((state) => state.idCounter);

  return (
    <View style={{ flex: 1, justifyContent: "center", alignItems: "center" }}>
      <Text>New SubCategory</Text>
      <TextInput style={styles.input} onChangeText={onChangeText} value={text} placeholder="category Name" />
      <Button
        title="SAVE"
        onPress={() => addSubCategoryToCategory(dispatch, nextID, text, navigation, parentIds)}
      ></Button>
    </View>
  );
}

function addSubCategoryToCategory(dispatch, nextID, text, navigation, parentIds) {
  dispatch(nextId());
  dispatch(addSubCategory(nextID, text, parentIds));
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
