import { Input } from "../components/Inputs";
import { ButtonLogin } from "../components/Buttons";
import { IsLogin } from "../components/IsLogin";
import { ContainnerRegLogin } from "../components/ContainnerRegLogin";

export const LoginScreen = () => {
  return (
    <ContainnerRegLogin title={"Увійти"}>
      <Input typeInput={"email"} placeholder={"Адреса електронної пошти"} />
      <Input typeInput={"password"} placeholder={"Пароль"} />

      <ButtonLogin text={"Увійти"} />
      <IsLogin text={"Немає акаунту? Зареєструватися"} />
    </ContainnerRegLogin>
  );
};
