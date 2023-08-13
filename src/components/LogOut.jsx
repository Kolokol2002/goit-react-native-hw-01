import { Pressable } from "react-native";
import { auth } from "../../config";
import { MaterialIcons } from "@expo/vector-icons";
import { useDispatch } from "react-redux";
import { signOut } from "firebase/auth";
import { setIsLoading } from "../redux/authSlice";

export const LogOutButton = ({ style }) => {
  const dispatch = useDispatch();

  const onLoginOut = () => {
    dispatch(setIsLoading(true));
    signOut(auth);
  };
  return (
    <Pressable onPress={onLoginOut} style={style}>
      <MaterialIcons name="logout" size={24} color="#BDBDBD" />
    </Pressable>
  );
};
