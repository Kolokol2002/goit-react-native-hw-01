import React, { useCallback, useState } from "react";
import {
  Image,
  Keyboard,
  KeyboardAvoidingView,
  Pressable,
  TextInput,
} from "react-native";
import { View, Text, StyleSheet } from "react-native";
import { FlatList } from "react-native-gesture-handler";
import { AntDesign } from "@expo/vector-icons";
import { useFocusEffect, useIsFocused } from "@react-navigation/native";
import { doc, onSnapshot } from "firebase/firestore";
import { auth, db } from "../../config";
import {
  getAvatarsFirestore,
  sendCommentFirestore,
} from "../firebase/authFirebase";
import moment from "moment/moment";
import "moment/min/locales";
import blankProlife from "../image/profile.png";

export const CommentsScreen = ({ route }) => {
  const [borderColor, setBorderColor] = useState("rgba(232, 232, 232, 1)");
  const [backgroundColor, setBackgroundColor] = useState(
    "rgba(246, 246, 246, 1)"
  );
  const [commentText, setCommentText] = useState("");

  const [comments, setComments] = useState([]);
  const [image, setImage] = useState("");
  const isFocused = useIsFocused();

  const { postId } = route.params;
  useFocusEffect(
    useCallback(() => {
      // dispatch(setIsLoading(true));
      const unsubscribePosts = (() => {
        const comments = doc(db, "posts", postId);

        return onSnapshot(comments, async (querySnapshot) => {
          const { comments, image } = querySnapshot.data();

          if (comments.length) {
            const res = moment.unix(comments[0].timestamp.seconds);
            const res2 = moment(res).format("DD MMMM, YYYY | HH:mm");
            const filteredData = comments.sort(
              (a, b) => a.timestamp.seconds - b.timestamp.seconds
            );

            const mapData = await Promise.all(
              filteredData.map(async (data) => {
                const avatar = await getAvatarsFirestore(data.authorId);
                return {
                  ...data,
                  timestamp: res2,
                  authorAvatar: avatar?.authorAvatar,
                };
              })
            );
            setComments(mapData);
          }
          setImage(image);
        });
      })();
      // dispatch(setIsLoading(false));
      return () => {
        unsubscribePosts();
      };
    }, [auth.currentUser.photoURL])
  );

  const onBlur = () => {
    setBackgroundColor("rgba(246, 246, 246, 1)");
    setBorderColor("rgba(232, 232, 232, 1)");
  };
  const onFocus = () => {
    setBackgroundColor("#FFFFFF");
    setBorderColor("#FF6C00");
  };

  const onSendText = async () => {
    await sendCommentFirestore({
      text: commentText,
      postId: postId,
    });
    setCommentText("");
    onBlur();
    Keyboard.dismiss();
  };

  return (
    isFocused && (
      <Pressable style={styles.container} onPress={onBlur}>
        <FlatList
          data={comments}
          keyExtractor={({ id }) => id}
          showsVerticalScrollIndicator={false}
          ListHeaderComponent={
            <>
              <View style={styles.start}></View>
              {image && (
                <Image source={{ uri: image }} style={styles.postImage} />
              )}
            </>
          }
          renderItem={({
            item: { authorId, authorAvatar, text, timestamp },
          }) => (
            <View style={styles.commentsContainer}>
              <View
                style={[
                  {
                    flexDirection:
                      authorId === auth.currentUser.uid ? "row-reverse" : "row",
                  },
                  styles.commentContainer,
                ]}
              >
                {authorAvatar ? (
                  <Image
                    source={{ uri: authorAvatar }}
                    style={styles.authorAvatar}
                  />
                ) : (
                  <View style={styles.blankAvatarContainer}>
                    <Image source={blankProlife} style={styles.blankAvatar} />
                  </View>
                )}
                <View style={styles.textContainer}>
                  <Text style={styles.text}>{text}</Text>
                  <Text
                    style={[
                      {
                        marginLeft:
                          authorId !== auth.currentUser.uid ? "auto" : 0,
                      },
                      styles.data,
                    ]}
                  >
                    {timestamp}
                  </Text>
                </View>
              </View>
            </View>
          )}
        />
        <KeyboardAvoidingView
          behavior={Platform.OS == "ios" ? "padding" : "height"}
        >
          <TextInput
            onBlur={onBlur}
            onFocus={onFocus}
            value={commentText}
            onChangeText={setCommentText}
            style={[
              { backgroundColor: backgroundColor, borderColor: borderColor },
              styles.input,
            ]}
            placeholder={"Коментувати..."}
          />
          <Pressable
            onPress={onSendText}
            style={({ pressed }) => {
              return [
                {
                  backgroundColor: pressed
                    ? "#ff6a00ba"
                    : "rgba(255, 108, 0, 1)",
                },
                styles.sendButton,
              ];
            }}
          >
            <AntDesign
              style={styles.sendIcon}
              name="arrowup"
              size={20}
              color="rgba(255, 255, 255, 1)"
            />
          </Pressable>
        </KeyboardAvoidingView>
      </Pressable>
    )
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fffff",
    paddingHorizontal: 16,
  },
  postImage: {
    height: 240,
    width: "100%",
    borderRadius: 8,
    marginBottom: 32,
  },
  blankAvatarContainer: {
    width: 28,
    height: 28,
    borderRadius: 50,
    backgroundColor: "rgba(0, 0, 0, 0.03)",
    justifyContent: "center",
    alignItems: "center",
  },
  blankAvatar: {
    // borderRadius: 50,
    width: 20,
    height: 20,
  },

  authorAvatar: {
    width: 28,
    height: 28,
    borderRadius: 50,
  },
  commentsContainer: { marginBottom: 24 },
  commentContainer: {
    gap: 16,
  },
  textContainer: {
    padding: 16,
    width: "86%",
    backgroundColor: "rgba(0, 0, 0, 0.03)",
    borderBottomLeftRadius: 6,
    borderBottomRightRadius: 6,
    borderTopRightRadius: 6,
  },
  text: {
    fontSize: 13,
    fontWeight: 400,
    color: "rgba(33, 33, 33, 1)",
    width: "100%",
    marginBottom: 8,
  },
  data: {
    fontSize: 10,
    fontWeight: 400,
    color: "rgba(189, 189, 189, 1)",
  },
  start: { height: 32 },
  input: {
    marginVertical: 16,
    height: 50,
    padding: 16,
    borderWidth: 1,
    borderRadius: 50,
  },
  sendButton: {
    position: "absolute",
    zIndex: 3,
    width: 34,
    height: 34,
    borderRadius: 100,
    top: "30%",
    right: 8,
    justifyContent: "center",
    alignItems: "center",
  },
  sendIcon: {},
});
