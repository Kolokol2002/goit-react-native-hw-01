import { ActivityIndicator, StyleSheet, View } from "react-native";
import { useSelector } from "react-redux";
import { getIsLoading } from "../redux/selectors";

export const Loader = () => {
  const isLoading = useSelector(getIsLoading);
  return (
    isLoading && (
      <View style={styles.loaderContainer}>
        <ActivityIndicator style={styles.loader} size={100} color="#FF6C00" />
      </View>
    )
  );
};

const styles = StyleSheet.create({
  loaderContainer: {
    position: "absolute",
    top: 0,
    bottom: 0,
    left: 0,
    right: 0,
    zIndex: 2,
    alignItems: "center",
    justifyContent: "center",
    backgroundColor: "#FFFFFF",
  },
});
