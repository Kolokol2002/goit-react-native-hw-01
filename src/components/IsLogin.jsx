import { Alert, Pressable, StyleSheet, Text, View } from "react-native";

export const IsLogin = ({ text }) => {
  return (
    <View style={styles.container}>
      <Pressable
        onPress={() => Alert.alert("Button Pressed!")}
        style={styles.link}
      >
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
