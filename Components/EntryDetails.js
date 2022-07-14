import { StyleSheet } from "react-native";
import { Box, VStack, Text, Center, HStack, Image, ScrollView } from "native-base";
import QRCode from "react-native-qrcode-svg";
import Barcode from "@kichiyaki/react-native-barcode-generator";

export function EntryDetails({ route, navigation }) {
  const { entry } = route.params;

  const NumberDetails = createNumberDetails();
  const TextDetails = createNumberDetails();
  const BarcodeDetails = createBarcodeDetails();
  const QRDetails = createQRDetails();
  console.log(entry.image);

  return (
    <Box height="100%" bg="background.800">
      <ScrollView>
        <Center>
          <VStack mt="4" mb="20" width="90%">
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
            {entry.image !== "" ? (
              <Image
                mt="4"
                source={{
                  uri: entry.image,
                }}
                alt="Alternate Text"
                size="2xl"
              />
            ) : (
              <></>
            )}
          </VStack>
        </Center>
      </ScrollView>
    </Box>
  );

  function createNumberDetails() {
    return ({ parameter }) => (
      <Box mt="3" key={parameter.id}>
        <Text fontSize="2xl" fontWeight="extrabold">
          {parameter.name}:{" "}
        </Text>
        <Text fontSize="xl" width="95%">
          {parameter.value}
        </Text>
      </Box>
    );
  }

  function createBarcodeDetails() {
    return ({ parameter, format }) => (
      <Box mt="3">
        <Text fontSize="2xl">{parameter.name}: </Text>
        <Barcode format={format} value={parameter.value} text={parameter.value}></Barcode>
      </Box>
    );
  }

  function createQRDetails() {
    return ({ parameter }) => (
      <Box mt="3">
        <Text fontSize="2xl">{parameter.name}: </Text>
        <QRCode size={150} value={parameter.value} />
      </Box>
    );
  }
}
