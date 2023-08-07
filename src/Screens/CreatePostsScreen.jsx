import React, { useCallback, useEffect, useState } from "react";
import { Image } from "react-native";
import { TextInput } from "react-native";
import { View, Text, StyleSheet } from "react-native";
import { Pressable } from "react-native";
import { FontAwesome } from "@expo/vector-icons";
import { EvilIcons } from "@expo/vector-icons";
import { KeyboardAvoidingView } from "react-native";
import { Camera } from "expo-camera";
import * as MediaLibrary from "expo-media-library";
import * as Location from "expo-location";
import { TouchableOpacity } from "react-native";
import { Feather } from "@expo/vector-icons";
import {
  useFocusEffect,
  useIsFocused,
  useNavigation,
} from "@react-navigation/native";

export const CreatePostsScreen = () => {
  const [hasPermission, setHasPermission] = useState(true);
  const [cameraRef, setCameraRef] = useState(null);
  const [imageUri, setImageUri] = useState(null);
  const [name, setName] = useState("");
  const [locationName, setLocationName] = useState("");

  const navigation = useNavigation();
  const isFocused = useIsFocused();

  useFocusEffect(
    useCallback(() => {
      (async () => {
        const camera = await Camera.requestCameraPermissionsAsync();
        const media = await MediaLibrary.requestPermissionsAsync();
        const location = await Location.requestForegroundPermissionsAsync();

        // setHasPermission(camera.granted && media.granted && location.granted);
      })();

      return () => {
        navigation.reset({
          index: 1,
          routes: [{ name: "Posts" }],
        });
      };
    }, [])
  );

  const onPublishPost = async () => {
    const { coords } = await Location.getCurrentPositionAsync();

    const data = {
      name,
      locationName,
      imageUri,
      coords,
    };

    console.log(data);

    navigation.reset({
      index: 1,
      routes: [{ name: "Posts" }],
    });
  };

  const onOpenCamera = async () => {
    if (hasPermission) {
      const { uri } = await cameraRef.takePictureAsync();
      const asset = await MediaLibrary.createAssetAsync(uri);
      setImageUri(asset);
    }
  };

  return (
    isFocused && (
      <View style={styles.container}>
        <View style={styles.boxImage}>
          <View
            style={[
              { backgroundColor: !hasPermission && "rgba(232, 232, 232, 1)" },
              styles.imageContainer,
            ]}
          >
            {imageUri === null ? (
              <>
                {hasPermission && (
                  <Camera
                    style={styles.image}
                    // type={type}
                    ref={(ref) => {
                      setCameraRef(ref);
                    }}
                    ratio="3:2"
                  />
                )}
              </>
            ) : (
              <Image source={{ uri: imageUri?.uri }} style={styles.mainImage} />
            )}

            {imageUri === null && (
              <TouchableOpacity
                style={[
                  {
                    backgroundColor: hasPermission
                      ? "rgba(255, 255, 255, 0.3)"
                      : "rgba(255, 255, 255, 1)",
                  },
                  styles.containerIcon,
                ]}
                // disabled={}
                onPress={() => onOpenCamera()}
              >
                <FontAwesome
                  name="camera"
                  size={24}
                  color={
                    !hasPermission
                      ? "rgba(189, 189, 189, 1)"
                      : "rgba(255, 255, 255, 1)"
                  }
                  // color="rgba(189, 189, 189, 1)"
                  style={styles.icon}
                />
              </TouchableOpacity>
            )}
          </View>

          {imageUri === null ? (
            <Text style={styles.text}>Завантажте фото</Text>
          ) : (
            <TouchableOpacity onPress={() => setImageUri(null)}>
              <Text style={styles.text}>Редагувати фото</Text>
            </TouchableOpacity>
          )}
        </View>
        <TextInput
          value={name}
          onChangeText={setName}
          style={styles.inputName}
          placeholder="Назва..."
        />
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
              value={locationName}
              onChangeText={setLocationName}
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
        {/* // Publish post */}
        <Pressable
          style={({ pressed }) => {
            return [
              {
                backgroundColor:
                  imageUri === null
                    ? "#e9b189"
                    : pressed
                    ? "#ff6a00d3"
                    : "#FF6C00",
              },
              styles.button,
            ];
          }}
          disabled={imageUri === null}
          onPress={onPublishPost}
        >
          <Text>Опублікувати</Text>
        </Pressable>
        {/* // Clear image */}
        <View style={styles.buttonClearContainer}>
          <Pressable
            style={({ pressed }) => [
              {
                backgroundColor: pressed ? "#dfdfdf" : "rgba(246, 246, 246, 1)",
              },
              styles.buttonClear,
            ]}
            // disabled={true}
            onPress={() => setImageUri(null)}
          >
            <Feather name="trash-2" size={24} color="black" />
          </Pressable>
        </View>
      </View>
    )
  );
};

const styles = StyleSheet.create({
  container: {
    backgroundColor: "#FFFFFF",
    // height: "100%",
    flex: 1,
    paddingHorizontal: 16,
    paddingVertical: 32,
  },
  boxImage: { marginBottom: 32 },
  imageContainer: {
    height: 267,
    overflow: "hidden",
    marginBottom: 8,
    alignItems: "center",
    justifyContent: "center",
  },

  image: {
    zIndex: 0,
    position: "absolute",
    top: -120,
    bottom: -120,
    right: 0,
    left: 0,
    // height: "100%",
    // backgroundColor: "rgba(232, 232, 232, 1)",
    borderRadius: 8,
    marginBottom: 8,
  },
  containerIcon: {
    width: 60,
    height: 60,
    position: "absolute",
    // top: 0,
    // left: 0,
    // bottom: 0,
    // right: 0,
    // backgroundColor: "rgba(255, 255, 255, 1)",
    borderRadius: 30,
    alignItems: "center",
    justifyContent: "center",
  },
  icon: {},
  text: { fontSize: 16, color: "rgba(189, 189, 189, 1)" },
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
    alignItems: "center",
    justifyContent: "center",
    borderRadius: 100,
  },
  buttonClearContainer: {
    flex: 1,
    // height: 40,
    // width: 70,
    // backgroundColor: "rgba(246, 246, 246, 1)",
    alignItems: "center",
    justifyContent: "flex-end",
    // borderRadius: 100,
  },
  buttonClear: {
    height: 40,
    width: 70,
    // backgroundColor: "rgba(246, 246, 246, 1)",
    alignItems: "center",
    justifyContent: "center",
    borderRadius: 100,
  },
  buttonText: {
    color: "rgba(255, 255, 255, 1)",
    fontWeight: 400,
    fontSize: 16,
  },
  mainImage: { height: "100%", width: "100%" },
});
