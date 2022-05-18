import { StyleSheet, View, Platform } from "react-native";
import QRCode from "react-native-qrcode-svg";
import Barcode from "@kichiyaki/react-native-barcode-generator";
import React, { useState } from "react";
import { Text, Box, VStack, Center, Button, HStack } from "native-base";

export default function ScannerResult({ route, navigation }) {
  const { scannedResult, type } = route.params;
  let scanned = scannedResult.substring(1, scannedResult.length - 1);
  let trimmedType = "";
  if (Platform.OS === "ios") {
    trimmedType = type.substring(1, type.length - 1);
  } else {
    trimmedType = type;
  }

  const [title, onChangeTitle] = React.useState("Press Lookup to Search for Item in UPC item db");

  let code = <Text>kein bild vorhanden</Text>;
  if (trimmedType === "org.iso.QRCode" || trimmedType === "256") {
    code = <QRCode style={{ marginBottom: 25 }} size={250} value={scanned} />;
  } else if (trimmedType === "org.gs1.EAN-13" || trimmedType === "32") {
    code = <Barcode style={{ marginBottom: 25 }} format="EAN13" value={scanned} text={scanned}></Barcode>;
  } else if (trimmedType === "org.gs1.EAN-8" || trimmedType === "64") {
    code = <Barcode style={{ marginBottom: 25 }} format="EAN8" value={scanned} text={scanned}></Barcode>;
  }

  return (
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
          <Text mt="2">Item: {title}</Text>
          <HStack mt="2">
            <Button width="40" height={12} marginX="1" onPress={() => lookup()}>
              Lookup Code on API
            </Button>
            <Button width="40" height={12} marginX="1" onPress={() => gotoItem()}>
              Goto Item Group
            </Button>
          </HStack>
        </Center>
      </VStack>
    </Box>
  );

  function gotoItem() {
    let temp = scanned;
    let inventoryString = temp.substring(0, temp.search("@"));
    let type = temp.substring(temp.search("@") + 1, temp.search("#"));
    let parentIds = temp.substring(temp.search("#") + 1).split(",");
    console.log(inventoryString);
    console.log(type);
    console.log(parentIds);
    parentIds = parentIds.map((i) => parseInt(i));

    if (type === "e") {
      parentIds.pop();
    }

    navigation.navigate("Sub Item Group", { parentIds: parentIds, name: "test" });
    //navigation.navigate("Item Groups", { parentIds: parentids, shouldForward: true });
  }

  function lookup() {
    fetch("https://api.upcitemdb.com/prod/trial/lookup?upc=" + scanned)
      .then((response) => response.json())
      .then((json) => {
        console.log(json);
        if (json.items && json.items.length === 0) {
          onChangeTitle("Item not in DB");
        }
        if (json.code === "OK") {
          onChangeTitle(json.items[0].title);
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
