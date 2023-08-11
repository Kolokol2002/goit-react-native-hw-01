import React from "react";
import { StyleSheet, View } from "react-native";
import { FlatList } from "react-native-gesture-handler";
import { PostCard } from "../components/PostCard";
import { Text } from "react-native";
import { Image } from "react-native";
import { useSelector } from "react-redux";
import { getInfoAllUser } from "../redux/selectors";
import blankProlife from "../image/profile.png";

export const PostsScreen = () => {
  const posts = useSelector(getInfoAllUser);

  return (
    <View style={styles.container}>
      <FlatList
        data={posts}
        keyExtractor={({ id }) => id}
        showsVerticalScrollIndicator={false}
        renderItem={({ item: { name, email, profile_picture, posts } }) => (
          <View style={styles.post}>
            <View style={styles.authorContainer}>
              <View style={styles.authorImageContainer}>
                {profile_picture ? (
                  <Image
                    source={{ uri: profile_picture }}
                    style={styles.authorImage}
                  />
                ) : (
                  <Image
                    source={blankProlife}
                    style={styles.authorImageBlank}
                  />
                )}
              </View>
              <View style={styles.authorInfoContainer}>
                <Text style={styles.authorName}>{name}</Text>
                <Text style={styles.authorEmail}>{email}</Text>
              </View>
            </View>
            <View style={styles.contentContainer}>
              <FlatList
                data={posts}
                keyExtractor={({ id }) => id}
                showsVerticalScrollIndicator={false}
                renderItem={({ item: data }) => (
                  <>
                    <PostCard data={data} />
                    <View style={styles.end}></View>
                  </>
                )}
              />
            </View>
          </View>
        )}
      />
    </View>
  );
};

export const styles = StyleSheet.create({
  contentContainer: { gap: 32 },
  post: {},
  authorContainer: {
    flexDirection: "row",
    alignItems: "center",
    paddingVertical: 32,
  },
  authorImageContainer: {
    width: 60,
    height: 60,
    marginRight: 8,
    borderRadius: 16,
    backgroundColor: "#a0a0a0",
    alignItems: "center",
    justifyContent: "center",
  },
  authorImageBlank: { width: 40, height: 40 },
  authorImage: { width: 40, height: 40 },
  authorInfoContainer: {},
  authorName: { color: "#212121", fontWeight: 700, fontSize: 13 },
  authorEmail: {
    color: "rgba(33, 33, 33, 0.8)",
    fontWeight: 400,
    fontSize: 11,
  },
  container: {
    backgroundColor: "#FFFFFF",
    flex: 1,
    paddingHorizontal: 16,
  },

  end: { height: 32 },
});
