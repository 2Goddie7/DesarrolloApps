import React, { useState } from "react";
import { View, Text, StyleSheet, TouchableOpacity } from "react-native";
import { Colors } from "@/constants/theme";

const CalculatorApp = () => {
  const [input, setInput] = useState("0");
  const [prevInput, setPrevInput] = useState("");
  const [operator, setOperator] = useState<string | null>(null);

  const handlePress = (value: string) => {
    if (["+", "-", "x", "÷"].includes(value)) {
      setOperator(value);
      setPrevInput(input);
      setInput("0");
      return;
    }

    if (value === "=") {
      calculate();
      return;
    }

    if (value === "C") {
      setInput("0");
      setPrevInput("");
      setOperator(null);
      return;
    }

    if (value === "+/-") {
      setInput((prev) =>
        prev.startsWith("-") ? prev.slice(1) : "-" + prev
      );
      return;
    }

    if (value === "del") {
      setInput((prev) => (prev.length > 1 ? prev.slice(0, -1) : "0"));
      return;
    }

    // Números y punto decimal
    setInput((prev) => (prev === "0" ? value : prev + value));
  };

  const calculate = () => {
    const num1 = parseFloat(prevInput);
    const num2 = parseFloat(input);
    let result = 0;

    switch (operator) {
      case "+":
        result = num1 + num2;
        break;
      case "-":
        result = num1 - num2;
        break;
      case "x":
        result = num1 * num2;
        break;
      case "÷":
        result = num2 !== 0 ? num1 / num2 : 0;
        break;
    }

    setInput(result.toString());
    setPrevInput("");
    setOperator(null);
  };

  const buttons = [
    ["C", "+/-", "del", "÷"],
    ["7", "8", "9", "x"],
    ["4", "5", "6", "-"],
    ["1", "2", "3", "+"],
    ["0", ".", "="],
  ];

  return (
    <View style={styles.container}>
      <View style={styles.displayContainer}>
        <Text style={styles.prevText}>
          {prevInput} {operator}
        </Text>
        <Text style={styles.displayText}>{input}</Text>
      </View>

      <View style={styles.buttonsContainer}>
        {buttons.map((row, i) => (
          <View key={i} style={styles.row}>
            {row.map((btn) => (
              <TouchableOpacity
                key={btn}
                style={[
                  styles.button,
                  btn === "=" || ["÷", "x", "-", "+"].includes(btn)
                    ? styles.orangeButton
                    : btn === "C" || btn === "+/-" || btn === "del"
                    ? styles.grayButton
                    : styles.darkButton,
                  btn === "0" ? { flex: 2 } : {},
                ]}
                onPress={() => handlePress(btn)}
              >
                <Text style={styles.buttonText}>{btn}</Text>
              </TouchableOpacity>
            ))}
          </View>
        ))}
      </View>
    </View>
  );
};

export default CalculatorApp;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: Colors.background,
    justifyContent: "flex-end",
    padding: 20,
  },
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
  buttonsContainer: {
    marginBottom: 30,
  },
  row: {
    flexDirection: "row",
    justifyContent: "space-between",
    marginVertical: 8,
  },
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
