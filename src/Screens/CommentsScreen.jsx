import React from "react";
import { Image } from "react-native";
import { View, Text, StyleSheet } from "react-native";
import { FlatList } from "react-native-gesture-handler";

export const CommentsScreen = ({ route }) => {
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
});
