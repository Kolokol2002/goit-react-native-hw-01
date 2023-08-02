import React from "react";
import { StyleSheet, View } from "react-native";
import dataPosts from "../../assets/generated.json";

import { ScrollView } from "react-native-gesture-handler";
import { PostCard } from "../components/PostCard";
import { Text } from "react-native";
import { Image } from "react-native";

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
          <PostCard navigation={navigation} posts={posts} />
        </View>
      ))}
      <View style={styles.end}></View>
    </ScrollView>
  );
};

export const styles = StyleSheet.create({
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
  container: {
    backgroundColor: "#FFFFFF",
    height: "100%",
    paddingHorizontal: 16,
    paddingBottom: 32,
  },

  end: { height: 32 },
});
