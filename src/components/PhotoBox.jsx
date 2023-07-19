import { Alert, Pressable, StyleSheet, View } from "react-native";
import { AntDesign } from "@expo/vector-icons";

export const PhotoBox = () => {
  return (
    <View style={PhotoBoxStyled.container}>
      <Pressable
        style={PhotoBoxStyled.buttonIcon}
        onPress={() => Alert.alert("Button Pressed!")}
      >
        <AntDesign
          style={PhotoBoxStyled.iconAddPhoto}
          name="pluscircleo"
          size={24}
          color="black"
        />
      </Pressable>
    </View>
  );
};

const PhotoBoxStyled = StyleSheet.create({
  container: {
    position: "absolute",
    top: -60,
    alignSelf: "center",
    width: 120,
    height: 120,
    backgroundColor: "#F6F6F6",
    borderRadius: 16,
  },
  buttonIcon: {
    position: "absolute",
    bottom: 10,
    right: -12.5,
    width: 25,
    height: 25,
  },
  iconAddPhoto: {
    color: "#FF6C00",
  },
});