import { useState } from "react";
import {
  StyleSheet,
  TextInput,
  Text,
  View,
  Pressable,
  Alert,
} from "react-native";

export const Input = ({ typeInput, placeholder }) => {
  const [borderColor, setBorderColor] = useState("#E8E8E8");
  const [backgroundColor, setBackgroundColor] = useState("#F6F6F6");
  const [togglePassword, setTogglePassword] = useState(true);

  const onBlur = () => {
    setBackgroundColor("#F6F6F6");
    setBorderColor("#E8E8E8");
  };
  const onFocus = () => {
    setBackgroundColor("#ffffff");
    setBorderColor("#0c0101");
  };
  const onTogglePassword = () => {
    setTogglePassword(togglePassword ? false : true);
  };

  switch (typeInput) {
    case "password":
      return (
        <View style={InputPasswordStyled.inputPassword}>
          <TextInput
            onBlur={onBlur}
            onFocus={onFocus}
            secureTextEntry={togglePassword}
            placeholder={placeholder}
            style={[
              { backgroundColor: backgroundColor, borderColor: borderColor },
              InputStyled.input,
            ]}
          />
          <Pressable
            style={InputPasswordStyled.view}
            onPress={onTogglePassword}
          >
            <Text>Показати</Text>
          </Pressable>
        </View>
      );
    default:
      return (
        <TextInput
          onBlur={onBlur}
          onFocus={onFocus}
          inputMode={typeInput}
          style={[
            { backgroundColor: backgroundColor, borderColor: borderColor },
            InputStyled.input,
          ]}
          placeholder={placeholder}
        />
      );
  }
};

const InputPasswordStyled = StyleSheet.create({
  inputPassword: {},
  view: {
    position: "absolute",
    bottom: 0,
    right: 0,
    marginRight: 22,
    marginBottom: 22,
  },
});

const InputStyled = StyleSheet.create({
  input: {
    marginTop: 16,
    padding: 16,
    borderWidth: 1,
    borderRadius: 5,
  },
});
