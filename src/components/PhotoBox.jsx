import { Pressable, StyleSheet, View } from "react-native";
import { AntDesign } from "@expo/vector-icons";
import { Image } from "react-native";
import blankProlife from "../image/profile.png";

export const PhotoBox = ({ onPickAvatar, avatar }) => {
  return (
    <View style={styles.container}>
      {avatar ? (
        <Image source={{ uri: avatar }} style={styles.authorImage} />
      ) : (
        <Image source={blankProlife} style={styles.authorImageBlank} />
      )}
      <Pressable style={styles.buttonIcon} onPress={onPickAvatar}>
        <AntDesign
          style={styles.iconAddPhoto}
          name="pluscircleo"
          size={24}
          color="black"
        />
      </Pressable>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    position: "absolute",
    zIndex: 2,
    top: -60,
    alignSelf: "center",
    width: 120,
    height: 120,
    backgroundColor: "#F6F6F6",
    borderRadius: 16,
    alignItems: "center",
    justifyContent: "center",
  },
  buttonIcon: {
    position: "absolute",
    zIndex: 2,
    bottom: 10,
    right: -12.5,
    width: 25,
    height: 25,
  },
  iconAddPhoto: {
    color: "#FF6C00",
  },
  authorImage: { width: "100%", height: "100%", borderRadius: 16 },
  authorImageBlank: { width: 75, height: 75 },
});
