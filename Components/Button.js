import React from "react";
import { Text, StyleSheet } from "react-native";
import { Pressable } from "native-base";

export default function Button(props) {
  const {
    onPress,
    title = "Save",
    color = "#14213d",
    disabled = false,
    width = "default",
    paddingHorizontal = 20,
  } = props;

  let styles = StyleSheet.create({
    button: {
      alignItems: "center",
      width: width === "default" ? "auto" : width,
      justifyContent: "center",
      paddingVertical: 12,
      paddingHorizontal: paddingHorizontal,
      marginHorizontal: 5,
      borderRadius: 10,
      elevation: 3,
      backgroundColor: disabled ? "slategray" : color,
    },
    text: {
      fontSize: 16,
      lineHeight: 21,
      fontWeight: "bold",
      letterSpacing: 0.25,
      color: disabled ? "lightgray" : "white",
    },
  });

  return (
    <Pressable disabled={disabled} style={styles.button} onPress={onPress}>
      <Text style={styles.text}>{title}</Text>
    </Pressable>
  );
}
