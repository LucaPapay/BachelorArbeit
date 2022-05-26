import { useNavigation } from "@react-navigation/native";
import Ionicons from "@expo/vector-icons/Ionicons";
import { StyleSheet } from "react-native";
import { Box, Text, HStack, VStack, AlertDialog, Button, Pressable } from "native-base";
import React from "react";
import { deleteEntry } from "../redux/actions";
import { useDispatch } from "react-redux";

export default function EntryListEntry({ entry, parentIds }) {
  const navigation = useNavigation();
  const dispatch = useDispatch();

  let amount = "";
  let threshold = "";
  const hasAmountParameter = checkForAmount();
  const [isOpen, setIsOpen] = React.useState(false);

  const onClose = () => setIsOpen(false);

  const cancelRef = React.useRef(null);

  return (
    <>
      <HStack style={styles.item} h="20">
        <Pressable onLongPress={() => setIsOpen(!isOpen)} style={{ flex: 7 }}>
          <HStack>
            <Ionicons name={entry.icon} size={35} color="#14213d"></Ionicons>
            <Text fontSize="2xl" color="black" ml={2} mt="1">
              {entry.name}
            </Text>
          </HStack>
        </Pressable>
        <Box style={{ flex: 5, flexDirection: "row" }}>
          {hasAmountParameter ? (
            <VStack mt={0} mr="2">
              <HStack>
                <Ionicons
                  name="add-circle-outline"
                  size={25}
                  color="#14213d"
                  onPress={() =>
                    navigation.push("Edit Amount", { name: entry.name, parentIds: parentIds, amount, entry })
                  }
                />
                <Ionicons
                  name="remove-circle-outline"
                  size={25}
                  color="#14213d"
                  onPress={() =>
                    navigation.push("Edit Amount", { name: entry.name, parentIds: parentIds, amount, entry })
                  }
                />
              </HStack>
              <Box ml="2">
                {parseInt(amount) >= parseInt(threshold) ? (
                  <Text color="green.500">
                    {amount}/{threshold}
                  </Text>
                ) : (
                  <Text color="red.500">
                    {amount}/{threshold}
                  </Text>
                )}
              </Box>
            </VStack>
          ) : (
            <HStack mt={1.5} mr="2">
              <Ionicons name="add-circle-outline" size={25} color="transparent" />
              <Ionicons name="remove-circle-outline" size={25} color="transparent" />
            </HStack>
          )}
          <Ionicons
            name="qr-code-outline"
            size={35}
            color="#14213d"
            onPress={() => navigation.push("QR Code", { name: entry.name, parentIds: parentIds, type: "e" })}
          />
          <Ionicons
            name="eye"
            style={{ marginLeft: 10 }}
            size={35}
            color="#14213d"
            onPress={() => navigation.push("Entry Details", { entry: entry })}
          />
        </Box>
      </HStack>
      <AlertDialog leastDestructiveRef={cancelRef} isOpen={isOpen} onClose={onClose}>
        <AlertDialog.Content>
          <AlertDialog.CloseButton />
          <AlertDialog.Header>Delete Entry</AlertDialog.Header>
          <AlertDialog.Body>This will remove the entry. This action cannot be reversed.</AlertDialog.Body>
          <AlertDialog.Footer>
            <Button width={20} colorScheme="coolGray" mr="2" onPress={onClose} ref={cancelRef}>
              Cancel
            </Button>
            <Button width={20} colorScheme="danger" onPress={deleteE}>
              Delete
            </Button>
          </AlertDialog.Footer>
        </AlertDialog.Content>
      </AlertDialog>
    </>
  );

  function deleteE() {
    dispatch(deleteEntry(entry.id, entry.parentIds));
    onClose();
  }

  function checkForAmount() {
    let found = false;
    entry.parameters.forEach((parameter) => {
      if (parameter.name === "Amount") {
        amount = parameter.value;
        found = true;
      }
      if (parameter.name === "Threshold") {
        threshold = parameter.value;
      }
    });
    return found;
  }
}

const styles = StyleSheet.create({
  item: {
    backgroundColor: "#f5f5f5",
    padding: 20,
    marginVertical: 8,
    borderRadius: 5,
  },
  title: {
    fontSize: 24,
    color: "#14213d",
  },
});
