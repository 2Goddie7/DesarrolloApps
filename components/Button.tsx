import React from "react";
import { TouchableOpacity, Text, StyleSheet } from "react-native";
import * as Haptics from "expo-haptics";
import { Colors } from "@/constants/theme";

interface ButtonProps {
  label: string;
  onPress: (value: string) => void;
}

const Button: React.FC<ButtonProps> = ({ label, onPress }) => {
  const getButtonStyle = () => {
    if (label === "=" || ["÷", "x", "-", "+"].includes(label))
      return styles.orangeButton;
    if (["C", "+/-", "del"].includes(label))
      return styles.grayButton;
    return styles.darkButton;
  };

  const handlePress = () => {
    Haptics.impactAsync(Haptics.ImpactFeedbackStyle.Light);
    onPress(label);
  };

  return (
    <TouchableOpacity
      style={[
        styles.button,
        getButtonStyle(),
        label === "0" ? { flex: 2 } : {},
      ]}
      onPress={handlePress}
    >
      <Text style={styles.buttonText}>{label}</Text>
    </TouchableOpacity>
  );
};

export default Button;

const styles = StyleSheet.create({
  button: {
    backgroundColor: Colors.darkGray,
    width: 80,
    height: 80,
    borderRadius: 40,
    justifyContent: "center",
    alignItems: "center",
    marginHorizontal: 5,
  },
  darkButton: {
    backgroundColor: Colors.darkGray,
  },
  grayButton: {
    backgroundColor: Colors.lightGray,
  },
  orangeButton: {
    backgroundColor: Colors.orange,
  },
  buttonText: {
    color: Colors.textPrimary,
    fontSize: 28,
    fontWeight: "500",
  },
});