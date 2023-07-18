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
import { globalStyled } from "./RegistrationScreen";

export const LoginScreen = () => {
  return (
    <ImageBackground source={backgroundImg}>
      <View style={globalStyled.container}>
        <View style={globalStyled.content}>
          <Text style={globalStyled.title}>Увійти</Text>
          <TextInput
            style={globalStyled.input}
            placeholder="Адреса електронної пошти"
          />
          <View style={globalStyled.password}>
            <TextInput style={globalStyled.input} placeholder="Пароль" />
            <Text style={globalStyled.view}>Показати</Text>
          </View>

          <Pressable style={globalStyled.button}>
            <Text>Увійти</Text>
          </Pressable>
          <Text style={globalStyled.login}>Немає акаунту? Зареєструватися</Text>
        </View>
      </View>
    </ImageBackground>
  );
};
