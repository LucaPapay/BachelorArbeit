import { StyleSheet, Text, View } from "react-native";
import QRCode from "react-native-qrcode-svg";

export default function ScannerResult({ route, navigation }) {
  const { scannedResult } = route.params;
  let scanned = scannedResult.substring(1, scannedResult.length - 1);
  return (
    <View style={{ flex: 1, justifyContent: "center", alignItems: "center" }}>
      <Text style={styles.title}>Scanned:</Text>
      <Text style={(styles.title, { marginBottom: 50 })}>{scanned}</Text>
      <QRCode size={350} value={scanned} />
    </View>
  );
}

const styles = StyleSheet.create({
  title: {
    fontSize: 24,
    color: "#14213d",
    justifyContent: "flex-start",
  },
});
