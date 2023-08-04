import { CommentsScreen } from "../Screens/CommentsScreen";
import { createStackNavigator } from "@react-navigation/stack";
import { MapScreen } from "../Screens/MapScreen";
import { TabsNavigation } from "./RootTabBottomNavіgator";

const Stack = createStackNavigator();

export const HomeStack = () => {
  return (
    <Stack.Navigator
      initialRouteName="Tabs"
      screenOptions={{
        headerTitleStyle: {
          fontWeight: "bold",
          fontSize: 20,
        },
        headerTitleAlign: "center",
      }}
    >
      <Stack.Screen
        name="Tabs"
        component={TabsNavigation}
        options={{
          headerShown: false,
        }}
      />
      <Stack.Screen
        name="Comments"
        component={CommentsScreen}
        backBehavior="order"
        options={{
          title: "Коментарі",
        }}
      />
      <Stack.Screen name="Map" component={MapScreen} />
    </Stack.Navigator>
  );
};
