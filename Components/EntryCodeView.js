import { StyleSheet } from "react-native";
import QRCode from "react-native-qrcode-svg";
import { Box, Center, Text, VStack } from "native-base";

export function EntryCodeView({ route, navigation }) {
  const { name, parentIds, type } = route.params;
  let code = "";
  parentIds.forEach((element) => {
    code = code + element + ",";
  });
  code = code.slice(0, -1);
  let displayCode = "inventory@" + type + "#" + code;

  return (
    <Box height="100%" bg="background.800" style={{ flex: 1, alignItems: "center" }}>
      <Center>
        <VStack>
          <Center>
            <Text fontSize="3xl" mt="10">
              {name}
            </Text>
            <Text mb="10" mt="2">
              {displayCode}
            </Text>
          </Center>
          <QRCode style={{ marginBottom: 25 }} size={300} value={displayCode} />
        </VStack>
      </Center>
    </Box>
  );
}
