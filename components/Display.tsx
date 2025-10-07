import React from "react";
import { View, Text, StyleSheet } from "react-native";
import { Colors } from "@/constants/theme";

interface DisplayProps {
  prevInput: string;
  operator: string | null;
  input: string;
}

const Display: React.FC<DisplayProps> = ({ prevInput, operator, input }) => (
  <View style={styles.displayContainer}>
    <Text style={styles.prevText}>
      {prevInput} {operator}
    </Text>
    <Text style={styles.displayText}>{input}</Text>
  </View>
);

export default Display;

const styles = StyleSheet.create({
  displayContainer: {
    marginBottom: 20,
    alignItems: "flex-end",
  },
  prevText: {
    color: Colors.lightGray,
    fontSize: 25,
  },
  displayText: {
    color: Colors.textPrimary,
    fontSize: 60,
    fontWeight: "300",
  },
});
