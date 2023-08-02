import "react-native-gesture-handler";
import { createStackNavigator } from "@react-navigation/stack";
import { RegistrationScreen } from "../Screens/RegistrationScreen";
import { LoginScreen } from "../Screens/LoginScreen";
import RootTabBottomNavіgator from "./RootTabBottomNavіgator";
import { CommentsScreen } from "../Screens/CommentsScreen";
import { MapScreen } from "../Screens/MapScreen";

const RootStack = createStackNavigator();

const RootNavigator = () => {
  return (
    <RootStack.Navigator
      initialRouteName="LoginScreen"
      screenOptions={{
        headerShown: false,
        headerTitleStyle: {
          fontWeight: "bold",
          fontSize: 20,
        },
        headerTitleAlign: "center",
      }}
    >
      <RootStack.Screen name="LoginScreen" component={LoginScreen} />
      <RootStack.Screen
        name="RegistrationScreen"
        component={RegistrationScreen}
      />
      <RootStack.Screen name="Home" component={RootTabBottomNavіgator} />
      <RootStack.Screen
        name="MapScreen"
        component={MapScreen}
        options={{
          title: "Карта",
          headerShown: true,
        }}
      />
      <RootStack.Screen
        name="CommentsScreen"
        component={CommentsScreen}
        options={{
          title: "Коментарі",
          headerShown: true,
        }}
      />
    </RootStack.Navigator>
  );
};

export default RootNavigator;
