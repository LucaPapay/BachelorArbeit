import React, { useState } from "react";
import { Text, View, TextInput, StyleSheet, FlatList } from "react-native";
import { useDispatch, useSelector } from "react-redux";
import { addEntryToCategory, nextId } from "../redux/actions";
import { Parameter } from "../Entities/DataStorage";
import Button from "../Components/Button";

export function NewEntry({ route, navigation }) {
  const { parentIds } = route.params;
  const [name, onChangeName] = React.useState("");

  const [textInputs, setTextInputs] = useState([]);

  const [parameters, setParameters] = useState([]);
  const dispatch = useDispatch();
  let nextID = useSelector((state) => state.idCounter);

  return (
    <View style={{ flex: 1 }}>
      <View style={{ flex: 8, justifyContent: "flex-start", alignItems: "center", marginTop: 20 }}>
        <Text style={styles.header}></Text>
        <View style={styles.formLine}>
          <Text style={styles.header}>Name:</Text>
          <TextInput style={styles.input} onChangeText={onChangeName} value={name} placeholder="Name" />
        </View>
        <FlatList
          data={parameters}
          keyExtractor={(item) => item.id}
          renderItem={({ item, index }) => {
            return (
              <View style={styles.formLine}>
                <Text style={styles.header}>{item.name}</Text>
                <TextInput
                  style={styles.input}
                  onChangeText={(text) => {
                    let temp = [...parameters];
                    temp[index].value = text;
                    setParameters(temp);
                  }}
                  value={textInputs[index]}
                  placeholder={item.name}
                />
              </View>
            );
          }}
        />
        <Button title="Save" onPress={() => addNewEntryToCategory(name)}></Button>
      </View>
      <View style={styles.btnWrapper}>
        <Button title="+ Amount" onPress={addParameter}></Button>
        <Button title="+ Amount"></Button>
      </View>
    </View>
  );

  function addParameter() {
    let newParameter = new Parameter("amount", "text", "");
    newParameter.id = parameters.length;
    setParameters((parameters) => [...parameters, newParameter]);
  }

  function addNewEntryToCategory(name) {
    dispatch(nextId());
    dispatch(addEntryToCategory(nextID, name, parentIds, parameters));
    navigation.goBack();
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
  btnWrapper: {
    flex: 1,
    justifyContent: "space-evenly",
    alignItems: "baseline",
    marginBottom: 20,
    flexDirection: "row",
  },
});
