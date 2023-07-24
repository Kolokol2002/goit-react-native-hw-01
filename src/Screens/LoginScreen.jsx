import { Input } from "../components/Inputs";
import { ButtonLogin } from "../components/Buttons";
import { IsLogin } from "../components/IsLogin";
import { ContainnerRegLogin } from "../components/ContainnerRegLogin";
import { Alert } from "react-native";
import { useState } from "react";

export const LoginScreen = () => {
  const [name, setName] = useState("");
  const [password, setPassword] = useState("");

  const onSubmit = () => {
    Alert.alert("Credentials", `Login: ${name}\nPassword: ${password}`);
  };

  return (
    <ContainnerRegLogin title={"Увійти"}>
      <Input
        value={name}
        onChangeText={setName}
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
      <IsLogin text={"Немає акаунту? Зареєструватися"} />
    </ContainnerRegLogin>
  );
};
