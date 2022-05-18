import { useNavigation } from "@react-navigation/native";
import Ionicons from "@expo/vector-icons/Ionicons";
import { StyleSheet, Text, View } from "react-native";

export default function SubItemGroup({ entry, parentIds }) {
  const navigation = useNavigation();
  return (
    <View style={styles.item}>
      <View style={{ flex: 3 }}>
        <Text
          onPress={() => navigation.push("Sub Item Group", { parentIds: parentIds, name: entry.name })}
          style={styles.title}
        >
          {entry.name}
        </Text>
      </View>
      <View style={{ flex: 1, flexDirection: "row" }}>
        <Ionicons
          name="qr-code-outline"
          size={35}
          color="#14213d"
          onPress={() => navigation.push("QR Code", { name: entry.name, parentIds: parentIds, type: "i" })}
        />
        <Ionicons name="eye" style={{ marginLeft: 10 }} size={35} color="#14213d" />
      </View>
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
