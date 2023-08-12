import { Pressable } from "react-native";
import { auth } from "../../config";
import { MaterialIcons } from "@expo/vector-icons";
import { useDispatch } from "react-redux";
import { signOut } from "firebase/auth";
import { setIsLoading, setLogOut } from "../redux/authSlice";

export const LogOutButton = ({ style }) => {
  const dispatch = useDispatch();

  const onLoginOut = async () => {
    dispatch(setIsLoading(true));
    signOut(auth);
    dispatch(setLogOut());
  };
  return (
    <Pressable onPress={onLoginOut} style={style}>
      <MaterialIcons
        // style={styles.logoutIcon}
        name="logout"
        size={24}
        color="#BDBDBD"
      />
    </Pressable>
  );
};
