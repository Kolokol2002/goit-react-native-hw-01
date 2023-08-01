import React from "react";
import { StyleSheet, Text, View } from "react-native";
import dataPosts from "../../assets/generated.json";
import { FlatList } from "react-native";
import { FlatListComponent } from "react-native";
import { Image } from "react-native";
import { FontAwesome } from "@expo/vector-icons";
import { AntDesign } from "@expo/vector-icons";
import { EvilIcons } from "@expo/vector-icons";
import { ScrollView } from "react-native-gesture-handler";
import { Pressable } from "react-native";
// import * as Location from "expo-location";
// import Geocode from "react-geocode";

// Geocode.setApiKey("AIzaSyAjKBO-0HSMLr5Ul6kcPw09zJNQA627FYw");

// const getAddress = async (latitude, longitude) => {
//   // const latitude = -31.008653;
//   // const longitude = -156.701398;
//   // const address = await Location.reverseGeocodeAsync({ latitude, longitude });
//   const address = await Geocode.fromLatLng(`${latitude}`, `${longitude}`);
//   // console.log({ latitude, longitude });
//   const result = `${address?.results[0]?.address_components[4]?.long_name}, ${address?.results[0]?.address_components[5]?.long_name}`;
//   console.log(address);
//   return result;
// };

export const PostsScreen = ({ navigation }) => {
  const onToCommentsScreen = () => {
    navigation.navigate("CommentsScreen");
  };
  return (
    <ScrollView style={styles.container}>
      {dataPosts.map(({ _id, name, email, image, posts }) => (
        <View style={styles.post} key={_id}>
          <View style={styles.authorContainer}>
            <Image source={{ uri: image }} style={styles.authorImage} />
            <View style={styles.authorInfoContainer}>
              <Text style={styles.authorName}>{name}</Text>
              <Text style={styles.authorEmail}>{email}</Text>
            </View>
          </View>

          <View style={styles.contentContainer}>
            {posts.map(
              ({ _id, image, name, comments, likes, latitude, longitude }) => (
                <View key={_id} style={styles.content}>
                  <Image source={{ uri: image }} style={styles.contentImage} />
                  <Text style={styles.contentName}>{name}</Text>
                  <View style={styles.contentInfoContainer}>
                    <Pressable
                      onPress={onToCommentsScreen}
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
                      <Text style={styles.contentComments}>
                        {comments.length}
                      </Text>
                    </Pressable>
                    <View style={styles.contentLikesContainer}>
                      <AntDesign
                        style={styles.contentLikesIcon}
                        name="like2"
                        size={24}
                        color={
                          likes
                            ? "rgba(255, 108, 0, 1)"
                            : "rgba(189, 189, 189, 1)"
                        }
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
              )
            )}
          </View>
        </View>
      ))}
      <View style={styles.end}></View>
    </ScrollView>
  );
};

export const styles = StyleSheet.create({
  container: {
    backgroundColor: "#FFFFFF",
    height: "100%",
    paddingHorizontal: 16,
    paddingBottom: 32,
  },
  post: {},
  authorContainer: {
    flexDirection: "row",
    alignItems: "center",
    paddingVertical: 32,
  },
  authorImage: {
    width: 60,
    height: 60,
    marginRight: 8,
    borderRadius: 16,
  },
  authorInfoContainer: {},
  authorName: { color: "#212121", fontWeight: 700, fontSize: 13 },
  authorEmail: {
    color: "rgba(33, 33, 33, 0.8)",
    fontWeight: 400,
    fontSize: 11,
  },
  contentContainer: { gap: 32 },
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
  end: { height: 32 },
});
