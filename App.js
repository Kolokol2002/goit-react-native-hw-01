import { DefaultTheme, NavigationContainer } from "@react-navigation/native";
import { RootStack } from "./src/routes/RootNavigator";
import { Provider } from "react-redux";
import { PersistGate } from "redux-persist/integration/react";
import { persistor, store } from "./src/redux/store";

const App = () => {
  return (
    <NavigationContainer theme={DefaultTheme}>
      <Provider store={store}>
        {/* <PersistGate loading={null} persistor={persistor}> */}
        <RootStack />
        {/* </PersistGate> */}
      </Provider>
    </NavigationContainer>
  );
};
export default App;
