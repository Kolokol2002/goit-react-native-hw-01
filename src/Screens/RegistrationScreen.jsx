import { Input } from "../components/Inputs";
import { ButtonLogin } from "../components/Buttons";
import { PhotoBox } from "../components/PhotoBox";
import { IsLogin } from "../components/IsLogin";
import { ContainnerRegLogin } from "../components/ContainnerRegLogin";

export const RegistrationScreen = () => {
  return (
    <ContainnerRegLogin title={"Реєстрація"}>
      <PhotoBox />
      <Input placeholder={"Логін"} />
      <Input typeInput={"email"} placeholder={"Адреса електронної пошти"} />
      <Input typeInput={"password"} placeholder={"Пароль"} />
      <ButtonLogin text={"Зареєстуватися"} />
      <IsLogin text={"Вже є акаунт?"} linkText={"Увійти"} />
    </ContainnerRegLogin>
  );
};
