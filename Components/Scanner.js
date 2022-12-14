import React, { useState, useEffect } from "react";
import { StyleSheet, Text, View, TouchableOpacity } from "react-native";
import { Camera } from "expo-camera";
import { BarCodeScanner } from "expo-barcode-scanner";
import { useIsFocused } from "@react-navigation/native";

export default function Scanner({ navigation }) {
  const [hasPermission, setHasPermission] = useState(null);
  const isFocused = useIsFocused();

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
            result = JSON.stringify(data);
            typeString = JSON.stringify(type);
            navigation.navigate("Scanner Result", { scannedResult: result, type: typeString });
          }}
          barCodeScannerSettings={{
            barCodeTypes: [
              BarCodeScanner.Constants.BarCodeType.qr,
              BarCodeScanner.Constants.BarCodeType.ean8,
              BarCodeScanner.Constants.BarCodeType.ean13,
            ],
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
