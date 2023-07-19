import { Alert, Pressable, StyleSheet, Text } from "react-native";

export const ButtonLogin = ({ text }) => {
  return (
    <Pressable
      style={({ pressed }) => [
        {
          backgroundColor: pressed ? "red" : "#FF6C00",
        },
        ButtonLoginStyled.button,
      ]}
      onPress={() => Alert.alert("Button Pressed!")}
    >
      <Text>{text}</Text>
    </Pressable>
  );
};

const ButtonLoginStyled = StyleSheet.create({
  button: {
    marginTop: 43,
    paddingHorizontal: 32,
    paddingVertical: 16,
    alignItems: "center",
    borderRadius: 100,
  },
});
