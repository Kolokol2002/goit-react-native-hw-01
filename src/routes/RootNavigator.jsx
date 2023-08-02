import "react-native-gesture-handler";
import { createStackNavigator } from "@react-navigation/stack";
import { RegistrationScreen } from "../Screens/RegistrationScreen";
import { LoginScreen } from "../Screens/LoginScreen";
import { TabsNavigation } from "./RootTabBottomNavіgator";
import { CommentsScreen } from "../Screens/CommentsScreen";
import { MapScreen } from "../Screens/MapScreen";
import { PostsScreen } from "../Screens/PostsScreen";
import { Pressable } from "react-native";
import { StyleSheet } from "react-native";
import { MaterialIcons } from "@expo/vector-icons";

const Stack = createStackNavigator();

export const RootStack = () => {
  return (
    <Stack.Navigator
      initialRouteName="LoginScreen"
      screenOptions={{
        headerShown: false,
        headerTitleStyle: {
          fontWeight: "bold",
          fontSize: 20,
        },
        headerTitleAlign: "center",
      }}
    >
      <Stack.Screen name="LoginScreen" component={LoginScreen} />
      <Stack.Screen name="RegistrationScreen" component={RegistrationScreen} />
      <Stack.Screen name="Tabs" component={TabsNavigation} />
    </Stack.Navigator>
  );
};

export const PostsStack = ({ navigation }) => {
  return (
    <Stack.Navigator
      initialRouteName="Posts"
      screenOptions={{
        headerTitleStyle: {
          fontWeight: "bold",
          fontSize: 20,
        },
        headerTitleAlign: "center",
      }}
    >
      <Stack.Screen
        name="Posts"
        component={PostsScreen}
        options={{
          title: "Публікації",
          headerRight: () => (
            <Pressable onPress={() => navigation.navigate("LoginScreen")}>
              <MaterialIcons
                style={styles.logoutIcon}
                name="logout"
                size={24}
                color="#BDBDBD"
              />
            </Pressable>
          ),
        }}
      />
      <Stack.Screen
        name="Comments"
        component={CommentsScreen}
        options={{
          title: "Коментарі",
        }}
      />
      <Stack.Screen name="Map" component={MapScreen} />
    </Stack.Navigator>
  );
};

const styles = StyleSheet.create({
  logoutIcon: {
    marginRight: 10,
  },
});
