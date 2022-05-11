import { useNavigation } from "@react-navigation/native";
import Ionicons from "@expo/vector-icons/Ionicons";
import { StyleSheet } from "react-native";
import { Box, Text, HStack } from "native-base";

export default function EntryListEntry({ entry, parentIds }) {
  const navigation = useNavigation();

  let amount = "";
  const hasAmountParameter = checkForAmount();

  return (
    <HStack style={styles.item}>
      <HStack style={{ flex: 7 }}>
        <Ionicons name={entry.icon} size={35} color="#14213d"></Ionicons>
        <Text fontSize="2xl" color="black" ml={2} mt="1">
          {entry.name}
        </Text>
      </HStack>
      <Box style={{ flex: 5, flexDirection: "row" }}>
        {hasAmountParameter ? (
          <HStack mt={1.5} mr="2">
            <Ionicons
              name="add-circle-outline"
              size={25}
              color="#14213d"
              onPress={() => navigation.push("Edit Amount", { name: entry.name, parentIds: parentIds, amount, entry })}
            />
            <Ionicons
              name="remove-circle-outline"
              size={25}
              color="#14213d"
              onPress={() => navigation.push("Edit Amount", { name: entry.name, parentIds: parentIds, amount, entry })}
            />
          </HStack>
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
          onPress={() => navigation.push("QR Code", { name: entry.name, parentIds: parentIds })}
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
  );

  function checkForAmount() {
    let found = false;
    entry.parameters.forEach((parameter) => {
      if (parameter.name === "Amount") {
        amount = parameter.value;
        found = true;
      }
    });
    return found;
  }
}

const styles = StyleSheet.create({
  item: {
    backgroundColor: "#e5e5e5",
    padding: 20,
    marginVertical: 8,
    borderRadius: 5,
  },
  title: {
    fontSize: 24,
    color: "#14213d",
  },
});
