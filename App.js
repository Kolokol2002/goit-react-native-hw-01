import { NavigationContainer } from "@react-navigation/native";
import RootNavigator from "./src/routes/RootNavigator";
import { LoginNavigator } from "./src/routes/LoginNavigator";

const App = () => {
  return (
    <NavigationContainer>
      <LoginNavigator />
    </NavigationContainer>
  );
};

export default App;
