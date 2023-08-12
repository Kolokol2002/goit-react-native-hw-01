import { Image } from "react-native";
import { FontAwesome, MaterialCommunityIcons } from "@expo/vector-icons";
import { AntDesign } from "@expo/vector-icons";
import { EvilIcons } from "@expo/vector-icons";
import { Pressable } from "react-native";
import { StyleSheet } from "react-native";
import { View } from "react-native";
import { Text } from "react-native";
import { useFocusEffect, useNavigation } from "@react-navigation/native";
import { useCallback, useState } from "react";
import { likeFirestore } from "../firebase/authFirebase";
import { auth } from "../../config";
import Animated, {
  useAnimatedStyle,
  useSharedValue,
  withDelay,
  withSpring,
} from "react-native-reanimated";

export const PostCard = ({
  data: { id, image, text, comments, likes, geolocation, location_name },
}) => {
  const navigation = useNavigation();
  const [lastPress, setLastPress] = useState(null);
  const [isLiked, setIsLiked] = useState(false);
  const liked = useSharedValue(0);

  useFocusEffect(
    useCallback(() => {
      const isLike = likes.findIndex(
        ({ authorId }) => authorId === auth.currentUser.uid
      );
      setIsLiked(isLike !== -1);
      return () => {};
    }, [likes])
  );

  const onToCommentsScreen = (comments, image) => {
    navigation.navigate("Comments", { comments, image });
  };

  const fillStyle = useAnimatedStyle(() => {
    return {
      transform: [
        {
          scale: liked.value,
        },
      ],
      opacity: liked.value,
    };
  });

  const onDoubleClick = async () => {
    const delta = new Date().getTime() - lastPress;

    if (delta < 250) {
      await onLike(id);
    }

    setLastPress(new Date().getTime());
  };

  const onLike = async () => {
    setIsLiked(isLiked ? false : true);
    liked.value = withSpring(liked.value ? 0 : 1);

    liked.value = withDelay(1000, withSpring(0, { duration: 500 }));

    await likeFirestore(id, isLiked);
  };

  return (
    <View style={styles.content}>
      <Pressable onPress={onDoubleClick}>
        <Image source={{ uri: image }} style={styles.contentImage} />
        <View style={styles.likeAnimationIcon}>
          <Animated.View style={fillStyle}>
            {!isLiked ? (
              <MaterialCommunityIcons
                name={"heart-outline"}
                size={62}
                color={"black"}
              />
            ) : (
              <MaterialCommunityIcons name={"heart"} size={62} color={"red"} />
            )}
          </Animated.View>
        </View>
      </Pressable>
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
        <Pressable onPress={onLike}>
          <View style={styles.contentLikesContainer}>
            <AntDesign
              style={styles.contentLikesIcon}
              name="like2"
              size={24}
              color={
                isLiked ? "rgba(255, 108, 0, 1)" : "rgba(189, 189, 189, 1)"
              }
            />
            <Text style={styles.contentLikes}>{likes.length}</Text>
          </View>
        </Pressable>
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

  likeAnimationContainer: { height: "100%", width: "100%" },
  likeAnimationIcon: {
    position: "absolute",
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    justifyContent: "center",
    alignItems: "center",
  },
});
