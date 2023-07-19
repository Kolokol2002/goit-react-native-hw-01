import { Alert, Pressable, StyleSheet, Text, View } from "react-native";

export const IsLogin = ({ text, linkText }) => {
  return (
    <View style={IsLoginStyled.container}>
      <Text style={IsLoginStyled.text}>{text}</Text>
      <Pressable
        onPress={() => Alert.alert("Button Pressed!")}
        style={IsLoginStyled.link}
      >
        <Text style={IsLoginStyled.linkText}>{linkText}</Text>
      </Pressable>
    </View>
  );
};

const IsLoginStyled = StyleSheet.create({
  container: {
    marginTop: 16,
    marginBottom: 78,
    flexDirection: "row",
    gap: 5,
    justifyContent: "center",
  },
  text: {},
  link: {},
  linkText: {
    textDecorationLine: "underline",
  },
});
