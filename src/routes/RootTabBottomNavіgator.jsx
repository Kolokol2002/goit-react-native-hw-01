import React from "react";
import { View, StyleSheet } from "react-native";
import { Feather } from "@expo/vector-icons";
import { AntDesign } from "@expo/vector-icons";
import { MaterialIcons } from "@expo/vector-icons";
import { TouchableOpacity } from "react-native";
import { Pressable } from "react-native";
import { PostsScreen } from "../Screens/PostsScreen";
import { ProfileScreen } from "../Screens/ProfileScreen";
import { CreatePostsScreen } from "../Screens/CreatePostsScreen";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";

const RootTabs = createBottomTabNavigator();

const RootTabBottomNavіgator = ({ navigation }) => {
  return (
    <RootTabs.Navigator
      initialRouteName="PostsScreen"
      backBehavior="firstRoute"
      screenOptions={({ route }) => ({
        tabBarIcon: ({ focused }) => {
          if (route.name === "ProfileScreen") {
            return (
              <Feather
                name="user"
                size={25}
                color={
                  focused ? "rgba(255, 108, 0, 1)" : "rgba(33, 33, 33, 0.8)"
                }
              />
            );
          } else if (route.name === "CreatePostsScreen") {
            return (
              <View style={styles.createIconContainer}>
                <Feather
                  style={styles.createIcon}
                  name="plus"
                  size={20}
                  color="black"
                />
              </View>
            );
          } else if (route.name === "PostsScreen") {
            return (
              <AntDesign
                name="appstore-o"
                size={25}
                color={
                  focused ? "rgba(255, 108, 0, 1)" : "rgba(33, 33, 33, 0.8)"
                }
              />
            );
          }
        },
        tabBarLabelStyle: { display: "none" },
        tabBarButton: (props) => <TouchableOpacity {...props} />,
        tabBarStyle: styles.tab,
        headerShown: true,
        headerStyle: {
          // backgroundColor: "#FFFFFF",
        },
        // headerTintColor: "#fff",
        headerTitleStyle: {
          fontWeight: "bold",
          fontSize: 20,
        },
        headerTitleAlign: "center",
      })}
    >
      <RootTabs.Screen
        name="PostsScreen"
        component={PostsScreen}
        options={{
          title: "Публікації",
          // headerShown: true,
          headerRight: () => (
            <Pressable
              onPress={() => navigation.navigate("LoginScreen")}
              // color="#fff"
            >
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
      <RootTabs.Screen
        name="CreatePostsScreen"
        options={{
          title: "Створити публікацію",
          headerTitleStyle: {
            fontWeight: "bold",
            fontSize: 20,
          },
          headerTitleAlign: "center",
          tabBarStyle: { display: "none" },
        }}
        component={CreatePostsScreen}
      />
      <RootTabs.Screen
        name="ProfileScreen"
        component={ProfileScreen}
        options={{
          headerShown: false,
        }}
      />
    </RootTabs.Navigator>
  );
};

const styles = StyleSheet.create({
  createIconContainer: {
    backgroundColor: "#FF6C00",
    borderRadius: 20,
    height: 40,
    width: 70,
    justifyContent: "center",
    alignItems: "center",
  },
  tab: {
    height: 60,
  },
  logoutIcon: {
    marginRight: 10,
  },
});

export default RootTabBottomNavіgator;
