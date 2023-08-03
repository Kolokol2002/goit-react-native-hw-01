import { PhotoBox } from "../components/PhotoBox";
import { StyleSheet } from "react-native";
import profileData from "../../assets/profileData.json";
import { FlatList } from "react-native-gesture-handler";
import { PostCard } from "../components/PostCard";
import { View, ImageBackground, Text } from "react-native";
import backgroundImg from "../image/backgroundImg.jpg";
import { MaterialIcons } from "@expo/vector-icons";
import { Pressable } from "react-native";

export const ProfileScreen = ({ navigation }) => {
  const { name, posts } = profileData;
  return (
    <ImageBackground style={styles.backgroundImg} source={backgroundImg}>
      <View style={styles.container}>
        <FlatList
          data={posts}
          keyExtractor={({ _id }) => _id}
          ListHeaderComponent={
            <>
              <View style={styles.start}></View>
              <View style={styles.content}>
                <Pressable
                  onPress={() => navigation.navigate("LoginScreen")}
                  style={styles.logout}
                >
                  <MaterialIcons
                    style={styles.logoutIcon}
                    name="logout"
                    size={24}
                    color="#BDBDBD"
                  />
                </Pressable>
                <PhotoBox />
                <Text style={styles.title}>{name}</Text>
              </View>
            </>
          }
          renderItem={({ item: data }) => (
            <View style={styles.contentContainer}>
              <PostCard navigation={navigation} data={data} />
              <View style={styles.end}></View>
            </View>
          )}
        />
      </View>
    </ImageBackground>
  );
};

const styles = StyleSheet.create({
  backgroundImg: { flex: 1 },
  contentContainer: { backgroundColor: "#FFFFFF", paddingHorizontal: 16 },
  container: {},
  content: {
    backgroundColor: "#FFFFFF",
    borderTopLeftRadius: 25,
    borderTopRightRadius: 25,

    paddingBottom: 32,
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
  end: { height: 32 },
  start: { height: 160 },
});
