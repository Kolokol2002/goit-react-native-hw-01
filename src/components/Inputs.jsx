import { useState } from "react";
import {
  StyleSheet,
  TextInput,
  Text,
  View,
  Pressable,
  KeyboardAvoidingView,
  Platform,
} from "react-native";

export const Input = ({ typeInput, placeholder, value, onChangeText }) => {
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
          <KeyboardAvoidingView
            behavior={Platform.OS == "ios" ? "padding" : "height"}
          >
            <TextInput
              onBlur={onBlur}
              onFocus={onFocus}
              value={value}
              onChangeText={onChangeText}
              secureTextEntry={togglePassword}
              placeholder={placeholder}
              autoCapitalize={"none"}
              style={[
                { backgroundColor: backgroundColor, borderColor: borderColor },
                styles.input,
              ]}
            />
          </KeyboardAvoidingView>
          <Pressable style={styles.view} onPress={onTogglePassword}>
            <Text>Показати</Text>
          </Pressable>
        </View>
      );
    default:
      return (
        <KeyboardAvoidingView
          behavior={Platform.OS == "ios" ? "padding" : "height"}
        >
          <TextInput
            onBlur={onBlur}
            onFocus={onFocus}
            value={value}
            onChangeText={onChangeText}
            inputMode={typeInput}
            autoCapitalize={typeInput === "email" ? "none" : "words"}
            style={[
              { backgroundColor: backgroundColor, borderColor: borderColor },
              styles.input,
            ]}
            placeholder={placeholder}
          />
        </KeyboardAvoidingView>
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
