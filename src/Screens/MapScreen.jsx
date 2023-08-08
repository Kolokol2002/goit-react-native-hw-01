import React from "react";
import { StyleSheet } from "react-native";
import MapView, { Marker } from "react-native-maps";

export const MapScreen = ({ route }) => {
  const { longitude, latitude } = route.params.cords;
  return (
    <MapView
      style={styles.container}
      loadingEnabled={true}
      region={{
        latitude,
        longitude,
        latitudeDelta: 0.0922,
        longitudeDelta: 0.0421,
      }}
      mapType="standard"
    >
      <Marker
        title="I am here"
        coordinate={{ latitude, longitude }}
        description="Hello"
      />
    </MapView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
  },
});
