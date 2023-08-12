import "react-native-gesture-handler";
import { createStackNavigator } from "@react-navigation/stack";
import { RegistrationScreen } from "../Screens/RegistrationScreen";
import { LoginScreen } from "../Screens/LoginScreen";
import { HomeStack } from "./HomeNavigation";
import { useDispatch } from "react-redux";
import { auth } from "../../config";
import { useNavigation } from "@react-navigation/native";
import { onAuthStateChanged } from "firebase/auth";
import { setLogOut, setUserInfo } from "../redux/authSlice";

const Stack = createStackNavigator();

export const RootStack = () => {
  const navigation = useNavigation();
  const dispatch = useDispatch();

  onAuthStateChanged(auth, async (user) => {
    console.log("Loading");

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
    console.log("Cool");
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
