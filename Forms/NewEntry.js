import React, { useState } from "react";
import { Text, View, TextInput, StyleSheet, FlatList, Modal } from "react-native";
import { useDispatch, useSelector } from "react-redux";
import { addEntryToItemGroup, nextId } from "../redux/actions";
import { Parameter } from "../Entities/DataStorage";
import Button from "../Components/Button";
import { Picker } from "@react-native-picker/picker";
import Ionicons from "@expo/vector-icons/Ionicons";
import { DeviceEventEmitter } from "react-native";
import { Input } from "native-base";

export function NewEntry({ route, navigation }) {
  const { parentIds } = route.params;
  const [name, onChangeName] = React.useState("");
  const [parameters, setParameters] = useState([]);

  const [modalVisible, setModalVisible] = useState(false);
  const [parameterName, setParameterName] = React.useState("");
  const [parameterType, setParameterType] = React.useState("");

  const dispatch = useDispatch();
  let nextID = useSelector((state) => state.idCounter);

  let event = null;

  return (
    <View style={{ flex: 1 }}>
      {getModal()}
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
                  <View style={{ flex: 1, flexDirection: "row" }}>
                    <Input
                      w="300"
                      color="black"
                      style={styles.input}
                      onChangeText={(text) => {
                        let temp = [...parameters];
                        temp[index].value = text;
                        setParameters(temp);
                      }}
                      value={parameters[index].value}
                      keyboardType={"default"}
                      placeholder={item.name}
                    />
                  </View>
                ) : item.type === "ean-8" || item.type === "ean-13" ? (
                  <View style={{ flex: 1, flexDirection: "row" }}>
                    <Input
                      w="300"
                      color="black"
                      style={styles.inputQR}
                      onChangeText={(text) => {
                        let temp = [...parameters];
                        temp[index].value = text;
                        setParameters(temp);
                      }}
                      keyboardType="numeric"
                      value={parameters[index].value}
                      placeholder={item.name}
                    />
                    <Ionicons
                      name="barcode-outline"
                      size={35}
                      color="#14213d"
                      onPress={() => {
                        event = DeviceEventEmitter.addListener("event.codeScanned", (eventData) =>
                          setParametersViaEvent(eventData)
                        );
                        navigation.navigate("Form Scanner", {
                          typeToScan: item.type,
                          index: index,
                        });
                      }}
                    />
                  </View>
                ) : item.type === "qr" ? (
                  <View style={{ flex: 1, flexDirection: "row" }}>
                    <Input
                      w="300"
                      color="black"
                      style={styles.inputQR}
                      onChangeText={(text) => {
                        let temp = [...parameters];
                        temp[index].value = text;
                        setParameters(temp);
                      }}
                      keyboardType="numeric"
                      value={parameters[index].value}
                      placeholder={item.name}
                    />
                    <Ionicons
                      name="qr-code-outline"
                      size={35}
                      color="#14213d"
                      onPress={() => {
                        event = DeviceEventEmitter.addListener("event.codeScanned", (eventData) =>
                          setParametersViaEvent(eventData)
                        );
                        navigation.navigate("Form Scanner", {
                          typeToScan: item.type,
                          index: index,
                        });
                      }}
                    />
                  </View>
                ) : (
                  <View style={{ flex: 1, flexDirection: "row" }}>
                    <Input
                      w="300"
                      color="black"
                      style={styles.input}
                      onChangeText={(text) => {
                        let temp = [...parameters];
                        temp[index].value = text;
                        setParameters(temp);
                      }}
                      value={parameters[index].value}
                      keyboardType={"numeric"}
                      placeholder={item.name}
                    />
                  </View>
                )}
              </View>
            );
          }}
        />
      </View>
      <View style={styles.btnWrapper}>
        <Button paddingHorizontal={16} title="Amount" onPress={() => addParameter("Amount", "number")}></Button>
        <Button paddingHorizontal={16} title="Unit" onPress={() => addParameter("Unit", "text")}></Button>
        <Button paddingHorizontal={16} title="EAN-8" onPress={() => addParameter("EAN-8", "ean-8")}></Button>
        <Button paddingHorizontal={16} title="EAN-13" onPress={() => addParameter("EAN-13", "ean-13")}></Button>
      </View>
      <View style={styles.btnWrapper}>
        <Button width="90%" title="+ new Parameter" onPress={() => setModalVisible(true)}></Button>
      </View>
      <View style={styles.btnWrapper}>
        <Button width="90%" color="green" title="Save" onPress={() => addNewEntryToItemGroup(name)}></Button>
      </View>
    </View>
  );

  function getModal() {
    return (
      <Modal
        animationType="slide"
        visible={modalVisible}
        onRequestClose={() => {
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
                <Picker.Item label="QR Code" value="qr" />
                <Picker.Item label="Ean 8" value="ean-8" />
                <Picker.Item label="Ean 13" value="ean-13" />
              </Picker>
            </View>
            <View style={[styles.btnWrapper, { marginTop: 100 }]}>
              <Button color="green" title="save" onPress={() => closeModalAndAddNewParameter()}></Button>
              <Button title="close" onPress={() => closeAndDiscardModal()}></Button>
            </View>
          </View>
        </View>
      </Modal>
    );
  }

  function setParametersViaEvent(eventData) {
    event.remove();
    let temp = [...parameters];
    let text = eventData.text;
    text = text.substring(1, text.length - 1);
    let index = eventData.index;
    temp[index].value = text;
    setParameters(temp);
  }

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
    marginBottom: 5,
  },
  inputQR: {
    height: 40,
    width: 255,
    paddingHorizontal: 5,
    marginRight: 10,
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
