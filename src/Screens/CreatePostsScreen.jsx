import React, { useEffect, useState } from "react";
import { Button } from "react-native";
import { TextInput } from "react-native";
import { View, Text, StyleSheet } from "react-native";
import { ButtonLogin } from "../components/Buttons";
import { Pressable } from "react-native";
import { FontAwesome } from "@expo/vector-icons";
import { EvilIcons } from "@expo/vector-icons";
import { KeyboardAvoidingView } from "react-native";
import { Camera } from "expo-camera";
import * as MediaLibrary from "expo-media-library";
import { TouchableOpacity } from "react-native";

export const CreatePostsScreen = ({ navigation }) => {
  const [hasPermission, setHasPermission] = useState(null);
  const [cameraRef, setCameraRef] = useState(null);
  const [type, setType] = useState(Camera.Constants.Type.back);
  const [camera, setCamera] = useState(null);

  useEffect(() => {
    (async () => {
      const { status } = await Camera.requestCameraPermissionsAsync();
      await MediaLibrary.requestPermissionsAsync();

      // const test = await camera.getSupportedRatiosAsync();
      // console.log(test);

      setHasPermission(status === "granted");
    })();
  }, []);
  const onPress = () => {
    navigation.navigate("PostsScreen");
  };

  const onOpenCamera = () => {
    // navigation.navigate("PostsScreen");
    setType(
      type === Camera.Constants.Type.back
        ? Camera.Constants.Type.front
        : Camera.Constants.Type.back
    );
  };
  return (
    <View style={styles.container}>
      <TouchableOpacity style={styles.boxImage} onPress={() => onOpenCamera()}>
        <View style={styles.imageContainer}>
          <Camera
            style={styles.image}
            type={type}
            ref={(ref) => {
              setCamera(ref);
            }}
            ratio="3:2"
          >
            <View style={styles.containerIcon}>
              <FontAwesome
                name="camera"
                size={24}
                color="rgba(189, 189, 189, 1)"
                style={styles.icon}
              />
            </View>
          </Camera>
        </View>
        <Text style={styles.text}>Завантажте фото</Text>
      </TouchableOpacity>

      <TextInput style={styles.inputName} placeholder="Назва..." />

      {/* <TextInput style={styles.inputLocation} placeholder="Місцевість..." /> */}
      <View style={styles.inputLocationContainer}>
        <EvilIcons
          style={styles.inputLocationIcon}
          name="location"
          size={24}
          color="rgba(189, 189, 189, 1)"
        />
        <KeyboardAvoidingView
          behavior={Platform.OS == "ios" ? "padding" : "height"}
          style={styles.inputLocationView}
        >
          <TextInput
            // onBlur={onBlur}
            // onFocus={onFocus}
            // value={value}
            // onChangeText={onChangeText}
            // secureTextEntry={togglePassword}
            placeholder={"Місцевість..."}
            style={styles.inputLocation}
          />
        </KeyboardAvoidingView>
      </View>
      <Pressable
        style={({ pressed }) => [
          {
            backgroundColor: pressed ? "#ff6a00d3" : "#FF6C00",
          },
          styles.button,
        ]}
        onPress={onPress}
      >
        <Text>Опублікувати</Text>
      </Pressable>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    backgroundColor: "#FFFFFF",
    height: "100%",
    paddingHorizontal: 16,
    paddingVertical: 32,
  },
  boxImage: { marginBottom: 32 },
  imageContainer: { height: 267, overflow: "hidden" },

  image: {
    zIndex: 1,
    position: "absolute",
    top: -120,
    bottom: -120,
    right: 0,
    left: 0,
    // backgroundColor: "rgba(232, 232, 232, 1)",
    borderRadius: 8,
    marginBottom: 8,
    alignItems: "center",
    justifyContent: "center",
  },
  containerIcon: {
    width: 60,
    height: 60,
    backgroundColor: "rgba(255, 255, 255, 1)",
    borderRadius: 30,
    alignItems: "center",
    justifyContent: "center",
  },
  icon: {},
  text: {},
  inputName: {
    height: 50,
    borderBottomWidth: 1,
    borderBottomColor: "rgba(232, 232, 232, 1)",
    marginBottom: 16,
  },
  inputLocationContainer: {
    marginBottom: 32,
  },

  inputLocation: {
    height: 50,
    borderBottomWidth: 1,
    borderBottomColor: "rgba(232, 232, 232, 1)",
    paddingLeft: 20,
  },
  inputLocationIcon: {
    position: "absolute",
    bottom: 0,
    left: -5,
    marginBottom: 15,
  },
  inputLocationView: { width: "100%" },
  button: {
    height: 51,
    backgroundColor: "rgba(255, 108, 0, 1)",
    alignItems: "center",
    justifyContent: "center",
    borderRadius: 100,
  },
  buttonText: {
    color: "rgba(255, 255, 255, 1)",
    fontWeight: 400,
    fontSize: 16,
  },
});
