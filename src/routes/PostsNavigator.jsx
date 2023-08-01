import "react-native-gesture-handler";
import { NavigationContainer } from "@react-navigation/native";
import { createStackNavigator } from "@react-navigation/stack";
import { RegistrationScreen } from "../Screens/RegistrationScreen";
import { LoginScreen } from "../Screens/LoginScreen";
import { PostsScreen } from "../Screens/PostsScreen";
import RootTabBottomNavіgator from "./RootTabBottomNavіgator";
import { CreatePostsScreen } from "../Screens/CreatePostsScreen";
import { ProfileScreen } from "../Screens/ProfileScreen";
import { CommentsScreen } from "../Screens/CommentsScreen";
import { MapScreen } from "../Screens/MapScreen";

const PostsStack = createStackNavigator();

export const PostsNavigator = () => {
  return (
    <PostsStack.Navigator
      initialRouteName="PostsScreen"
      screenOptions={{
        headerShown: true,
      }}
    >
      <PostsStack.Screen name="PostsScreen" component={PostsScreen} />
      <PostsStack.Screen name="MapScreen" component={MapScreen} />
      <PostsStack.Screen name="CommentsScreen" component={CommentsScreen} />
    </PostsStack.Navigator>
  );
};
