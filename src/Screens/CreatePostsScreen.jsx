import React, { useCallback, useState } from "react";
import { Alert, Image } from "react-native";
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
import { ActivityIndicator } from "react-native";
import { writeDataToFirestore } from "../firebase/authFirebase";
import { useDispatch } from "react-redux";
import { setIsLoading, setUserInfo } from "../redux/authSlice";
import { Loader } from "../components/Loader";

export const CreatePostsScreen = () => {
  const [hasPermissionСamera, sethasPermissionСamera] = useState(false);
  const [hasPermissionLocation, setHasPermissionLocation] = useState(true);
  const [cameraRef, setCameraRef] = useState(null);
  const [imageUri, setImageUri] = useState(null);
  const [name, setName] = useState("");
  const [locationName, setLocationName] = useState("");

  const [loaderTakePhoto, setLoaderTakePhoto] = useState(false);

  const navigation = useNavigation();
  const isFocused = useIsFocused();
  const dispatch = useDispatch();

  useFocusEffect(
    useCallback(() => {
      (async () => {
        const camera = await Camera.requestCameraPermissionsAsync();
        const media = await MediaLibrary.requestPermissionsAsync();
        const location = await Location.requestForegroundPermissionsAsync();

        sethasPermissionСamera(camera.granted && media.granted);
        setHasPermissionLocation(location.granted);
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
    dispatch(setIsLoading(true));
    if (hasPermissionLocation) {
      // const { coords } = await Location.getCurrentPositionAsync();
      const data = {
        text: name,
        location_name: locationName,
        uri: imageUri.uri,
        geolocation: null,
      };
      await writeDataToFirestore(data);
      navigation.reset({
        index: 1,
        routes: [{ name: "Posts" }],
      });
    } else {
      Alert.alert(
        "App needs access to your location so we can have geolocation on post."
      );
    }
    dispatch(setIsLoading(false));
  };

  const onTakePhoto = async () => {
    if (hasPermissionСamera) {
      if (imageUri === null) {
        setLoaderTakePhoto(true);
        const { uri } = await cameraRef.takePictureAsync({
          quality: 1,
        });
        const asset = await MediaLibrary.createAssetAsync(uri);
        setImageUri(asset);
        setLoaderTakePhoto(false);
      } else {
        setImageUri(null);
      }
    } else {
      Alert.alert(
        "App needs access to your camera so you can take awesome pictures."
      );
    }
  };

  const onClearAll = () => {
    setImageUri(null);
    setName("");
    setLocationName("");
  };

  return (
    isFocused && (
      <View style={styles.container}>
        <View style={styles.boxImage}>
          <View
            style={[
              {
                backgroundColor:
                  !hasPermissionСamera && "rgba(232, 232, 232, 1)",
              },
              styles.imageContainer,
            ]}
          >
            {imageUri === null ? (
              <>
                {hasPermissionСamera && (
                  <Camera
                    style={styles.image}
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

            <TouchableOpacity
              style={[
                {
                  backgroundColor: hasPermissionСamera
                    ? "rgba(255, 255, 255, 0.3)"
                    : "rgba(255, 255, 255, 1)",
                },
                styles.containerIcon,
              ]}
              onPress={() => onTakePhoto()}
              disabled={loaderTakePhoto}
            >
              {!loaderTakePhoto ? (
                <FontAwesome
                  name="camera"
                  size={24}
                  color={
                    !hasPermissionСamera
                      ? "rgba(189, 189, 189, 1)"
                      : "rgba(255, 255, 255, 1)"
                  }
                  style={styles.icon}
                />
              ) : (
                <ActivityIndicator size="large" color="#FF6C00" />
              )}
            </TouchableOpacity>
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
              placeholder={"Місцевість..."}
              style={styles.inputLocation}
            />
          </KeyboardAvoidingView>
        </View>

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

        <View style={styles.buttonClearContainer}>
          <Pressable
            style={({ pressed }) => [
              {
                backgroundColor: pressed ? "#dfdfdf" : "rgba(246, 246, 246, 1)",
              },
              styles.buttonClear,
            ]}
            onPress={onClearAll}
          >
            <Feather name="trash-2" size={24} color="black" />
          </Pressable>
        </View>
        <Loader />
      </View>
    )
  );
};

const styles = StyleSheet.create({
  container: {
    backgroundColor: "#FFFFFF",
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
    height: "180%",
    minHeight: "100%",
    width: "100%",
    borderRadius: 8,
    marginBottom: 8,
  },
  containerIcon: {
    width: 60,
    height: 60,
    position: "absolute",
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
    alignItems: "center",
    justifyContent: "flex-end",
  },
  buttonClear: {
    height: 40,
    width: 70,
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
