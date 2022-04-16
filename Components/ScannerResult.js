import { StyleSheet, Text, View, Platform } from "react-native";
import QRCode from "react-native-qrcode-svg";
import Barcode from "@kichiyaki/react-native-barcode-generator";
import Button from "../Components/Button";
import React, { useState } from "react";

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
    code = <QRCode style={{ marginBottom: 25 }} size={350} value={scanned} />;
  } else if (trimmedType === "org.gs1.EAN-13" || trimmedType === "32") {
    code = <Barcode style={{ marginBottom: 25 }} format="EAN13" value={scanned} text={scanned}></Barcode>;
  } else if (trimmedType === "org.gs1.EAN-8" || trimmedType === "64") {
    code = <Barcode style={{ marginBottom: 25 }} format="EAN8" value={scanned} text={scanned}></Barcode>;
  }

  return (
    <View style={{ flex: 1, justifyContent: "center", alignItems: "center" }}>
      <Text style={styles.title}>Scanned:</Text>
      <Text style={(styles.title, { marginBottom: 25 })}>{scanned}</Text>
      <Text style={(styles.title, { marginBottom: 25 })}>Type: {trimmedType}</Text>
      {code}
      <Text style={(styles.title, { marginBottom: 25 })}>Item: {title}</Text>
      <Button color="tomato" title="Lookup Code on API" onPress={() => lookup()} />
    </View>
  );

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
