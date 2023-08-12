import { PhotoBox } from "../components/PhotoBox";
import { StyleSheet } from "react-native";
import { FlatList } from "react-native-gesture-handler";
import { PostCard } from "../components/PostCard";
import { View, ImageBackground, Text } from "react-native";
import backgroundImg from "../image/backgroundImg.jpg";
import { MaterialIcons } from "@expo/vector-icons";
import { Pressable } from "react-native";
import { useFocusEffect, useIsFocused } from "@react-navigation/native";
import { useDispatch, useSelector } from "react-redux";
import { getInfoCurrentUser } from "../redux/selectors";
import { auth, db } from "../../config";
import { setLogOut } from "../redux/authSlice";
import { useCallback, useEffect, useState } from "react";
import { signOut, updateProfile } from "firebase/auth";
import { collection, onSnapshot, query, where } from "firebase/firestore";
import * as ImagePicker from "expo-image-picker";
import { sendImageToStorage } from "../firebase/authFirebase";
import { nanoid } from "@reduxjs/toolkit";

export const ProfileScreen = () => {
  const user = useSelector(getInfoCurrentUser);
  const [posts, setPosts] = useState([]);
  const isFocused = useIsFocused();
  const [avatar, setAvatar] = useState("");

  useFocusEffect(
    useCallback(() => {
      const unsubscribe = () => {
        const posts = query(
          collection(db, "posts"),
          where("authorId", "==", auth.currentUser.uid)
        );
        return onSnapshot(posts, (querySnapshot) => {
          const newData = querySnapshot.docs.map((doc) => ({
            ...doc.data(),
            id: doc.id,
          }));

          setPosts(newData);
        });
      };
      return () => {
        unsubscribe();
      };
    }, [])
  );

  useEffect(() => {
    const { photoURL } = auth.currentUser;
    setAvatar(photoURL);
  }, [avatar]);

  const dispatch = useDispatch();

  const onLoginOut = () => {
    signOut(auth);
    dispatch(setLogOut());
  };

  const onPickAvatar = async () => {
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

      await updateProfile(auth.currentUser, {
        photoURL: downloadUrl,
      });
      setAvatar(downloadUrl);
    } else {
      setAvatar("");
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
                  <Pressable onPress={onLoginOut} style={styles.logout}>
                    <MaterialIcons
                      style={styles.logoutIcon}
                      name="logout"
                      size={24}
                      color="#BDBDBD"
                    />
                  </Pressable>
                  <Text style={styles.title}>{user.name}</Text>
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
  logoutIcon: {},
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
