import React from "react";
import { View, Text, StyleSheet } from "react-native";

export const MapScreen = ({ route }) => {
  return (
    <View style={styles.container}>
      <Text>latitude: {route.params.cords.latitude}</Text>
      <Text>longitude: {route.params.cords.longitude}</Text>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
  },
});
