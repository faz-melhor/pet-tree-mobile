import React, { useState, useEffect } from "react";
import { Text, StyleSheet } from "react-native";
import MapView, { Region } from "react-native-maps";
import * as Location from "expo-location";

const initialRegion = {
  latitude: -25.519028,
  longitude: -54.574422,
  latitudeDelta: 0.0922,
  longitudeDelta: 0.0421,
};

const TreeMapScreen = () => {
  const [region, setRegion] = useState(initialRegion);

  const getCurrentPosition = async () => {
    let { status } = await Location.requestPermissionsAsync();

    if (status !== "granted") {
      Alert.alert("Ops!", "Permissão de acesso a localização negada.");
    }

    let {
      coords: { latitude, longitude },
    } = await Location.getCurrentPositionAsync();

    setRegion({
      latitude,
      longitude,
      latitudeDelta: 0.0922,
      longitudeDelta: 0.0421,
    });
  };

  useEffect(() => {
    getCurrentPosition();
  }, []);

  return <MapView initialRegion={region} region={region} style={styles.map} />;
};

const styles = StyleSheet.create({
  map: {
    flex: 1,
  },
});

export default TreeMapScreen;
