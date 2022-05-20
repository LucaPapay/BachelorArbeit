import { useNavigation } from "@react-navigation/native";
import Ionicons from "@expo/vector-icons/Ionicons";
import { StyleSheet, Text } from "react-native";
import { Box, Pressable, AlertDialog, Button, HStack } from "native-base";
import React from "react";
import { useDispatch } from "react-redux";
import { deleteItemGroup } from "../redux/actions";

export default function SubItemGroup({ entry, parentIds }) {
  const navigation = useNavigation();
  const dispatch = useDispatch();

  const [isOpen, setIsOpen] = React.useState(false);

  const onClose = () => setIsOpen(false);

  const cancelRef = React.useRef(null);
  return (
    <>
      <Box style={styles.item} h="20">
        <Pressable
          style={{ flex: 3 }}
          onPress={() => navigation.push("Sub Item Group", { parentIds: parentIds, name: entry.name })}
          onLongPress={() => setIsOpen(!isOpen)}
        >
          <Box>
            <Text style={styles.title}>{entry.name}</Text>
          </Box>
        </Pressable>
        <Box style={{ flex: 1, flexDirection: "row" }}>
          <Ionicons
            name="qr-code-outline"
            size={35}
            color="#14213d"
            onPress={() => navigation.push("QR Code", { name: entry.name, parentIds: parentIds, type: "i" })}
          />
          <Ionicons name="eye" style={{ marginLeft: 10 }} size={35} color="#14213d" />
        </Box>
      </Box>
      <AlertDialog leastDestructiveRef={cancelRef} isOpen={isOpen} onClose={onClose}>
        <AlertDialog.Content>
          <AlertDialog.CloseButton />
          <AlertDialog.Header>Delete Item Group</AlertDialog.Header>
          <AlertDialog.Body>
            This will remove the item group aswell as all entrys contained. This action cannot be reversed.
          </AlertDialog.Body>
          <AlertDialog.Footer>
            <Button width={20} colorScheme="coolGray" mr="2" onPress={onClose} ref={cancelRef}>
              Cancel
            </Button>
            <Button width={20} colorScheme="danger" onPress={deleteIG}>
              Delete
            </Button>
          </AlertDialog.Footer>
        </AlertDialog.Content>
      </AlertDialog>
    </>
  );

  function deleteIG() {
    dispatch(deleteItemGroup(entry.id, entry.parentIds));
    onClose();
  }
}

const styles = StyleSheet.create({
  item: {
    backgroundColor: "#e5e5e5",
    padding: 20,
    marginVertical: 8,
    flex: 1,
    flexDirection: "row",
    borderRadius: 5,
  },
  title: {
    fontSize: 24,
    color: "#14213d",
  },
});
