import React, { useState } from "react";
import { View, StyleSheet } from "react-native";
import { Colors } from "@/constants/theme";
import Display from "../components/Display";
import ButtonRow from "../components/ButtonRow";

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
      <Display prevInput={prevInput} operator={operator} input={input} />
      <View style={styles.buttonsContainer}>
        {buttons.map((row, i) => (
          <ButtonRow key={i} row={row} handlePress={handlePress} />
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
  buttonsContainer: {
    marginBottom: 30,
  },
});