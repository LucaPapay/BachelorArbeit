import { useNavigation } from "@react-navigation/native";
import Ionicons from "@expo/vector-icons/Ionicons";
import { StyleSheet, Text, View } from "react-native";

export default function EntryListEntry({ entry, parentIds }) {
  const navigation = useNavigation();
  return (
    <View style={styles.item}>
      <View style={{ flex: 8 }}>
        <Text style={styles.title}>{entry.name}</Text>
      </View>
      <Ionicons name="search-outline" style={{ flex: 1 }} size={35} color="#14213d" />
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
