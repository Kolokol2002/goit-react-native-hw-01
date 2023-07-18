import React from "react";
import {
  Image,
  ImageBackground,
  Pressable,
  StyleSheet,
  Text,
  TextInput,
  View,
} from "react-native";
import backgroundImg from "../assets/backgroundImg.jpg";
import addPhotoProfile from "../assets/addPhotoProfile.png";

export const RegistrationScreen = () => {
  return (
    <ImageBackground source={backgroundImg}>
      <View style={globalStyled.container}>
        <View style={globalStyled.content}>
          <View style={styles.photoBox}>
            <Image style={styles.addPhotoProfile} source={addPhotoProfile} />
          </View>
          <Text style={globalStyled.title}>Реєстрація</Text>

          <TextInput style={globalStyled.input} placeholder="Логін" />
          <TextInput
            style={globalStyled.input}
            placeholder="Адреса електронної пошти"
          />
          <View style={globalStyled.password}>
            <TextInput style={globalStyled.input} placeholder="Пароль" />
            <Text style={globalStyled.view}>Показати</Text>
          </View>

          <Pressable style={globalStyled.button}>
            <Text>Зареєстуватися</Text>
          </Pressable>
          <Text style={globalStyled.login}>Вже є акаунт? Увійти</Text>
        </View>
      </View>
    </ImageBackground>
  );
};

const styles = StyleSheet.create({
  photoBox: {
    position: "absolute",
    top: -60,
    alignSelf: "center",
    width: 120,
    height: 120,
    backgroundColor: "#F6F6F6",
    borderRadius: 16,
  },
  addPhotoProfile: {
    position: "absolute",
    bottom: 10,
    right: -12.5,
    width: 25,
    height: 25,
  },
});

export const globalStyled = StyleSheet.create({
  container: {
    height: "100%",
    display: "flex",
    justifyContent: "flex-end",
  },
  content: {
    backgroundColor: "#FFFFFF",
    borderTopLeftRadius: 25,
    borderTopRightRadius: 25,
    ...padding(0, 16),
  },
  title: {
    marginTop: 92,
    textAlign: "center",
    fontSize: 30,
    fontWeight: 500,
    lineHeight: 35,
    letterSpacing: 0.01,
    textAlign: "center",
  },
  input: {
    marginTop: 32,
    padding: 16,
    borderWidth: 1,
    borderColor: "#E8E8E8",
    backgroundColor: "#F6F6F6",
    borderRadius: 5,
  },
  password: {},
  view: {
    position: "absolute",
    bottom: 0,
    right: 0,
    marginRight: 22,
    marginBottom: 22,
  },
  button: {
    marginTop: 43,
    ...padding(16, 32),
    backgroundColor: "#FF6C00",
    display: "flex",
    alignItems: "center",
    borderRadius: 100,
  },
  login: {
    marginTop: 16,
    marginBottom: 78,
    textAlign: "center",
  },
});

export function padding(a, b, c, d) {
  return {
    paddingTop: a,
    paddingRight: b !== undefined ? b : a,
    paddingBottom: c !== undefined ? c : a,
    paddingLeft: d !== undefined ? d : b !== undefined ? b : a,
  };
}
