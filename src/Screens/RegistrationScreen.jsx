import { Input } from "../components/Inputs";
import { ButtonLogin } from "../components/Buttons";
import { PhotoBox } from "../components/PhotoBox";
import { IsLogin } from "../components/IsLogin";
import { ContainnerRegLogin } from "../components/ContainnerRegLogin";
import { useState } from "react";
import { Alert } from "react-native";

export const RegistrationScreen = () => {
  const [name, setName] = useState("");
  const [mail, setMail] = useState("");
  const [password, setPassword] = useState("");

  const onSubmit = () => {
    Alert.alert(
      "Credentials",
      `Login: ${name}\nMail: ${mail}\nPassword: ${password}`
    );
  };

  return (
    <ContainnerRegLogin title={"Реєстрація"}>
      <PhotoBox />
      <Input value={name} onChangeText={setName} placeholder={"Логін"} />
      <Input
        value={mail}
        onChangeText={setMail}
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
      <IsLogin text={"Вже є акаунт? Увійти"} />
    </ContainnerRegLogin>
  );
};
