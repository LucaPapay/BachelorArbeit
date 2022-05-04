import React, { useState } from "react";
import { TextInput, StyleSheet, FlatList, Modal } from "react-native";
import { useDispatch, useSelector } from "react-redux";
import { addNewCategory, nextId } from "../redux/actions";
import { Parameter } from "../Entities/DataStorage";
import { Picker } from "@react-native-picker/picker";
import IconPicker from "react-native-icon-picker";
import Ionicons from "@expo/vector-icons/Ionicons";
import { Input, Text, Button, Box, Icon, Center, VStack, HStack } from "native-base";

export function NewCategory({ route, navigation }) {
  const [name, onChangeName] = React.useState("");
  const [parameters, setParameters] = useState([]);

  const [modalVisible, setModalVisible] = useState(false);
  const [parameterName, setParameterName] = React.useState("");
  const [parameterType, setParameterType] = React.useState("");
  const dispatch = useDispatch();
  let nextID = useSelector((state) => state.idCounter);

  const [showIconPicker, setShowIconPicker] = useState(false);
  const [icon, setIcon] = useState("help");

  const onSelect = (icon) => {
    setIcon(icon.icon);
    setShowIconPicker(false);
  };

  const icons = [
    "tv",
    "alarm",
    "cube",
    "fast-food",
    "easel",
    "image",
    "musical-notes",
    "print",
    "shirt",
    "tennisball",
    "thermometer",
    "train",
    "nutrition",
    "desktop",
    "beer",
    "snow",
    "logo-usd",
    "pizza",
    "man",
    "color-filter",
  ];

  return (
    <Box height="100%" bg="background.800">
      <Center>
        <VStack>
          <Box height="20%" mt="5">
            <Box>
              <Text color="white" fontSize="xl">
                Name:
              </Text>
              <Input
                ml="5%"
                mr="5%"
                color="black"
                bg="white"
                style={styles.input}
                onChangeText={onChangeName}
                value={name}
                placeholder="Name"
                variant="filled"
                _focus={{ backgroundColor: "white" }}
              />
            </Box>
            <Box width="100%" mt="4">
              <Text color="white" fontSize="xl">
                Icon:
              </Text>
              <IconPicker
                showIconPicker={showIconPicker}
                toggleIconPicker={() => setShowIconPicker(!showIconPicker)}
                iconDetails={[
                  {
                    family: "Ionicons",
                    icons: icons,
                  },
                ]}
                content={
                  <Center w="100%" mt="1">
                    <Box height="8">
                      <Icon as={Ionicons} color="white" size="2xl" name={icon} />
                    </Box>
                  </Center>
                }
                onSelect={onSelect}
              />
            </Box>
          </Box>
          <Box height="45%" mt="5">
            <FlatList
              data={parameters}
              keyExtractor={(item) => item.id}
              renderItem={({ item, index }) => {
                return (
                  <Box width="90%" mb="2">
                    <Text color="white" fontSize="xl">
                      {item.name}
                    </Text>
                    {item.type === "text" ? (
                      <Box width="90%">
                        <Text color="white" fontSize="md">
                          Textinput
                        </Text>
                      </Box>
                    ) : item.type === "ean-8" || item.type === "ean-13" ? (
                      <Box>
                        <Text>Ean Code</Text>
                      </Box>
                    ) : item.type === "qr" ? (
                      <Box>
                        <Text>QR Code</Text>
                      </Box>
                    ) : (
                      <Box>
                        <Text>Numeric input</Text>
                      </Box>
                    )}
                  </Box>
                );
              }}
            />
          </Box>
          <Box height="30%">
            <Center>
              <VStack w="100%">
                <Center>
                  <HStack>
                    <Button marginX="1" width="20%" height={12} onPress={() => addParameter("Amount", "number")}>
                      Amount
                    </Button>
                    <Button marginX="1" width="20%" height={12} onPress={() => addParameter("Unit", "text")}>
                      Unit
                    </Button>
                    <Button marginX="1" width="20%" height={12} onPress={() => addParameter("EAN-8", "ean-8")}>
                      EAN-8
                    </Button>
                    <Button marginX="1" width="20%" height={12} onPress={() => addParameter("EAN-13", "ean-13")}>
                      EAN-13
                    </Button>
                  </HStack>
                </Center>
                <Button mt="2" width="100%" height={12} onPress={() => setModalVisible(true)}>
                  new Parameter
                </Button>
                <Button width="100%" mt="2" bg="green.500" height={12} onPress={() => addNewCategoryFunction(name)}>
                  Save Category
                </Button>
              </VStack>
            </Center>
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
              <Text style={styles.header}>New Parameter</Text>
              <Box mt="50" style={styles.formLine}>
                <Text style={styles.header}>Name</Text>
                <TextInput
                  style={styles.input}
                  onChangeText={setParameterName}
                  value={parameterName}
                  placeholder="Parameter Name"
                />
              </Box>
              <Box style={styles.formLine}>
                <Text style={styles.header}>Type:</Text>
                <Picker
                  style={{ width: 300, marginBottom: 5, height: 50, marginTop: -10 }}
                  selectedValue={parameterType}
                  prompt="Parameter Type"
                  onValueChange={(itemValue, itemIndex) => setParameterType(itemValue)}
                >
                  <Picker.Item color="white" label="Text" value="text" />
                  <Picker.Item color="white" label="Number" value="number" />
                  <Picker.Item color="white" label="QR Code" value="qr" />
                  <Picker.Item color="white" label="Ean 8" value="ean-8" />
                  <Picker.Item color="white" label="Ean 13" value="ean-13" />
                </Picker>
              </Box>
              <Box style={[styles.btnWrapper, { marginTop: 100 }]}>
                <Button
                  width="40"
                  height={12}
                  marginX="1"
                  bg="green.500"
                  onPress={() => closeModalAndAddNewParameter()}
                >
                  Save
                </Button>
                <Button width="40" height={12} marginX="1" onPress={() => closeAndDiscardModal()}>
                  Close
                </Button>
              </Box>
            </VStack>
          </Center>
        </Box>
      </Modal>
    );
  }

  function addParameter(name, type) {
    let newParameter = new Parameter(name, type, "");
    newParameter.id = parameters.length;
    setParameters((parameters) => [...parameters, newParameter]);
  }

  function addNewCategoryFunction(name) {
    console.log(parameters);
    dispatch(nextId());
    dispatch(addNewCategory(nextID, name, parameters, icon));
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
