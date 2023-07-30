import { Input } from "../components/Inputs";
import { ButtonLogin } from "../components/Buttons";
import { IsLogin } from "../components/IsLogin";
import { ContainnerRegLogin } from "../components/ContainnerRegLogin";
import { useState } from "react";

export const LoginScreen = ({ navigation }) => {
  const [name, setName] = useState("");
  const [password, setPassword] = useState("");

  const onSubmit = () => {
    navigation.navigate("Home");
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
      <IsLogin
        text={"Немає акаунту? Зареєструватися"}
        onPress={() => navigation.navigate("RegistrationScreen")}
      />
    </ContainnerRegLogin>
  );
};
