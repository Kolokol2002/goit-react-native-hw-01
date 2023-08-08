import React, { useState } from "react";
import {
  Image,
  KeyboardAvoidingView,
  Pressable,
  TextInput,
} from "react-native";
import { View, Text, StyleSheet } from "react-native";
import { FlatList } from "react-native-gesture-handler";
import { AntDesign } from "@expo/vector-icons";

export const CommentsScreen = ({ route }) => {
  const [borderColor, setBorderColor] = useState("rgba(232, 232, 232, 1)");
  const [backgroundColor, setBackgroundColor] = useState(
    "rgba(246, 246, 246, 1)"
  );
  const [commentText, setCommentText] = useState("");

  const onBlur = () => {
    setBackgroundColor("rgba(246, 246, 246, 1)");
    setBorderColor("rgba(232, 232, 232, 1)");
  };
  const onFocus = () => {
    setBackgroundColor("#FFFFFF");
    setBorderColor("#FF6C00");
  };

  const onSendText = () => {
    console.log(commentText);
    setCommentText("");
  };

  const { comments, image } = route.params;
  return (
    <View style={styles.container}>
      <FlatList
        data={comments}
        keyExtractor={({ _id }) => _id}
        showsVerticalScrollIndicator={false}
        ListHeaderComponent={
          <>
            <View style={styles.start}></View>
            <Image source={{ uri: image }} style={styles.postImage} />
          </>
        }
        renderItem={({
          item: { authorId, authorAvatar, text, dataCreate },
        }) => (
          <View style={styles.commentsContainer}>
            <View style={styles.commentContainer} key={authorId}>
              <Image
                source={{ uri: authorAvatar }}
                style={styles.authorAvatar}
              />
              <View style={styles.textContainer}>
                <Text style={styles.text}>{text}</Text>
                <Text style={styles.data}>{dataCreate}</Text>
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
                backgroundColor: pressed ? "#ff6a00ba" : "rgba(255, 108, 0, 1)",
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
    </View>
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
  authorAvatar: { width: 28, height: 28, borderRadius: 50 },
  commentsContainer: { marginBottom: 24 },
  commentContainer: {
    flexDirection: "row",
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
  },
  data: {
    fontSize: 10,
    fontWeight: 400,
    color: "rgba(189, 189, 189, 1)",
    marginLeft: "auto",
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
