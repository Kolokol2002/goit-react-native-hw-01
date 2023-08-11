import { Image } from "react-native";
import { FontAwesome } from "@expo/vector-icons";
import { AntDesign } from "@expo/vector-icons";
import { EvilIcons } from "@expo/vector-icons";
import { Pressable } from "react-native";
import { StyleSheet } from "react-native";
import { View } from "react-native";
import { Text } from "react-native";
import { useNavigation } from "@react-navigation/native";

export const PostCard = ({
  data: { image, text, comments, likes, geolocation, location_name },
}) => {
  const navigation = useNavigation();
  const onToCommentsScreen = (comments, image) => {
    navigation.navigate("Comments", { comments, image });
  };

  return (
    <View style={styles.content}>
      <Image source={{ uri: image }} style={styles.contentImage} />
      <Text style={styles.contentName}>
        {text ? text : "Автор не залишив опису("}
      </Text>
      <View style={styles.contentInfoContainer}>
        <Pressable
          onPress={() => onToCommentsScreen(comments, image)}
          style={styles.contentCommentsContainer}
        >
          {comments?.length === 0 ? (
            <FontAwesome
              style={styles.contentCommentsIcon}
              name="comment-o"
              size={24}
              color={"rgba(189, 189, 189, 1)"}
            />
          ) : (
            <FontAwesome
              style={styles.contentCommentsIcon}
              name="comment"
              size={24}
              color={"rgba(255, 108, 0, 1)"}
            />
          )}
          <Text style={styles.contentComments}>{comments?.length}</Text>
        </Pressable>
        <View style={styles.contentLikesContainer}>
          <AntDesign
            style={styles.contentLikesIcon}
            name="like2"
            size={24}
            color={
              likes.length ? "rgba(255, 108, 0, 1)" : "rgba(189, 189, 189, 1)"
            }
          />
          <Text style={styles.contentLikes}>{likes.length}</Text>
        </View>
        <Pressable
          style={styles.contentLocationContainer}
          onPress={() =>
            navigation.navigate("Map", {
              cords: {
                latitude: geolocation.latitude,
                longitude: geolocation.longitude,
              },
            })
          }
        >
          <EvilIcons
            style={styles.contentLocationIcon}
            name="location"
            size={24}
            color="rgba(189, 189, 189, 1)"
          />
          <Text style={styles.contentLocation}>
            {location_name ? location_name : "Location"}
          </Text>
        </Pressable>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  contentImage: {
    height: 240,
    width: "100%",
    borderRadius: 8,
    marginBottom: 8,
  },
  contentName: {
    marginBottom: 8,
    fontWeight: 500,
    fontSize: 16,
  },
  contentInfoContainer: {
    flexDirection: "row",
  },
  contentCommentsContainer: {
    marginRight: 24,
    flexDirection: "row",
    alignItems: "center",
    gap: 6,
  },
  contentComments: { fontWeight: 400, fontSize: 16 },
  contentCommentsIcon: { transform: [{ scaleX: -1 }] },
  contentLikesContainer: { flexDirection: "row", alignItems: "center", gap: 6 },
  contentLikes: { fontWeight: 400, fontSize: 16 },
  contentLikesIcon: {},
  contentLocationContainer: {
    marginLeft: "auto",
    flexDirection: "row",
    alignItems: "center",
    gap: 6,
  },
  contentLocation: { fontWeight: 400, fontSize: 16 },
  contentLocationIcon: {},

  contentLocation: {},
  contentLocation: {},
  contentLocation: {},
});
