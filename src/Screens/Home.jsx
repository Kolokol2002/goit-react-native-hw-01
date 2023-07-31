import React from "react";
import { View, StyleSheet } from "react-native";
import ProfileScreen from "./ProfileScreen";
import CreatePostsScreen from "./CreatePostsScreen";
import { PostsScreen } from "./PostsScreen";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import { Feather } from "@expo/vector-icons";
import { AntDesign } from "@expo/vector-icons";
import { MaterialIcons } from "@expo/vector-icons";
import { Button } from "react-native";
import { TouchableOpacity } from "react-native";
import { Pressable } from "react-native";

const Tabs = createBottomTabNavigator();

const Home = () => {
  return (
    <Tabs.Navigator
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
      <Tabs.Screen
        name="PostsScreen"
        component={PostsScreen}
        options={{
          title: "Публікації",
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
              onPress={() => alert("This is a button!")}
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
      <Tabs.Screen
        name="CreatePostsScreen"
        options={{
          title: "Створити публікацію",
        }}
        component={CreatePostsScreen}
      />
      <Tabs.Screen
        name="ProfileScreen"
        options={{
          headerShown: false,
        }}
        component={ProfileScreen}
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
  logoutIcon: {
    marginRight: 10,
  },
});

export default Home;
