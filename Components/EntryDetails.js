import { StyleSheet } from "react-native";
import { Box, VStack, Text, Center, HStack } from "native-base";
import QRCode from "react-native-qrcode-svg";
import Barcode from "@kichiyaki/react-native-barcode-generator";

export function EntryDetails({ route, navigation }) {
  const { entry } = route.params;

  const NumberDetails = createNumberDetails();
  const TextDetails = createNumberDetails();
  const BarcodeDetails = createBarcodeDetails();
  const QRDetails = createQRDetails();

  return (
    <Box height="100%" bg="background.800">
      <Center>
        <VStack mt="4">
          {entry.parameters.map((parameter) =>
            parameter.type === "text" ? (
              <TextDetails key={parameter.id} parameter={parameter} />
            ) : parameter.type === "ean-8" ? (
              <BarcodeDetails key={parameter.id} parameter={parameter} format="EAN8" />
            ) : parameter.type === "ean-13" ? (
              <BarcodeDetails key={parameter.id} parameter={parameter} format="EAN13" />
            ) : parameter.type === "qr" ? (
              <QRDetails key={parameter.id} parameter={parameter} />
            ) : (
              <NumberDetails key={parameter.id} parameter={parameter} />
            )
          )}
        </VStack>
      </Center>
    </Box>
  );

  function createNumberDetails() {
    return ({ parameter }) => (
      <Box key={parameter.id}>
        <HStack>
          <Text fontSize="2xl">{parameter.name}: </Text>
          <Text fontSize="2xl">{parameter.value}</Text>
        </HStack>
      </Box>
    );
  }

  function createBarcodeDetails() {
    return ({ parameter, format }) => (
      <Box>
        <Text fontSize="2xl">{parameter.name}: </Text>
        <Barcode format={format} value={parameter.value} text={parameter.value}></Barcode>
      </Box>
    );
  }

  function createQRDetails() {
    return ({ parameter }) => (
      <Box>
        <Text fontSize="2xl">{parameter.name}: </Text>
        <QRCode size={150} value={parameter.value} />
      </Box>
    );
  }
}

const styles = StyleSheet.create({});
