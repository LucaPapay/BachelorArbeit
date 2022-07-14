import { useNavigation } from "@react-navigation/native";
import Ionicons from "@expo/vector-icons/Ionicons";
import { StyleSheet, Text } from "react-native";
import { Box, Pressable, AlertDialog, Button, HStack } from "native-base";
import React from "react";
import { useDispatch } from "react-redux";
import { deleteCategory, deleteItemGroup } from "../redux/actions";

export default function CategoryListEntry({ category }) {
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
          onPress={() => navigation.push("Edit Category", { category: category })}
          onLongPress={() => setIsOpen(!isOpen)}
        >
          <Box>
            <Text style={styles.title}>{category.name}</Text>
          </Box>
        </Pressable>
        <Box>
          <Ionicons name={category.icon} size={35} color="#14213d" />
        </Box>
      </Box>
      <AlertDialog leastDestructiveRef={cancelRef} isOpen={isOpen} onClose={onClose}>
        <AlertDialog.Content>
          <AlertDialog.CloseButton />
          <AlertDialog.Header>Delete Category</AlertDialog.Header>
          <AlertDialog.Body>
            This will remove the category. All entries of this category will not be deleted. This action cannot be
            reversed.
          </AlertDialog.Body>
          <AlertDialog.Footer>
            <Button width={20} colorScheme="coolGray" mr="2" onPress={onClose} ref={cancelRef}>
              Cancel
            </Button>
            <Button width={20} colorScheme="danger" onPress={deleteC}>
              Delete
            </Button>
          </AlertDialog.Footer>
        </AlertDialog.Content>
      </AlertDialog>
    </>
  );

  function deleteC() {
    dispatch(deleteCategory(category.id));
    onClose();
  }
}

const styles = StyleSheet.create({
  item: {
    backgroundColor: "#f5f5f5",
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
