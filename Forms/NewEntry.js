import React, { useState } from "react";
import { StyleSheet, FlatList, Modal, DeviceEventEmitter } from "react-native";
import { useDispatch, useSelector } from "react-redux";
import { addEntryToItemGroup, nextId, addLowStockEntry } from "../redux/actions";
import { Parameter } from "../Entities/DataStorage";
import { Picker } from "@react-native-picker/picker";
import Ionicons from "@expo/vector-icons/Ionicons";
import { Input, Box, Center, VStack, Button, Text, HStack } from "native-base";
import * as ImagePicker from "expo-image-picker";

export function NewEntry({ route, navigation }) {
  const { parentIds } = route.params;

  const [name, onChangeName] = React.useState("");
  const [image, setImage] = React.useState("");
  const [parameters, setParameters] = useState([]);
  const [modalVisible, setModalVisible] = useState(true);

  const dispatch = useDispatch();
  let nextID = useSelector((state) => state.idCounter);
  let categories = useSelector((state) => state.categories);

  const [choosenCategoryId, setCategoryId] = useState(categories[0].id);

  let event = null;

  let openImagePickerAsync = async () => {
    let permissionResult = await ImagePicker.requestMediaLibraryPermissionsAsync();

    if (permissionResult.granted === false) {
      alert("Permission to access camera roll is required!");
      return;
    }

    let pickerResult = await ImagePicker.launchImageLibraryAsync();
    setImage(pickerResult.uri);
  };

  return (
    <Box height="100%" bg="background.800" w="100%">
      <Center>
        <VStack w="100%" ml="5%" mr="5%">
          <Box height="15%" mt="5">
            <Text ml="5%" color="white" fontSize="xl">
              Name
            </Text>
            <HStack alignItems={"center"}>
              <Input
                ml="5%"
                mr="5%"
                w="75%"
                color="black"
                bg="white"
                style={styles.input}
                onChangeText={onChangeName}
                value={name}
                placeholder="Name"
                variant="filled"
                _focus={{ backgroundColor: "white" }}
              />
              <Ionicons name="camera-outline" size={35} color="white" onPress={openImagePickerAsync} />
            </HStack>
          </Box>
          <Box height="70%">
            <FlatList
              data={parameters}
              keyExtractor={(item) => item.id}
              renderItem={({ item, index }) => {
                return (
                  <Box mb="2" w="100%">
                    <Text ml="5%" color="white" fontSize="xl">
                      {item.name}
                    </Text>
                    {item.type === "text" ? (
                      <Box>
                        <Input
                          ml="5%"
                          mr="5%"
                          color="black"
                          bg="white"
                          style={styles.input}
                          variant="filled"
                          _focus={{ backgroundColor: "white" }}
                          onChangeText={(text) => {
                            let temp = [...parameters];
                            temp[index].value = text;
                            setParameters(temp);
                          }}
                          value={parameters[index].value}
                          keyboardType={"default"}
                          placeholder={item.name}
                        />
                      </Box>
                    ) : item.type === "ean-8" || item.type === "ean-13" ? (
                      <Box>
                        <HStack alignItems={"center"}>
                          <Input
                            ml="5%"
                            mr="5%"
                            w="75%"
                            color="black"
                            bg="white"
                            style={styles.input}
                            variant="filled"
                            _focus={{ backgroundColor: "white" }}
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
                            color="white"
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
                        </HStack>
                      </Box>
                    ) : item.type === "qr" ? (
                      <Box>
                        <HStack alignItems={"center"}>
                          <Input
                            ml="5%"
                            mr="5%"
                            w="75%"
                            color="black"
                            bg="white"
                            style={styles.input}
                            variant="filled"
                            _focus={{ backgroundColor: "white" }}
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
                            color="white"
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
                        </HStack>
                      </Box>
                    ) : (
                      <Box>
                        <Input
                          ml="5%"
                          mr="5%"
                          color="black"
                          bg="white"
                          style={styles.input}
                          variant="filled"
                          _focus={{ backgroundColor: "white" }}
                          onChangeText={(text) => {
                            let temp = [...parameters];
                            temp[index].value = text;
                            setParameters(temp);
                          }}
                          value={parameters[index].value}
                          keyboardType={"numeric"}
                          placeholder={item.name}
                        />
                      </Box>
                    )}
                  </Box>
                );
              }}
            />
          </Box>
          <Box height="10%">
            <Button ml="5%" width="90%" height="12" bg="green.500" onPress={() => addNewEntryToItemGroup(name)}>
              Save
            </Button>
          </Box>
        </VStack>
      </Center>
      {getModal()}
    </Box>
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
        <Box height="100%" bg="background.800">
          <Center>
            <VStack mt="70">
              <Text style={styles.header}>Choose Entry Category</Text>
              <Box mt="50" style={styles.formLine}>
                <Text style={styles.header}>Categories:</Text>
                <Picker
                  style={{ color: "white" }}
                  selectedValue={choosenCategoryId}
                  prompt="Item Category"
                  onValueChange={(itemValue, itemIndex) => setCategoryId(itemValue)}
                  itemStyle={{ color: "white" }}
                >
                  {categories.map((item, index) => {
                    return <Picker.Item label={item.name} value={item.id} key={index} />;
                  })}
                </Picker>
              </Box>
              <Box>
                <HStack>
                  <Button
                    width="40"
                    height={12}
                    marginX="1"
                    bg="green.500"
                    onPress={() => closeModalAndSetParameters()}
                  >
                    Select
                  </Button>
                  <Button width="40" height={12} marginX="1" onPress={() => navigation.goBack()}>
                    Back
                  </Button>
                </HStack>
              </Box>
            </VStack>
          </Center>
        </Box>
      </Modal>
    );
  }

  function closeModalAndSetParameters() {
    let found = categories.find((c) => c.id === choosenCategoryId);
    setParameters(JSON.parse(JSON.stringify(found.parameters)));
    setModalVisible(false);
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

  function addNewEntryToItemGroup(name) {
    let found = categories.find((c) => c.id === choosenCategoryId);
    dispatch(nextId());
    dispatch(addEntryToItemGroup(nextID, name, parentIds, parameters, found.icon, image));

    let hasThreshold = false;
    let threshold = 0;
    let amount = 0;

    parameters.forEach((e) => {
      if (e.name === "Threshold") {
        hasThreshold = true;
        threshold = e.value;
      }
      if (e.name === "Amount") {
        amount = e.value;
      }
    });

    if (hasThreshold) {
      if (parseInt(amount) < parseInt(threshold)) {
        dispatch(addLowStockEntry(name, nextID, parentIds));
      }
    }

    navigation.goBack();
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
