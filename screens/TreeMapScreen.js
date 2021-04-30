import React, { useState, useEffect } from "react";
import { View, Text, StyleSheet } from "react-native";
import MapView, { Marker } from "react-native-maps";
import * as Location from "expo-location";
import { TextInput, IconButton } from "react-native-paper";

const TreeMapScreen = () => {
  const [region, setRegion] = useState();

  const getCurrentPosition = async () => {
    let { status } = await Location.requestPermissionsAsync();

    if (status !== "granted") {
      Alert.alert("Ops!", "Permissão de acesso à localização negada.");
    }

    let {
      coords: { latitude, longitude },
    } = await Location.getCurrentPositionAsync();
    console.log("lat:", latitude, "long: ", longitude);
    setRegion({
      latitude,
      longitude,
      latitudeDelta: 0.0922,
      longitudeDelta: 0.0421,
      timing: 1000,
    });
  };

  useEffect(() => {
    getCurrentPosition();
  }, []);

  return (
    <View style={{ flex: 1 }}>
      <MapView region={region} style={styles.map}>
        <Marker
          coordinate={{ latitude: -25.519028, longitude: -54.574422 }}
          image={require("../assets/tree_1.png")}
        />
        <Marker
          coordinate={{ latitude: -25.3074137, longitude: -52.5423814 }}
          image={require("../assets/tree_0.png")}
        />
      </MapView>
      <View
        style={{
          position: "absolute",
          bottom: "5%",
          alignSelf: "center",
        }}
      >
        <IconButton
          style={{ backgroundColor: "#43a047" }}
          color="white"
          icon="plus"
          size={50}
          onPress={() => console.log("Plus Pressed")}
        />
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  map: {
    flex: 1,
  },
});

export default TreeMapScreen;
