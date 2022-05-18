import { Box, Button, Center, VStack } from "native-base";

export function HomeScreen({ navigation }) {
  return (
    <Box height="100%" bg="background.800">
      <Center>
        <VStack mt={8}>
          <Button height={12} width="80" onPress={() => navigation.navigate("New Category")}>
            New Category
          </Button>
          <Button height={12} width="80" onPress={() => navigation.navigate("New Category")}>
            Goto item via QR Code
          </Button>
        </VStack>
      </Center>
    </Box>
  );
}
