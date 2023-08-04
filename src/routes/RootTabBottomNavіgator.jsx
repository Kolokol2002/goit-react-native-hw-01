import React from "react";
import { View, StyleSheet } from "react-native";
import { Feather } from "@expo/vector-icons";
import { AntDesign } from "@expo/vector-icons";

import { TouchableOpacity } from "react-native";
import { ProfileScreen } from "../Screens/ProfileScreen";
import { CreatePostsScreen } from "../Screens/CreatePostsScreen";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";

import { Pressable } from "react-native";
import { useNavigation } from "@react-navigation/native";
import { PostsScreen } from "../Screens/PostsScreen";
import { MaterialIcons } from "@expo/vector-icons";

const Tabs = createBottomTabNavigator();

export const TabsNavigation = () => {
  const navigation = useNavigation();

  return (
    <Tabs.Navigator
      initialRouteName="Posts"
      screenOptions={({ route }) => ({
        tabBarIcon: ({ focused }) => {
          if (route.name === "Profile") {
            return (
              <Feather
                name="user"
                size={25}
                color={
                  focused ? "rgba(255, 108, 0, 1)" : "rgba(33, 33, 33, 0.8)"
                }
              />
            );
          } else if (route.name === "CreatePosts") {
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
          } else if (route.name === "Posts") {
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
        headerStyle: {
          borderBottomColor: "rgba(0, 0, 0, 0.3)",
          borderBottomWidth: 0.5,
          // shadowColor: "none",
          // shadowOpacity: 0,
          shadowOffset: {
            width: 30,
            height: 10,
          },
          // shadowColor: "black",
          shadowOpacity: 0,
          // shadowRadius: 3.84,
          elevation: 0,
        },
        // headerShadowVisible: false,
        headerTitleStyle: {
          fontWeight: "bold",
          fontSize: 20,
        },
        headerTitleAlign: "center",
      })}
    >
      <Tabs.Screen
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
          // headerShown: false,
        }}
      />

      <Tabs.Screen
        name="CreatePosts"
        options={{
          title: "Створити публікацію",
          tabBarStyle: { display: "none" },
          headerLeft: () => (
            <Pressable onPress={() => navigation.goBack()}>
              <AntDesign
                style={styles.backIcon}
                name="arrowleft"
                size={24}
                color="black"
              />
            </Pressable>
          ),
        }}
        component={CreatePostsScreen}
      />

      <Tabs.Screen
        name="Profile"
        component={ProfileScreen}
        options={{
          headerShown: false,
        }}
      />
    </Tabs.Navigator>
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
  backIcon: {
    paddingLeft: 15,
  },
  logoutIcon: {
    marginRight: 10,
  },
});
