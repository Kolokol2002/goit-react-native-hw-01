import { NavigationContainer } from "@react-navigation/native";
import RootNavigator from "./src/routes/RootNavigator";

const App = () => {
  return (
    <NavigationContainer>
      <RootNavigator />
    </NavigationContainer>
  );
};

export default App;
