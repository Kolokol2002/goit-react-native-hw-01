import { StatusBar } from "expo-status-bar";
import { Image, LogBox, StyleSheet, Text, View } from "react-native";
import { RegistrationScreen } from "./Screens/RegistrationScreen";
import { PostsScreen } from "./Screens/PostsScreen";
import { LoginScreen } from "./Screens/LoginScreen";

export default function App() {
  return (
    <View>
      {/* <RegistrationScreen /> */}
      {/* <PostsScreen /> */}
      <LoginScreen />
    </View>
  );
}

// const styles = StyleSheet.create({
//   container: {
//     flex: 1,
//     backgroundColor: "#fff",
//     alignItems: "center",
//     justifyContent: "center",
//   },
//   text: {
//     fontSize: 50,
//   },
//   img: {
//     width: 400,
//     height: 400,
//   },
// });
