import React from "react";
import { View, StyleSheet } from "react-native";
import { Feather } from "@expo/vector-icons";
import { AntDesign } from "@expo/vector-icons";
import { MaterialIcons } from "@expo/vector-icons";
import { Button } from "react-native";
import { TouchableOpacity } from "react-native";
import { Pressable } from "react-native";
import { PostsScreen } from "../Screens/PostsScreen";
import { ProfileScreen } from "../Screens/ProfileScreen";
import { CreatePostsScreen } from "../Screens/CreatePostsScreen";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import { PostsNavigator } from "./PostsNavigator";

const RootTabs = createBottomTabNavigator();

const RootTabBottomNavіgator = ({ navigation }) => {
  return (
    <RootTabs.Navigator
      screenOptions={({ route }) => ({
        tabBarIcon: () => {
          if (route.name === "ProfileScreen") {
            return <Feather name="user" size={25} color="black" />;
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
            return <AntDesign name="appstore-o" size={25} color="black" />;
          }
        },
        tabBarLabelStyle: { display: "none" },
        tabBarButton: (props) => <TouchableOpacity {...props} />,
        tabBarStyle: styles.tab,
      })}
    >
      <RootTabs.Screen
        name="PostsScreen"
        component={PostsNavigator}
        options={{
          title: "Публікації",
          headerShown: false,
          headerStyle: {
            // backgroundColor: "#FFFFFF",
          },
          // headerTintColor: "#fff",
          headerTitleStyle: {
            fontWeight: "bold",
            fontSize: 20,
          },
          headerTitleAlign: "center",
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
