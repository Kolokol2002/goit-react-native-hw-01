import { Input } from "../components/Inputs";
import { ButtonLogin } from "../components/Buttons";
import { IsLogin } from "../components/IsLogin";
import { ContainnerRegLogin } from "../components/ContainnerRegLogin";
import { useState } from "react";
import { useNavigation } from "@react-navigation/native";
import { signInFirestore } from "../firebase/authFirebase";
import { Loader } from "../components/Loader";
import { useDispatch } from "react-redux";
import { setIsLoading } from "../redux/authSlice";
import { Alert } from "react-native";

export const LoginScreen = () => {
  const navigation = useNavigation();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const dispatch = useDispatch();

  const onSubmit = async () => {
    try {
      dispatch(setIsLoading(true));
      const data = {
        email,
        password,
      };
      const isError = await signInFirestore(data);
      switch (isError) {
        case "auth/wrong-password":
          Alert.alert("Пароль не вірний!!!");
          break;
        case "auth/missing-email":
          Alert.alert("Ви не вказали емайл!!!");
          break;
        case "auth/missing-password":
          Alert.alert("Ви не вказали пароль!!!");
          break;
        case "auth/user-not-found":
          Alert.alert(`Користувач ${email} не існує!!!`);
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

  return (
    <>
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
      <Loader />
    </>
  );
};
