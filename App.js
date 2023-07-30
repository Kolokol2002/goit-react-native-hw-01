import { RegistrationScreen } from "./src/Screens/RegistrationScreen";
import "react-native-gesture-handler";
import { PostsScreen } from "./src/Screens/PostsScreen";
import { LoginScreen } from "./src/Screens/LoginScreen";
import { NavigationContainer } from "@react-navigation/native";
import { createStackNavigator } from "@react-navigation/stack";
import Home from "./src/Screens/Home";
import MapScreen from "./src/Screens/MapScreen";
import CreatePostsScreen from "./src/Screens/CreatePostsScreen";
import CommentsScreen from "./src/Screens/CommentsScreen";
import ProfileScreen from "./src/Screens/ProfileScreen";

const MainStack = createStackNavigator();

const App = () => {
  return (
    <NavigationContainer>
      <MainStack.Navigator
        initialRouteName="LoginScreen"
        screenOptions={{
          headerShown: false,
        }}
      >
        <MainStack.Screen name="Home" component={Home} />
        <MainStack.Screen
          name="RegistrationScreen"
          component={RegistrationScreen}
        />
        <MainStack.Screen name="PostsScreen" component={PostsScreen} />
        <MainStack.Screen name="LoginScreen" component={LoginScreen} />
        <MainStack.Screen name="MapScreen" component={MapScreen} />
        <MainStack.Screen
          name="CreatePostsScreen"
          component={CreatePostsScreen}
        />
        <MainStack.Screen name="CommentsScreen" component={CommentsScreen} />
        <MainStack.Screen name="ProfileScreen" component={ProfileScreen} />
      </MainStack.Navigator>
    </NavigationContainer>
  );
};

export default App;
