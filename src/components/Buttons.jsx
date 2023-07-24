import { Pressable, StyleSheet, Text } from "react-native";

export const ButtonLogin = ({ text, onPress }) => {
  return (
    <Pressable
      style={({ pressed }) => [
        {
          backgroundColor: pressed ? "#ff6a00d3" : "#FF6C00",
        },
        styles.button,
      ]}
      onPress={onPress}
    >
      <Text>{text}</Text>
    </Pressable>
  );
};

const styles = StyleSheet.create({
  button: {
    marginTop: 43,
    paddingHorizontal: 32,
    paddingVertical: 16,
    alignItems: "center",
    borderRadius: 100,
  },
});
