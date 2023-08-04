import { DefaultTheme, NavigationContainer } from "@react-navigation/native";
import { RootStack } from "./src/routes/RootNavigator";
import { Appearance } from "react-native";

// const theme = Appearance.setColorScheme("ligth");

const App = () => {
  return (
    <NavigationContainer theme={DefaultTheme}>
      <RootStack />
    </NavigationContainer>
  );
};

export default App;
