import { useNavigation } from "@react-navigation/native";
import Ionicons from "@expo/vector-icons/Ionicons";
import { StyleSheet, Text, View } from "react-native";

export default function SubCategory({ entry, parentIds }) {
  const navigation = useNavigation();
  return (
    <View style={styles.item}>
      <View style={{ flex: 8 }}>
        <Text
          onPress={() => navigation.push("Sub Inventory", { parentIds: parentIds, name: entry.name })}
          style={styles.title}
        >
          {entry.name}
        </Text>
      </View>
      <Ionicons name="eye" style={{ flex: 1 }} size={35} color="#14213d" />
    </View>
  );
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
