import React from "react";
import { ScrollView } from "react-native";
import { Image } from "react-native";
import { View, Text, StyleSheet } from "react-native";

export const CommentsScreen = ({ route }) => {
  const { comments, image } = route.params;
  console.log(comments);
  return (
    <View style={styles.container}>
      <ScrollView>
        <Image source={{ uri: image }} style={styles.postImage} />
        <View style={styles.commentsContainer}>
          {comments.map(({ authorId, authorAvatar, text, dataCreate }) => (
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
          ))}
        </View>
      </ScrollView>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    height: "100%",
    backgroundColor: "#fffff",
    paddingHorizontal: 16,
    paddingTop: 32,
  },
  postImage: {
    height: 240,
    width: "100%",
    borderRadius: 8,
    marginBottom: 32,
  },
  authorAvatar: { width: 28, height: 28, borderRadius: 50 },
  commentsContainer: { gap: 24, paddingBottom: 32 },
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
});
