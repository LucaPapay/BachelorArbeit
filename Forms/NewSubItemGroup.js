import React from "react";
import { TextInput, StyleSheet } from "react-native";
import { useDispatch, useSelector } from "react-redux";
import { addSubItemGroup, nextId } from "../redux/actions";
import { Box, Button, Center, Text, VStack } from "native-base";

export function NewSubItemGroup({ route, navigation }) {
  const { parentIds } = route.params;
  const [text, onChangeText] = React.useState("");

  const dispatch = useDispatch();
  let nextID = useSelector((state) => state.idCounter);

  return (
    <Box bg="background.800" height="100%">
      <VStack>
        <Center>
          <Box width="80%" mt="20" style={styles.formLine}>
            <Text mb="2" style={styles.header}>
              Subitemgroup Name
            </Text>
            <TextInput width="100%" style={styles.input} onChangeText={onChangeText} value={text} placeholder="Name" />
          </Box>
          <Button
            width="80%"
            height="12"
            bg="green.500"
            onPress={() => addSubItemGroupToItemGroup(dispatch, nextID, text, navigation, parentIds)}
          >
            Save
          </Button>
        </Center>
      </VStack>
    </Box>
  );
}

function addSubItemGroupToItemGroup(dispatch, nextID, text, navigation, parentIds) {
  dispatch(nextId());
  dispatch(addSubItemGroup(nextID, text, parentIds));
  navigation.goBack();
}

const styles = StyleSheet.create({
  input: {
    height: 40,
    paddingHorizontal: 5,
    backgroundColor: "white",
    marginBottom: 5,
  },
  header: {
    fontSize: 20,
  },
  formLine: {
    marginBottom: 20,
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.23,
    shadowRadius: 2.62,
    elevation: 4,
  },
});
