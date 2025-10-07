import React from "react";
import { View, StyleSheet } from "react-native";
import Button from "./Button";

interface ButtonRowProps {
  row: string[];
  handlePress: (value: string) => void;
}

const ButtonRow: React.FC<ButtonRowProps> = ({ row, handlePress }) => (
  <View style={styles.row}>
    {row.map((btn) => (
      <Button key={btn} label={btn} onPress={handlePress} />
    ))}
  </View>
);

export default ButtonRow;

const styles = StyleSheet.create({
  row: {
    flexDirection: "row",
    justifyContent: "space-between",
    marginVertical: 8,
  },
});
