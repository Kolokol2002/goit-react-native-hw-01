import "react-native-gesture-handler";
import { createStackNavigator } from "@react-navigation/stack";
import { RegistrationScreen } from "../Screens/RegistrationScreen";
import { LoginScreen } from "../Screens/LoginScreen";
import { HomeStack } from "./HomeNavigation";
import { useDispatch } from "react-redux";
import { auth } from "../../config";
import { onAuthStateChanged } from "firebase/auth";
import { setIsLoading, setLogOut, setUserInfo } from "../redux/authSlice";
import { useEffect, useState } from "react";

const Stack = createStackNavigator();

export const RootStack = () => {
  const dispatch = useDispatch();
  const [isLoginIn, setIsLoginIn] = useState(false);

  useEffect(() => {
    dispatch(setIsLoading(true));
  }, []);

  onAuthStateChanged(auth, (user) => {
    if (user) {
      const { displayName, email, photoURL } = auth.currentUser;
      dispatch(setUserInfo({ displayName, email, photoURL }));
      setIsLoginIn(true);
    } else {
      setIsLoginIn(false);
      dispatch(setLogOut());
    }
    dispatch(setIsLoading(false));
  });

  return (
    <Stack.Navigator
      // initialRouteName="LoginScreen"
      screenOptions={{
        headerShown: false,
      }}
    >
      {!isLoginIn ? (
        <Stack.Group>
          <Stack.Screen name="LoginScreen" component={LoginScreen} />
          <Stack.Screen
            name="RegistrationScreen"
            component={RegistrationScreen}
          />
        </Stack.Group>
      ) : (
        <Stack.Screen name="Home" component={HomeStack} />
      )}
    </Stack.Navigator>
  );
};
