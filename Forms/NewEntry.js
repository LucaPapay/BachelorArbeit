import React, { useState } from "react";
import { Text, View, TextInput, StyleSheet, FlatList, Modal } from "react-native";
import { useDispatch, useSelector } from "react-redux";
import { addEntryToItemGroup, nextId } from "../redux/actions";
import { Parameter } from "../Entities/DataStorage";
import Button from "../Components/Button";
import { Picker } from "@react-native-picker/picker";

export function NewEntry({ route, navigation }) {
  const { parentIds } = route.params;
  const [name, onChangeName] = React.useState("");
  const [parameters, setParameters] = useState([]);

  const [modalVisible, setModalVisible] = useState(false);
  const [parameterName, setParameterName] = React.useState("");
  const [parameterType, setParameterType] = React.useState("");

  const dispatch = useDispatch();
  let nextID = useSelector((state) => state.idCounter);

  return (
    <View style={{ flex: 1 }}>
      <Modal
        animationType="slide"
        visible={modalVisible}
        onRequestClose={() => {
          Alert.alert("Modal has been closed.");
          setModalVisible(!modalVisible);
        }}
      >
        <View style={styles.centeredView}>
          <View style={styles.modalView}>
            <Text style={styles.header}>New Parameter</Text>
            <View style={styles.formLine}>
              <Text style={styles.header}>Name</Text>
              <TextInput
                style={styles.input}
                onChangeText={setParameterName}
                value={parameterName}
                placeholder="Parameter Name"
              />
            </View>
            <View style={styles.formLine}>
              <Text style={styles.header}>Type:</Text>
              <Picker
                style={{ width: 300, marginBottom: 5, height: 50, marginTop: -10 }}
                selectedValue={parameterType}
                prompt="Parameter Type"
                onValueChange={(itemValue, itemIndex) => setParameterType(itemValue)}
              >
                <Picker.Item label="Text" value="text" />
                <Picker.Item label="Number" value="number" />
              </Picker>
            </View>
            <View style={[styles.btnWrapper, { marginTop: 100 }]}>
              <Button color="green" title="save" onPress={() => closeModalAndAddNewParameter()}></Button>
              <Button title="close" onPress={() => closeAndDiscardModal()}></Button>
            </View>
          </View>
        </View>
      </Modal>
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
                {item.type === "text" ? (
                  <TextInput
                    style={styles.input}
                    onChangeText={(text) => {
                      let temp = [...parameters];
                      temp[index].value = text;
                      setParameters(temp);
                    }}
                    value={parameters[index].value}
                    placeholder={item.name}
                  />
                ) : (
                  <TextInput
                    style={styles.input}
                    onChangeText={(text) => {
                      let temp = [...parameters];
                      temp[index].value = text;
                      setParameters(temp);
                    }}
                    keyboardType="numeric"
                    value={parameters[index].value}
                    placeholder={item.name}
                  />
                )}
              </View>
            );
          }}
        />
      </View>
      <View style={styles.btnWrapper}>
        <Button color="green" title="Save" onPress={() => addNewEntryToItemGroup(name)}></Button>
      </View>
      <View style={styles.btnWrapper}>
        <Button title="+ Amount" onPress={() => addParameter("Amount", "number")}></Button>
        <Button title="+ Unit" onPress={() => addParameter("Unit", "text")}></Button>
      </View>
      <View style={styles.btnWrapper}>
        <Button title="+ new Parameter" onPress={() => setModalVisible(true)}></Button>
      </View>
    </View>
  );

  function addParameter(name, type) {
    let newParameter = new Parameter(name, type, "");
    newParameter.id = parameters.length;
    setParameters((parameters) => [...parameters, newParameter]);
  }

  function addNewEntryToItemGroup(name) {
    dispatch(nextId());
    dispatch(addEntryToItemGroup(nextID, name, parentIds, parameters));
    navigation.goBack();
  }

  function closeModalAndAddNewParameter() {
    addParameter(parameterName, parameterType);
    setParameterName("");
    setParameterType("");
    setModalVisible(false);
  }

  function closeAndDiscardModal() {
    setParameterName("");
    setParameterType("");
    setModalVisible(false);
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
    justifyContent: "center",
    alignItems: "baseline",
    marginBottom: 8,
    flexDirection: "row",
  },
  centeredView: {
    flex: 1,
    marginTop: 22,
  },
  modalView: {
    flex: 1,
    margin: 20,
    backgroundColor: "#e5e5e5",
    borderRadius: 20,
    padding: 35,
    alignItems: "center",
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 4,
    elevation: 5,
  },
});
