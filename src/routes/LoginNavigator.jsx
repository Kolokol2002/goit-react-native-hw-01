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

const LoginStack = createStackNavigator();

export const LoginNavigator = () => {
  return (
    <LoginStack.Navigator
      initialRouteName="LoginScreen"
      screenOptions={{
        headerShown: false,
      }}
    >
      <LoginStack.Screen name="LoginScreen" component={LoginScreen} />
      <LoginStack.Screen
        name="RegistrationScreen"
        component={RegistrationScreen}
      />
      <LoginStack.Screen name="Home" component={RootTabBottomNavіgator} />
      {/* <LoginStack.Screen name="PostsScreen" component={PostsScreen} />
      <LoginStack.Screen name="MapScreen" component={MapScreen} />
      <LoginStack.Screen
        name="CreatePostsScreen"
        component={CreatePostsScreen}
      />
      <LoginStack.Screen name="CommentsScreen" component={CommentsScreen} />
      <LoginStack.Screen name="ProfileScreen" component={ProfileScreen} /> */}
    </LoginStack.Navigator>
  );
};
