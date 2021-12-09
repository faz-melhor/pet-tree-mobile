import React, { useState, useEffect } from "react";
import { View, StyleSheet, Image, Text } from "react-native";
import MapView, { Callout, Marker } from "react-native-maps";
import * as Location from "expo-location";
import RegisterTreeDialog from "../components/RegisterTreeDialog";
import MenuButton from "../components/MenuButton";
import SetLocationOnMap from "../components/SetLocationOnMap";
import { NewDistanceDialog } from "../components/NewDistanceDialog";
import useApi from "../hooks/useApi";
import treesApi from "../api/trees";

const TreeMapScreen = ({ navigation }) => {
  const fruitfulTreeMarketImage = require("../../assets/tree_1.png");
  const nonFruitfulTreeMarketImage = require("../../assets/tree_0.png");
  const [region, setRegion] = useState();
  const [trees, setTrees] = useState([]);
  const [treesLoaded, setTreesLoaded] = useState(false);
  const [locationPinVisible, setLocationPinVisible] = useState(false);
  const [newTreeDialogVisible, setNewTreeDialogVisible] = useState(false);
  const [changeDistanceDialogVisible, setChangeDistanceDialogVisible] =
    useState(false);
  const [radius, setRadius] = useState(12000);

  const showLocationPin = () => setLocationPinVisible(true);
  const hideLocationPin = () => setLocationPinVisible(false);

  const showNewTreeDialog = () => setNewTreeDialogVisible(true);
  const hideNewTreeDialog = () => setNewTreeDialogVisible(false);

  const showChangeDistanceDialog = () => setChangeDistanceDialogVisible(true);
  const hideChangeDistanceDialog = () => setChangeDistanceDialogVisible(false);

  const getTrees = useApi(treesApi.getTrees);

  const refresh = async () => {
    await fetchTrees(region.latitude, region.longitude);
  };

  const onRegionChange = (region) => {
    setRegion(region);
  };

  const fetchTrees = async (lat, lng) => {
    const result = await getTrees.request({
      lat: lat,
      lng: lng,
      radius: radius,
    });

    if (!result.ok) {
      console.log("failed");
      console.log(result);
      return;
    }

    setTrees(result.data.trees);
    setTreesLoaded(true);
  };

  const setCurrentPosition = async () => {
    const { status } = await Location.requestForegroundPermissionsAsync();

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

  const renderTrees = (trees) => {
    return trees.map((tree) => {
      const { id, fruitful, lat, lng, description, specie, owner } = tree;

      return (
        <Marker
          key={id}
          coordinate={{ latitude: lat, longitude: lng }}
          // onPress={() => {
          //   navigation.navigate("TreeDetails", { tree });
          // }}
        >
          <Image
            style={styles.treeMarker}
            source={
              fruitful ? fruitfulTreeMarketImage : nonFruitfulTreeMarketImage
            }
            resizeMode="cover"
          />
          <Callout tooltip>
            <View>
              <View style={styles.bubble}>
                <Text style={styles.specie}>Specie: {specie}</Text>
                <Text style={styles.owner}>Owner: {owner.nickname}</Text>
                <Text style={styles.description}>{description}</Text>
              </View>
              <View style={styles.arrowBorder} />
              <View style={styles.arrow} />
            </View>
          </Callout>
        </Marker>
      );
    });
  };

  useEffect(() => {
    setCurrentPosition();
  }, []);

  useEffect(() => {
    renderTrees(trees);
  }, [trees]);

  useEffect(() => {
    if (!treesLoaded) {
      if (region) {
        fetchTrees(region.latitude, region.longitude);
      }
    }
  }, [region, treesLoaded]);

  return (
    <View style={styles.map}>
      <MapView
        initialRegion={region}
        style={styles.map}
        showsUserLocation={true}
        onRegionChangeComplete={onRegionChange}
      >
        {trees ? renderTrees(trees) : null}
      </MapView>
      {locationPinVisible ? (
        <SetLocationOnMap
          showDialog={showNewTreeDialog}
          region={region}
          navigation={navigation}
          hideLocationPin={hideLocationPin}
        />
      ) : (
        <MenuButton
          showLocationPin={showLocationPin}
          showChangeDistanceDialog={showChangeDistanceDialog}
          refreshTrees={refresh}
          navigation={navigation}
        />
      )}
      {newTreeDialogVisible ? (
        <RegisterTreeDialog
          region={region}
          hideLocationPin={hideLocationPin}
          hideDialog={hideNewTreeDialog}
        />
      ) : null}
      {changeDistanceDialogVisible ? (
        <NewDistanceDialog
          hideDialog={hideChangeDistanceDialog}
          setRadius={setRadius}
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
  bubble: {
    flexDirection: "column",
    alignItems: "flex-start",
    backgroundColor: "#fff",
    borderRadius: 6,
    borderColor: "#ccc",
    borderWidth: 0.5,
    padding: 10,
    width: 150,
  },
  arrow: {
    backgroundColor: "transparent",
    borderColor: "transparent",
    borderTopColor: "#fff",
    borderWidth: 16,
    marginTop: -32,
    alignSelf: "center",
  },
  arrowBorder: {
    backgroundColor: "transparent",
    borderColor: "transparent",
    borderTopColor: "#007a87",
    borderWidth: 16,
    marginTop: -0.5,
    alignSelf: "center",
  },
  description: {
    fontSize: 16,
    color: "black",
    marginTop: 3,
  },
  specie: {
    fontSize: 12,
    color: "grey",
  },
  owner: {
    fontSize: 10,
    color: "grey",
  },
});

export default TreeMapScreen;
