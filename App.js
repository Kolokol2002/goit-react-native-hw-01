import { NavigationContainer } from "@react-navigation/native";
import { RootStack } from "./src/routes/RootNavigator";

const App = () => {
  return (
    <NavigationContainer>
      <RootStack />
    </NavigationContainer>
  );
};

export default App;
