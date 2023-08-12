import { Input } from "../components/Inputs";
import { ButtonLogin } from "../components/Buttons";
import { PhotoBox } from "../components/PhotoBox";
import { IsLogin } from "../components/IsLogin";
import { ContainnerRegLogin } from "../components/ContainnerRegLogin";
import { useState } from "react";
import { useNavigation } from "@react-navigation/native";
import { createUserFirestore } from "../firebase/authFirebase";
import * as ImagePicker from "expo-image-picker";
import { Alert } from "react-native";

export const RegistrationScreen = () => {
  const navigation = useNavigation();

  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const onSubmit = async () => {
    const data = {
      name: name,
      email: email,
      password: password,
      profile_picture: avatar,
    };
    createUserFirestore(data);
  };

  const onPickAvatar = async () => {
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
  };

  return (
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
  );
};
