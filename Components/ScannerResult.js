import { StyleSheet, Platform, Modal } from "react-native";
import QRCode from "react-native-qrcode-svg";
import Barcode from "@kichiyaki/react-native-barcode-generator";
import React, { useState } from "react";
import { Text, Box, VStack, Center, Button, HStack, AlertDialog, Spinner, Link } from "native-base";
import Constants from "expo-constants";
import Ionicons from "@expo/vector-icons/Ionicons";

export default function ScannerResult({ route, navigation }) {
  const { scannedResult, type } = route.params;
  let scanned = scannedResult.substring(1, scannedResult.length - 1);
  let trimmedType = "";
  if (Platform.OS === "ios") {
    trimmedType = type.substring(1, type.length - 1);
  } else {
    trimmedType = type;
  }

  const [alertOpen, setAlertOpen] = React.useState(false);
  const cancelRef = React.useRef(null);
  const onClose = () => setAlertOpen(false);
  const [modalVisible, setModalVisible] = useState(false);

  const [title, onChangeTitle] = React.useState("Press Lookup to Search for Item in UPC item db");
  const [description, setDescription] = React.useState("");
  const [brand, setBrand] = React.useState("");
  const [weight, setWeight] = React.useState("");
  const [loading, setLoading] = React.useState(false);

  let code = <Text>kein bild vorhanden</Text>;
  if (trimmedType === "org.iso.QRCode" || trimmedType === "256") {
    code = <QRCode style={{ marginBottom: 25 }} size={250} value={scanned} />;
  } else if (trimmedType === "org.gs1.EAN-13" || trimmedType === "32") {
    code = <Barcode style={{ marginBottom: 25 }} format="EAN13" value={scanned} text={scanned}></Barcode>;
  } else if (trimmedType === "org.gs1.EAN-8" || trimmedType === "64") {
    code = <Barcode style={{ marginBottom: 25 }} format="EAN8" value={scanned} text={scanned}></Barcode>;
  }

  return (
    <>
      <Box height="100%" bg="background.800">
        <VStack>
          <Center>
            <Text mt="5" fontSize="xl">
              Scanned:
            </Text>
            <Text>{scanned}</Text>
            <Text mt="2" fontSize="xl" mb="5">
              Type: {trimmedType}
            </Text>
            {code}
            <Box h="60">
              {loading ? (
                <Spinner color="warning.500" size="lg" accessibilityLabel="Loading API" />
              ) : (
                <Text mt="2"> Item: {title}</Text>
              )}
            </Box>
            {trimmedType === "org.gs1.EAN-13" ||
            trimmedType === "32" ||
            trimmedType === "org.gs1.EAN-8" ||
            trimmedType === "64" ? (
              <Button width="80" height={12} marginX="1" onPress={() => lookup()}>
                Lookup Code on UPCitemdb
              </Button>
            ) : (
              <></>
            )}

            {trimmedType === "org.iso.QRCode" || trimmedType === "256" ? (
              <Button mt="5" width="80" height={12} marginX="1" onPress={() => gotoItem()}>
                Goto Item Group
              </Button>
            ) : (
              <></>
            )}
          </Center>
        </VStack>
      </Box>
      <Center>
        <AlertDialog leastDestructiveRef={cancelRef} isOpen={alertOpen} onClose={onClose}>
          <AlertDialog.Content>
            <AlertDialog.CloseButton />
            <AlertDialog.Header>Invalid Code Scanned</AlertDialog.Header>
            <AlertDialog.Body>The scanned QR Code is not a valid Entry or Item Group code.</AlertDialog.Body>
            <AlertDialog.Footer>
              <Button.Group space={1}>
                <Button w="80px" colorScheme="coolGray" onPress={onClose} ref={cancelRef}>
                  Ok
                </Button>
              </Button.Group>
            </AlertDialog.Footer>
          </AlertDialog.Content>
        </AlertDialog>
      </Center>
      {getModal()}
    </>
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
              <HStack mb="2" justifyContent="space-between">
                <Text fontSize="4xl">Lookup Results:</Text>
                <Ionicons
                  name="close-circle-outline"
                  size={45}
                  color="white"
                  onPress={() => setModalVisible(!modalVisible)}
                />
              </HStack>
              <Link mb="10" href={"https://www.upcitemdb.com/upc/" + scanned}>
                View on upcitemdb website
              </Link>
              <Text>Name: {title}</Text>
              <Text>Brand: {brand}</Text>
              <Text>Weight: {weight}</Text>
              <Text>description: {description}</Text>
            </VStack>
          </Center>
        </Box>
      </Modal>
    );
  }
  function gotoItem() {
    let temp = scanned;
    try {
      let inventoryString = temp.substring(0, temp.search("@"));
      let type = temp.substring(temp.search("@") + 1, temp.search("#"));
      let parentIds = temp.substring(temp.search("#") + 1).split(",");
      parentIds = parentIds.map((i) => parseInt(i));

      if (inventoryString !== Constants.manifest.extra.keyword || !(type === "e" || type === "i")) {
        setAlertOpen(!alertOpen);
        return;
      }

      if (type === "e") {
        parentIds.pop();
      }

      navigation.navigate("Sub Item Group", { parentIds: parentIds, name: "test" });
    } catch (e) {
      setAlertOpen(!alertOpen);
    }
  }

  function lookup() {
    setLoading(true);
    fetch("https://api.upcitemdb.com/prod/trial/lookup?upc=" + scanned)
      .then((response) => response.json())
      .then((json) => {
        if (
          json.code !== "OK" ||
          typeof json.items == "undefined" ||
          json.items.length === 0 ||
          typeof json.items[0] == "undefined"
        ) {
          onChangeTitle("Item not in DB");
          setLoading(false);
        } else if (json.code === "OK") {
          onChangeTitle(json.items[0].title);
          setDescription(json.items[0].description);
          setBrand(json.items[0].brand);
          setWeight(json.items[0].weight);
          setLoading(false);
          setModalVisible(true);
        } else {
          onChangeTitle(json.message);
        }
      })
      .catch((error) => {
        console.error(error);
      });
  }
}

const styles = StyleSheet.create({
  title: {
    fontSize: 24,
    color: "#14213d",
    justifyContent: "flex-start",
  },
});
