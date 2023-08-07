import React from "react";
import { View, Text, StyleSheet } from "react-native";
import MapView, { Marker } from "react-native-maps";

export const MapScreen = ({ route }) => {
  console.log(route.params.cords);
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
      // minZoomLevel={15}
      // onMapReady={() => console.log("Map is ready")}
      // onRegionChange={() => console.log("Region change")}
    >
      <Marker
        title="I am here"
        coordinate={{ latitude, longitude }}
        description="Hello"
      />
      {/* <Text>latitude: {route.params.cords.latitude}</Text>
      <Text>longitude: {route.params.cords.longitude}</Text> */}
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
