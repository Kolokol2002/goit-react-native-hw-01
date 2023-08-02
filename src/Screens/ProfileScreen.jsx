import { PhotoBox } from "../components/PhotoBox";
import { StyleSheet } from "react-native";
import profileData from "../../assets/profileData.json";
import { ScrollView } from "react-native-gesture-handler";
import { PostCard } from "../components/PostCard";
import { View, ImageBackground, Text } from "react-native";
import backgroundImg from "../image/backgroundImg.jpg";
import { MaterialIcons } from "@expo/vector-icons";
import { Pressable } from "react-native";

export const ProfileScreen = ({ navigation }) => {
  const { name, posts } = profileData;
  return (
    <ImageBackground source={backgroundImg}>
      <ScrollView>
        <View style={styles.container}>
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
            <View style={styles.contentContainer}>
              {posts.map((data) => (
                <PostCard key={data._id} navigation={navigation} data={data} />
              ))}
            </View>
            <View style={styles.end}></View>
          </View>
        </View>
      </ScrollView>
    </ImageBackground>
  );
};

const styles = StyleSheet.create({
  contentContainer: { gap: 32 },
  container: {
    height: "100%",
    marginTop: 100,
    justifyContent: "flex-end",
  },
  content: {
    backgroundColor: "#FFFFFF",
    borderTopLeftRadius: 25,
    borderTopRightRadius: 25,
    paddingHorizontal: 16,
    paddingBottom: 100,
  },
  title: {
    marginTop: 92,
    marginBottom: 32,
    textAlign: "center",
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
});
