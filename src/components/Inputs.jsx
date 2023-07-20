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
    setBackgroundColor("#FFFFFF");
    setBorderColor("#FF6C00");
  };
  const onTogglePassword = () => {
    setTogglePassword(togglePassword ? false : true);
  };

  switch (typeInput) {
    case "password":
      return (
        <View style={styles.inputPassword}>
          <TextInput
            onBlur={onBlur}
            onFocus={onFocus}
            secureTextEntry={togglePassword}
            placeholder={placeholder}
            style={[
              { backgroundColor: backgroundColor, borderColor: borderColor },
              styles.input,
            ]}
          />
          <Pressable style={styles.view} onPress={onTogglePassword}>
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
            styles.input,
          ]}
          placeholder={placeholder}
        />
      );
  }
};

const styles = StyleSheet.create({
  inputPassword: {},
  view: {
    position: "absolute",
    bottom: 0,
    right: 0,
    marginRight: 22,
    marginBottom: 22,
  },
  input: {
    marginTop: 16,
    padding: 16,
    borderWidth: 1,
    borderRadius: 5,
  },
});
