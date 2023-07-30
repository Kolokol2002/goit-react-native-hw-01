import { Pressable, StyleSheet, Text, View } from "react-native";

export const IsLogin = ({ text, onPress }) => {
  return (
    <View style={styles.container}>
      <Pressable onPress={onPress} style={styles.link}>
        <Text style={styles.text}>{text}</Text>
      </Pressable>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    marginTop: 16,
    marginBottom: 78,
    flexDirection: "row",
    justifyContent: "center",
  },
  text: {
    textDecorationLine: "underline",
  },
  link: {},
});
