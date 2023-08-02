import React from "react";
import { View, StyleSheet } from "react-native";
import { Feather } from "@expo/vector-icons";
import { AntDesign } from "@expo/vector-icons";

import { TouchableOpacity } from "react-native";
import { ProfileScreen } from "../Screens/ProfileScreen";
import { CreatePostsScreen } from "../Screens/CreatePostsScreen";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import { PostsStack } from "./RootNavigator";
import { Pressable } from "react-native";

const RootTabs = createBottomTabNavigator();

export const TabsNavigation = ({ navigation }) => {
  return (
    <RootTabs.Navigator
      initialRouteName="PostsTabs"
      backBehavior="firstRoute"
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
          } else if (route.name === "PostsTabs") {
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
        headerStyle: {},
        headerTitleStyle: {
          fontWeight: "bold",
          fontSize: 20,
        },
        headerTitleAlign: "center",
      })}
    >
      <RootTabs.Screen
        name="PostsTabs"
        component={PostsStack}
        options={{
          title: "Публікації",
          headerShown: false,
        }}
      />

      <RootTabs.Screen
        name="CreatePosts"
        options={{
          title: "Створити публікацію",
          headerTitleStyle: {
            fontWeight: "bold",
            fontSize: 20,
          },
          headerTitleAlign: "center",
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

      <RootTabs.Screen
        name="Profile"
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
  backIcon: {
    paddingLeft: 15,
  },
});
