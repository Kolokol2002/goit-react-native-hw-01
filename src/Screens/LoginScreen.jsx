import { Input } from "../components/Inputs";
import { ButtonLogin } from "../components/Buttons";
import { IsLogin } from "../components/IsLogin";
import { ContainnerRegLogin } from "../components/ContainnerRegLogin";
import { useState } from "react";
import { useNavigation } from "@react-navigation/native";

export const LoginScreen = () => {
  const navigation = useNavigation();
  const [name, setName] = useState("");
  const [password, setPassword] = useState("");

  const onSubmit = () => {
    navigation.navigate("Home");
    navigation.reset({
      index: 1,
      routes: [{ name: "Home" }],
    });
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
