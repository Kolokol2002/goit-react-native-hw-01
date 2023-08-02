import { Image } from "react-native";
import { FontAwesome } from "@expo/vector-icons";
import { AntDesign } from "@expo/vector-icons";
import { EvilIcons } from "@expo/vector-icons";
import { Pressable } from "react-native";
import { StyleSheet } from "react-native";
import { View } from "react-native";
import { Text } from "react-native";
import { FlatList } from "react-native";

export const PostCard = ({
  navigation,
  data: { image, name, comments, likes, latitude, longitude },
}) => {
  const onToCommentsScreen = (comments, image) => {
    navigation.navigate("Comments", { comments, image });
  };

  return (
    <View style={styles.content}>
      <Image source={{ uri: image }} style={styles.contentImage} />
      <Text style={styles.contentName}>{name}</Text>
      <View style={styles.contentInfoContainer}>
        <Pressable
          onPress={() => onToCommentsScreen(comments, image)}
          style={styles.contentCommentsContainer}
        >
          {comments.length === 0 ? (
            <FontAwesome
              name="comment-0"
              size={24}
              color={"rgba(189, 189, 189, 1)"}
            />
          ) : (
            <FontAwesome
              name="comment"
              size={24}
              color={"rgba(255, 108, 0, 1)"}
            />
          )}
          <Text style={styles.contentComments}>{comments.length}</Text>
        </Pressable>
        <View style={styles.contentLikesContainer}>
          <AntDesign
            style={styles.contentLikesIcon}
            name="like2"
            size={24}
            color={likes ? "rgba(255, 108, 0, 1)" : "rgba(189, 189, 189, 1)"}
          />
          <Text style={styles.contentLikes}>{likes}</Text>
        </View>
        <View style={styles.contentLocationContainer}>
          <EvilIcons
            style={styles.contentLocationIcon}
            name="location"
            size={24}
            color="rgba(189, 189, 189, 1)"
          />
          {/* {console.log(getAddress(latitude, longitude))} */}
          {/* <Text>{getAddress(latitude, longitude)}</Text> */}
          <Text style={styles.contentLocation}>Ukraine</Text>
        </View>
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
  contentCommentsIcon: {},
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
