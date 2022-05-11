import { Box, Text, HStack, VStack, Center, Button } from "native-base";
import Ionicons from "@expo/vector-icons/Ionicons";
import { useState } from "react";
import { useDispatch } from "react-redux";
import { editItemGroupEntry } from "../redux/actions";

export function EntryEditAmountView({ route, navigation }) {
  const { name, parentIds, amount, entry } = route.params;
  const dispatch = useDispatch();

  const [tempAmount, setTempAmount] = useState(parseInt(amount));

  return (
    <Box height="100%" bg="background.800" width="100%">
      <Center>
        <Box mt="40">
          <Center>
            <Text fontSize="3xl">{name} Amount:</Text>
          </Center>

          <Center>
            <HStack mt="10">
              <Ionicons
                name="remove-circle-outline"
                size={50}
                color="white"
                onPress={() => setTempAmount(tempAmount - 1)}
              />
              <Text mt="-5" ml="10" mr="10" fontSize="7xl">
                {tempAmount}
              </Text>
              <Ionicons
                name="add-circle-outline"
                size={50}
                color="white"
                onPress={() => setTempAmount(tempAmount + 1)}
              />
            </HStack>
          </Center>
          <Box>
            <Button mt="10" height="12" bg="green.500" width="300" onPress={() => editAmount()}>
              Save
            </Button>
          </Box>
        </Box>
      </Center>
    </Box>
  );

  function editAmount() {
    entry.parameters.forEach((parameter) => {
      if (parameter.name === "Amount") {
        parameter.value = tempAmount;
      }
      dispatch(editItemGroupEntry(entry.id, entry));
      navigation.goBack();
    });
  }
}
