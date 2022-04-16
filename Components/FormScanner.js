import React, { useState, useEffect } from "react";
import { StyleSheet, Text, View, TouchableOpacity } from "react-native";
import { Camera } from "expo-camera";
import { BarCodeScanner } from "expo-barcode-scanner";
import { useIsFocused } from "@react-navigation/native";
import { DeviceEventEmitter } from "react-native";

export default function FormScanner({ route, navigation }) {
  const { typeToScan, index } = route.params;
  const [hasPermission, setHasPermission] = useState(null);
  const isFocused = useIsFocused();

  let constantTypeArray = [];

  if (typeToScan === "ean-8") {
    constantTypeArray = [BarCodeScanner.Constants.BarCodeType.ean8];
  } else if (typeToScan === "ean-13") {
    constantTypeArray = [BarCodeScanner.Constants.BarCodeType.ean13];
  } else {
    constantTypeArray = [BarCodeScanner.Constants.BarCodeType.qr];
  }

  useEffect(() => {
    (async () => {
      const { status } = await Camera.requestCameraPermissionsAsync();
      setHasPermission(status === "granted");
    })();
  }, []);

  if (hasPermission === null) {
    return <View />;
  }
  if (hasPermission === false) {
    return <Text>No access to camera</Text>;
  }

  return (
    <View style={styles.container}>
      {isFocused && (
        <Camera
          onBarCodeScanned={(...args) => {
            const data = args[0].data;
            const type = args[0].type;
            let result = JSON.stringify(data);
            let typeString = JSON.stringify(type);
            DeviceEventEmitter.emit("event.codeScanned", { text: result, index: index });
            navigation.goBack();
          }}
          barCodeScannerSettings={{
            barCodeTypes: constantTypeArray,
          }}
          style={{ flex: 2 }}
        />
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  camera: {
    flex: 1,
  },
});
