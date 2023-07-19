import { ImageBackground, StyleSheet, Text, View } from "react-native";
import backgroundImg from "../image/backgroundImg.jpg";

export const ContainnerRegLogin = ({ title, children }) => {
  return (
    <ImageBackground source={backgroundImg}>
      <View style={ContainerStyled.container}>
        <View style={ContainerStyled.content}>
          <Text style={ContainerStyled.title}>{title}</Text>
          {children}
        </View>
      </View>
    </ImageBackground>
  );
};

export const ContainerStyled = StyleSheet.create({
  container: {
    height: "100%",
    justifyContent: "flex-end",
  },
  content: {
    backgroundColor: "#FFFFFF",
    borderTopLeftRadius: 25,
    borderTopRightRadius: 25,
    paddingHorizontal: 16,
  },
  title: {
    marginTop: 92,
    textAlign: "center",
    fontSize: 30,
    fontWeight: 500,
    lineHeight: 35,
    letterSpacing: 0.01,
    textAlign: "center",
  },
});
