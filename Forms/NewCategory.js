import React from "react";
import { Text, View, TextInput, StyleSheet } from "react-native";
import { useDispatch, useSelector } from "react-redux";
import { addCategoryToInventories, nextId } from "../redux/actions";
import Button from "../Components/Button";

export function NewCategory({ navigation }) {
  const [text, onChangeText] = React.useState("");

  const dispatch = useDispatch();
  let nextID = useSelector((state) => state.idCounter);

  return (
    <View style={{ flex: 1, justifyContent: "center", alignItems: "center" }}>
      <View style={styles.formLine}>
        <Text style={styles.header}>Category Name</Text>
        <TextInput style={styles.input} onChangeText={onChangeText} value={text} placeholder="Name" />
      </View>
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
    width: 300,
    paddingHorizontal: 5,
    backgroundColor: "white",
    marginBottom: 5,
  },
  header: {
    fontSize: 20,
  },
  formLine: {
    marginBottom: 20,
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.23,
    shadowRadius: 2.62,
    elevation: 4,
  },
});
