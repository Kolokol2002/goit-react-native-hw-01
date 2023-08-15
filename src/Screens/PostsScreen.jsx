import React, { useCallback, useState } from "react";
import { StyleSheet, View } from "react-native";
import { FlatList } from "react-native-gesture-handler";
import { PostCard } from "../components/PostCard";
import { Text } from "react-native";
import { Image } from "react-native";
import blankProlife from "../image/profile.png";
import { useFocusEffect, useIsFocused } from "@react-navigation/native";
import { collection, onSnapshot } from "firebase/firestore";
import { db } from "../../config";
import { useDispatch } from "react-redux";
import { setIsLoading } from "../redux/authSlice";
import { Loader } from "../components/Loader";
import { getAvatarsFirestore } from "../firebase/authFirebase";

export const PostsScreen = () => {
  const [posts, setPosts] = useState([]);
  const isFocused = useIsFocused();
  const dispatch = useDispatch();

  useFocusEffect(
    useCallback(() => {
      dispatch(setIsLoading(true));
      const unsubscribe = (() => {
        const posts = collection(db, "posts");

        return onSnapshot(posts, async (querySnapshot) => {
          try {
            const newData = querySnapshot.docs.map((doc) => ({
              ...doc.data(),
              id: doc.id,
            }));
            const sortedData = newData.sort(
              (a, b) => b.timestamp.seconds - a.timestamp.seconds
            );

            const mapData = await Promise.all(
              sortedData.map(async (data) => {
                try {
                  const avatar = await getAvatarsFirestore(data.authorId);
                  return { ...data, authorImage: avatar?.authorAvatar };
                } catch (error) {
                  console.log(error);
                }
              })
            );
            setPosts(mapData);
          } catch (error) {
            console.log(error);
          }
        });
      })();
      dispatch(setIsLoading(false));
      return () => {
        unsubscribe();
      };
    }, [])
  );

  return (
    isFocused && (
      <View style={styles.container}>
        <FlatList
          data={posts}
          keyExtractor={({ id }) => id}
          showsVerticalScrollIndicator={false}
          renderItem={({
            item: { authorName, authorEmail, authorImage, ...data },
          }) => (
            <View style={styles.post}>
              <View style={styles.authorContainer}>
                <View style={styles.authorImageContainer}>
                  {authorImage ? (
                    <Image
                      source={{ uri: authorImage }}
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
                  <Text style={styles.authorName}>{authorName}</Text>
                  <Text style={styles.authorEmail}>{authorEmail}</Text>
                </View>
              </View>
              <View style={styles.contentContainer}>
                <PostCard data={{ ...data }} />
              </View>
            </View>
          )}
          ListEmptyComponent={
            <View style={styles.emptyTextContainer}>
              <Text style={styles.emptyText}>{"Posts empty((("}</Text>
            </View>
          }
        />
        <Loader />
      </View>
    )
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
  authorImage: {
    width: "100%",
    height: "100%",
    borderRadius: 16,
  },
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
  emptyTextContainer: {
    alignItems: "center",
    paddingTop: 60,
  },
  emptyText: { color: "#808080", fontSize: 30 },

  end: { height: 32 },
});
