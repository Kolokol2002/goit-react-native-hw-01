import { Input } from "../components/Inputs";
import { ButtonLogin } from "../components/Buttons";
import { IsLogin } from "../components/IsLogin";
import { ContainnerRegLogin } from "../components/ContainnerRegLogin";
import { useState } from "react";
import { useNavigation } from "@react-navigation/native";
import { signInFirestore } from "../firebase/authFirebase";

export const LoginScreen = () => {
  const navigation = useNavigation();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const onSubmit = async () => {
    const data = {
      email,
      password,
    };
    signInFirestore(data);
  };

  return (
    <ContainnerRegLogin title={"Увійти"}>
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

      <ButtonLogin onPress={onSubmit} text={"Увійти"} />
      <IsLogin
        text={"Немає акаунту? Зареєструватися"}
        onPress={() => navigation.navigate("RegistrationScreen")}
      />
    </ContainnerRegLogin>
  );
};
