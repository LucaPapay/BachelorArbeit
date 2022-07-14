import React, { useState, useEffect } from "react";
import { StyleSheet, View, TouchableOpacity } from "react-native";
import { Camera } from "expo-camera";
import { BarCodeScanner } from "expo-barcode-scanner";
import { useIsFocused } from "@react-navigation/native";
import { InventoryEntry, Parameter } from "../Entities/DataStorage";
import { useDispatch, useSelector } from "react-redux";
import { addEntryToItemGroup, nextId } from "../redux/actions";
import { Box, Center, Text, Spinner } from "native-base";

export default function AddNewEntryScanner({ route, navigation }) {
  const { parentIds } = route.params;
  const [hasPermission, setHasPermission] = useState(null);
  const isFocused = useIsFocused();
  const [loading, setLoading] = useState(false);
  const [dbAnswered, setDbAnswered] = useState(false);
  const [error, setError] = useState("");
  const dispatch = useDispatch();
  let nextID = useSelector((state) => state.idCounter);

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
      {isFocused && !loading && (
        <Camera
          onBarCodeScanned={(...args) => {
            const data = args[0].data;
            const type = args[0].type;
            let result = JSON.stringify(data);
            let typeString = JSON.stringify(type);
            let scanned = result.substring(1, result.length - 1);
            lookup(scanned);
          }}
          barCodeScannerSettings={{
            barCodeTypes: [BarCodeScanner.Constants.BarCodeType.ean8, BarCodeScanner.Constants.BarCodeType.ean13],
          }}
          style={{ flex: 2 }}
        />
      )}
      {loading && (
        <Box height="100%" bg="background.800">
          <Center>
            <Text fontSize="4xl" mt="45%">
              EAN successfully scanned.
            </Text>
            <Text fontSize="4xl" mt="4">
              Waiting for API response.
            </Text>
            <Spinner mt="4" color="warning.500" size="lg" accessibilityLabel="Loading API" />
          </Center>
        </Box>
      )}
      {dbAnswered && (
        <Box height="100%" bg="background.800">
          <Center>
            <Text textAlign="center" fontSize="4xl" mt="45%">
              {error}
            </Text>
          </Center>
        </Box>
      )}
    </View>
  );

  function lookup(scanned) {
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
          setError("Item with EAN " + scanned + " not found inside the APIs Database");
          setLoading(false);
          setDbAnswered(true);
        } else if (json.code === "OK") {
          setLoading(false);
          handleScan(json.items[0]);
        } else {
          setError(json.message);
          setLoading(false);
          setDbAnswered(true);
        }
      })
      .catch((error) => {
        setError("Error while looking up item");
        setDbAnswered(true);
        console.error(error);
      });
  }

  function getParameter(fieldToCheck, name, type, parId) {
    let newPar = new Parameter(name, type, fieldToCheck);
    newPar.id = parId;
    return newPar;
  }

  function handleScan(result) {
    let parameters = [];
    let parId = 0;
    if (result.brand.length > 1) {
      parameters.push(getParameter(result.brand, "Brand", "text", parId++));
    }
    if (result.category.length > 1) {
      parameters.push(getParameter(result.category, "Category", "text", parId++));
    }
    if (result.color.length > 1) {
      parameters.push(getParameter(result.color, "Color", "text", parId++));
    }
    if (result.dimension.length > 1) {
      parameters.push(getParameter(result.dimension, "Dimension", "text", parId++));
    }
    if (result.description.length > 1) {
      parameters.push(getParameter(result.description, "Description", "text", parId++));
    }
    if (result.elid.length > 1) {
      parameters.push(getParameter(result.elid, "ELID", "numeric", parId++));
    }
    if (result.ean.length > 1) {
      parameters.push(getParameter(result.ean, "EAN", "numeric", parId++));
    }
    if (result.upc) {
      parameters.push(getParameter(result.upc, "UPC", "numeric", parId++));
    }
    if (result.model.length > 1) {
      parameters.push(getParameter(result.model, "Model", "text", parId++));
    }
    if (result.size.length > 1) {
      parameters.push(getParameter(result.size, "Size", "text", parId++));
    }
    if (result.weight.length > 1) {
      parameters.push(getParameter(result.weight, "Weight", "text", parId++));
    }

    dispatch(nextId());
    dispatch(addEntryToItemGroup(nextID, result.title, parentIds, parameters, "cloud-download-outline", ""));
    let tempEntry = new InventoryEntry(result.title, nextID, parentIds, parameters, "cloud-download-outline", "");
    navigation.goBack();
    navigation.push("Edit Entry", { parentIds: parentIds, entry: tempEntry });
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  camera: {
    flex: 1,
  },
});
