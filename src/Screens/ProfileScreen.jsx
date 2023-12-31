import { PhotoBox } from "../components/PhotoBox";
import { StyleSheet } from "react-native";
import { FlatList } from "react-native-gesture-handler";
import { PostCard } from "../components/PostCard";
import { View, ImageBackground, Text } from "react-native";
import backgroundImg from "../image/backgroundImg.jpg";
import { useFocusEffect, useIsFocused } from "@react-navigation/native";
import { useDispatch, useSelector } from "react-redux";
import { getInfoCurrentUser } from "../redux/selectors";
import { auth, db } from "../../config";
import { setIsLoading } from "../redux/authSlice";
import { useCallback, useEffect, useState } from "react";
import { updateProfile } from "firebase/auth";
import {
  collection,
  doc,
  onSnapshot,
  query,
  updateDoc,
  where,
} from "firebase/firestore";
import * as ImagePicker from "expo-image-picker";
import {
  getAvatarsFirestore,
  sendImageToStorage,
} from "../firebase/authFirebase";
import { nanoid } from "@reduxjs/toolkit";
import { Loader } from "../components/Loader";
import { LogOutButton } from "../components/LogOut";

export const ProfileScreen = () => {
  const { displayName } = auth.currentUser;
  const [posts, setPosts] = useState([]);
  const isFocused = useIsFocused();
  const [avatar, setAvatar] = useState("");
  const dispatch = useDispatch();

  useFocusEffect(
    useCallback(() => {
      dispatch(setIsLoading(true));
      const unsubscribe = () => {
        const posts = query(
          collection(db, "posts"),
          where("authorId", "==", auth.currentUser.uid)
        );
        return onSnapshot(posts, async (querySnapshot) => {
          try {
            const newData = querySnapshot.docs.map((doc) => ({
              ...doc.data(),
              id: doc.id,
            }));
            doc;

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
            dispatch(setIsLoading(false));
          } catch (error) {
            console.log(error);
          }
        });
      };
      unsubscribe();
    }, [])
  );

  useEffect(() => {
    const { photoURL } = auth.currentUser;
    setAvatar(photoURL);
  }, [avatar]);

  const onPickAvatar = async () => {
    try {
      let result = await ImagePicker.launchImageLibraryAsync({
        mediaTypes: ImagePicker.MediaTypeOptions.All,
        allowsEditing: true,
        aspect: [4, 3],
        quality: 1,
      });

      if (!result.canceled) {
        const { downloadUrl } = await sendImageToStorage({
          name: nanoid(),
          uri: result.assets[0].uri,
        });
        await updateAvatar(downloadUrl);
      } else {
        await updateAvatar("");
      }
    } catch (error) {
      console.log(error);
    }
  };

  const updateAvatar = async (avatarUrl) => {
    try {
      await updateProfile(auth.currentUser, {
        photoURL: avatarUrl,
      });
      const updates = posts.map(async ({ authorId }) => {
        try {
          const refPosts = doc(db, "users", authorId);
          return await updateDoc(refPosts, { authorAvatar: avatarUrl });
        } catch (error) {
          console.log(error);
        }
      });
      await Promise.all(updates);
      setAvatar(avatarUrl);
    } catch (error) {
      console.log(error);
    }
  };

  return (
    isFocused && (
      <ImageBackground style={styles.backgroundImg} source={backgroundImg}>
        <View style={styles.contentContainer}>
          <FlatList
            data={posts}
            keyExtractor={({ id }) => id}
            showsVerticalScrollIndicator={false}
            contentContainerStyle={
              posts.length === 0 || posts.length === 1
                ? {
                    height: "100%",
                  }
                : {}
            }
            ListHeaderComponent={
              <>
                <View style={styles.start}></View>
                <View style={styles.header}>
                  <PhotoBox avatar={avatar} onPickAvatar={onPickAvatar} />
                  <LogOutButton style={styles.logout} />
                  <Text style={styles.title}>{displayName}</Text>
                </View>
              </>
            }
            renderItem={({ item: data }) => (
              <View
                style={[
                  posts.length === 1
                    ? {
                        height: "100%",
                      }
                    : {},
                  styles.content,
                ]}
              >
                <PostCard data={data} />
                <View style={styles.end}></View>
              </View>
            )}
            ListEmptyComponent={
              <View style={styles.emptyTextContainer}>
                <Text style={styles.emptyText}>{"Posts empty((("}</Text>
              </View>
            }
          />
        </View>
        <Loader />
      </ImageBackground>
    )
  );
};

const styles = StyleSheet.create({
  backgroundImg: { flex: 1 },
  contentContainer: {
    height: "100%",
  },
  container: {},
  header: {
    backgroundColor: "#FFFFFF",
    borderTopLeftRadius: 25,
    borderTopRightRadius: 25,
    paddingBottom: 32,
  },
  content: {
    paddingHorizontal: 16,
    backgroundColor: "#FFFFFF",
  },
  title: {
    marginTop: 92,
    fontSize: 30,
    fontWeight: 500,
    lineHeight: 35,
    letterSpacing: 0.01,
    textAlign: "center",
  },
  logout: {
    position: "absolute",
    top: 0,
    right: 0,
    marginTop: 24,
    marginRight: 16,
  },
  emptyTextContainer: {
    backgroundColor: "#FFFFFF",
    height: "100%",
    alignItems: "center",
    paddingTop: 60,
  },
  emptyText: { color: "#808080", fontSize: 30 },
  end: { height: 32 },
  start: { height: 160 },
});
