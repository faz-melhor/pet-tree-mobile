import React, { useState, useEffect } from "react";
import { View, StyleSheet, Image } from "react-native";
import MapView, { Marker } from "react-native-maps";
import * as Location from "expo-location";
import RegisterTreeDialog from "../components/RegisterTreeDialog";
import MenuButton from "../components/MenuButton";
import SetLocationOnMap from "../components/SetLocationOnMap";

const TreeMapScreen = ({ navigation }) => {
  const fruitfulTreeMarketImage = require("../../assets/tree_1.png");
  const nonFruitfulTreeMarketImage = require("../../assets/tree_0.png");
  const [region, setRegion] = useState();
  const [locationPinVisible, setLocationPinVisible] = useState(false);
  const [dialogVisible, setVisible] = useState(false);

  const showLocationPin = () => setLocationPinVisible(true);
  const hideLocationPin = () => setLocationPinVisible(false);

  const showDialog = () => setVisible(true);
  const hideDialog = () => setVisible(false);

  const onRegionChange = (region) => {
    setRegion(region);
  };

  const getCurrentPosition = async () => {
    let { status } = await Location.requestForegroundPermissionsAsync();

    if (status !== "granted") {
      Alert.alert("Ops!", "Permissão de acesso à localização negada.");
    }

    const { coords } = await Location.getCurrentPositionAsync({
      enableHighAccuracy: true,
    });
    setRegion({
      latitude: coords.latitude,
      longitude: coords.longitude,
      latitudeDelta: 0.02305,
      longitudeDelta: 0.010525,
      timing: 1000,
    });
  };

  useEffect(() => {
    getCurrentPosition();
  }, []);

  return (
    <View style={styles.map}>
      <MapView
        region={region}
        style={styles.map}
        showsUserLocation={true}
        onRegionChangeComplete={onRegionChange}
      >
        <Marker coordinate={{ latitude: -25.519028, longitude: -54.574422 }}>
          <Image
            source={fruitfulTreeMarketImage}
            style={styles.treeMarker}
            resizeMode="cover"
          />
        </Marker>
        <Marker coordinate={{ latitude: -25.3074137, longitude: -52.5423814 }}>
          <Image
            source={nonFruitfulTreeMarketImage}
            style={styles.treeMarker}
            resizeMode="cover"
          />
        </Marker>
      </MapView>
      {locationPinVisible ? (
        <SetLocationOnMap
          showDialog={showDialog}
          region={region}
          navigation={navigation}
          hideLocationPin={hideLocationPin}
        />
      ) : (
        <MenuButton showLocationPin={showLocationPin} navigation={navigation} />
      )}
      {dialogVisible ? (
        <RegisterTreeDialog
          region={region}
          hideLocationPin={hideLocationPin}
          hideDialog={hideDialog}
        />
      ) : null}
    </View>
  );
};

const styles = StyleSheet.create({
  map: {
    flex: 1,
  },
  treeMarker: {
    width: 35,
    height: 35,
    resizeMode: "contain",
  },
});

export default TreeMapScreen;
