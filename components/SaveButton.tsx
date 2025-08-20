import React from "react";
import { StyleSheet, Text, TouchableOpacity } from "react-native";

interface SaveButtonProps {
  onPress: () => void;
}

const SaveButton: React.FC<SaveButtonProps> = ({ onPress }) => {
  return (
    <TouchableOpacity style={styles.button} onPress={onPress}>
      <Text style={styles.text}>Salvar</Text>
    </TouchableOpacity>
  );
}

const styles = StyleSheet.create({
  button: {
    backgroundColor: "#007AFF",
    paddingHorizontal: 20,
    paddingVertical: 10,
    borderRadius: 8,
    marginTop: 10,
  },
  text: {
    color: "white",
    fontSize: 16,
    fontWeight: "600",
    textAlign: "center",
  }
});

export default SaveButton; 