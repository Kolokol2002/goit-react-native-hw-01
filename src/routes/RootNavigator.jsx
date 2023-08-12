import "react-native-gesture-handler";
import { createStackNavigator } from "@react-navigation/stack";
import { RegistrationScreen } from "../Screens/RegistrationScreen";
import { LoginScreen } from "../Screens/LoginScreen";
import { HomeStack } from "./HomeNavigation";
import { useDispatch } from "react-redux";
import { auth } from "../../config";
import { useNavigation } from "@react-navigation/native";
import { onAuthStateChanged } from "firebase/auth";
import { setIsLoading, setLogOut, setUserInfo } from "../redux/authSlice";
import { useEffect } from "react";

const Stack = createStackNavigator();

export const RootStack = () => {
  const navigation = useNavigation();
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(setIsLoading(true));
  }, []);

  onAuthStateChanged(auth, async (user) => {
    if (user) {
      const { displayName, email, photoURL } = auth.currentUser;
      dispatch(setUserInfo({ displayName, email, photoURL }));

      navigation.reset({
        index: 0,
        routes: [{ name: "Home" }],
      });
    } else {
      dispatch(setLogOut());
      navigation.reset({
        index: 0,
        routes: [{ name: "LoginScreen" }],
      });
    }
    dispatch(setIsLoading(false));
  });

  return (
    <Stack.Navigator
      initialRouteName="LoginScreen"
      screenOptions={{
        headerShown: false,
      }}
    >
      <Stack.Screen name="LoginScreen" component={LoginScreen} />
      <Stack.Screen name="RegistrationScreen" component={RegistrationScreen} />
      <Stack.Screen name="Home" component={HomeStack} />
    </Stack.Navigator>
  );
};
