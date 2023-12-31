import { Input } from "../components/Inputs";
import { ButtonLogin } from "../components/Buttons";
import { PhotoBox } from "../components/PhotoBox";
import { IsLogin } from "../components/IsLogin";
import { ContainnerRegLogin } from "../components/ContainnerRegLogin";
import { useState } from "react";
import { useNavigation } from "@react-navigation/native";
import { createUserFirestore } from "../firebase/authFirebase";
import * as ImagePicker from "expo-image-picker";
import { Loader } from "../components/Loader";
import { Alert } from "react-native";
import { useDispatch } from "react-redux";
import { setIsLoading } from "../redux/authSlice";

export const RegistrationScreen = () => {
  const navigation = useNavigation();

  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [avatar, setAvatar] = useState("");
  const dispatch = useDispatch();

  const onSubmit = async () => {
    try {
      dispatch(setIsLoading(true));
      const data = {
        name: name,
        email: email,
        password: password,
        profile_picture: avatar,
      };

      if (name === "") {
        Alert.alert("Ви не вказали ім'я!!!");
        dispatch(setIsLoading(false));
        return;
      }
      const isError = await createUserFirestore(data);

      switch (isError) {
        case "auth/weak-password":
          Alert.alert("Пароль повинен бути не менше 6 символів!!!");
          break;
        case "auth/missing-email":
          Alert.alert("Ви не вказали емайл!!!");
          break;
        case "auth/missing-password":
          Alert.alert("Ви не вказали пароль!!!");
          break;
        case "auth/email-already-in-use":
          Alert.alert(`Емайл ${email} вже існує!!!`);
          break;
        case "auth/invalid-email":
          Alert.alert("Не вірний формат емайлу. Приклад - user@gmai.com.");
          break;

        default:
          break;
      }
      dispatch(setIsLoading(false));
    } catch (error) {
      console.log(error);
    }
  };

  const onPickAvatar = async () => {
    try {
      let result = await ImagePicker.launchImageLibraryAsync({
        mediaTypes: ImagePicker.MediaTypeOptions.All,
        allowsEditing: true,
        aspect: [4, 3],
        quality: 1,
      });

      if (!result.canceled) {
        setAvatar(result.assets[0].uri);
      } else {
        setAvatar("");
      }
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <>
      <ContainnerRegLogin title={"Реєстрація"}>
        <PhotoBox avatar={avatar} onPickAvatar={onPickAvatar} />
        <Input value={name} onChangeText={setName} placeholder={"Логін"} />
        <Input
          value={email}
          onChangeText={setEmail}
          typeInput={"email"}
          placeholder={"Адреса електронної пошти"}
        />
        <Input
          value={password}
          onChangeText={setPassword}
          typeInput={"password"}
          placeholder={"Пароль"}
        />
        <ButtonLogin onPress={onSubmit} text={"Зареєстуватися"} />
        <IsLogin
          text={"Вже є акаунт? Увійти"}
          onPress={() => navigation.navigate("LoginScreen")}
        />
      </ContainnerRegLogin>
      <Loader />
    </>
  );
};
