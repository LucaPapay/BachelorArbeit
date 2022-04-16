import { StyleSheet, Text, View } from "react-native";
import QRCode from "react-native-qrcode-svg";

export function EntryCodeView({ route, navigation }) {
  const { name, parentIds } = route.params;
  let code = "";
  parentIds.forEach((element) => {
    code = code + element + ",";
  });
  code = code.slice(0, -1);

  return (
    <View style={{ flex: 1, alignItems: "center" }}>
      <Text style={styles.title}>{name}</Text>
      <Text style={(styles.title, { marginBottom: 25 })}>{code}</Text>
      <QRCode style={{ marginBottom: 25 }} size={350} value={code} />
    </View>
  );
}

const styles = StyleSheet.create({
  title: {
    fontSize: 24,
    color: "#14213d",
    justifyContent: "flex-start",
    marginTop: 30,
    marginBottom: 55,
  },
});
