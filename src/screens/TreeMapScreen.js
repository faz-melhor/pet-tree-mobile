import React, { useState, useEffect, useRef } from "react";
import { View, StyleSheet, Image, Text } from "react-native";
import { IconButton } from "react-native-paper";
import MapView, { Callout, Marker } from "react-native-maps";
import * as Location from "expo-location";
import TreeInfoDialog from "../components/TreeInfoDialog";
import MenuButton from "../components/MenuButton";
import SetLocationOnMap from "../components/SetLocationOnMap";
import WantToEditTreeDialog from "../components/WantToEditTreeDialog";
import { NewDistanceDialog } from "../components/NewDistanceDialog";
import useAuth from "../auth/useAuth";
import useApi from "../hooks/useApi";
import treesApi from "../api/trees";
import { useIsFocused } from "@react-navigation/native";

const TreeMapScreen = ({ route, navigation }) => {
  const fruitfulTreeMarketImage = require("../../assets/tree_1.png");
  const nonFruitfulTreeMarketImage = require("../../assets/tree_0.png");
  const [region, setRegion] = useState();
  const [trees, setTrees] = useState([]);
  const [treesLoaded, setTreesLoaded] = useState(false);
  const [locationPinVisible, setLocationPinVisible] = useState(false);
  const [treeInfoDialogVisible, setTreeInfoDialogVisible] = useState(false);
  const [wantToEditTreeDialogVisible, setWantToEditTreeDialogVisible] =
    useState(false);
  const [changeDistanceDialogVisible, setChangeDistanceDialogVisible] =
    useState(false);
  const [radius, setRadius] = useState(12000);
  const [currentTree, setCurrentTree] = useState({});
  const [currentAction, setCurrentAction] = useState("add");
  const { user } = useAuth();
  const isFocused = useIsFocused();
  const mapRef = useRef(null);
  let markers = {};
  const [focusedTree, setFocusedTree] = useState("");

  const showLocationPin = () => {
    setCurrentAction("add");
    setLocationPinVisible(true);
  };
  const hideLocationPin = () => setLocationPinVisible(false);

  const showTreeInfoDialog = () => setTreeInfoDialogVisible(true);
  const hideTreeInfoDialog = () => setTreeInfoDialogVisible(false);

  const showChangeDistanceDialog = () => setChangeDistanceDialogVisible(true);
  const hideChangeDistanceDialog = () => setChangeDistanceDialogVisible(false);

  const showWantToEditTreeDialog = () => setWantToEditTreeDialogVisible(true);
  const hideWantToEditTreeDialog = () => setWantToEditTreeDialogVisible(false);

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

  const setCurrentPositionFromParams = async () => {
    let found = false;

    for (let i = 0; i < trees.length; i++) {
      if (trees[i].id == route.params.tree.id) {
        found = true;
      }
    }

    if (!found) {
      const owner = {
        id: user.id,
        nickname: user.nickname,
      };

      route.params.tree.owner = owner;

      trees.push(route.params.tree);
    }

    const newRegion = {
      latitude: route.params.tree.lat,
      longitude: route.params.tree.lng,
      latitudeDelta: 0.02305,
      longitudeDelta: 0.010525,
      timing: 1000,
    };

    mapRef.current.animateToRegion(newRegion, 1000 * 2);
    setFocusedTree(route.params.tree.id);
  };

  const prepareEditInfo = (tree) => {
    setCurrentAction("update");
    setCurrentTree(tree);
    showWantToEditTreeDialog();
  };

  const renderTrees = (trees) => {
    return trees.map((tree) => {
      const { id, fruitful, lat, lng, description, specie, owner } = tree;

      return (
        <Marker
          key={id}
          coordinate={{ latitude: lat, longitude: lng }}
          ref={(ref) => (markers[id] = ref)}
        >
          <Image
            style={styles.treeMarker}
            source={
              fruitful ? fruitfulTreeMarketImage : nonFruitfulTreeMarketImage
            }
            resizeMode="cover"
          />
          <Callout
            tooltip
            onPress={owner.id == user.id ? () => prepareEditInfo(tree) : null}
          >
            <View style={styles.bubble}>
              {owner.id == user.id ? (
                <IconButton
                  icon="pencil"
                  size={15}
                  style={{ padding: 0, margin: 0 }}
                />
              ) : null}
              <Text style={styles.specie}>Specie: {specie}</Text>
              <Text style={styles.owner}>Owner: {owner.nickname}</Text>
              <Text style={styles.description}>{description}</Text>
            </View>
            <View style={styles.arrowBorder} />
            <View style={styles.arrow} />
          </Callout>
        </Marker>
      );
    });
  };

  useEffect(() => {
    if (route.params != undefined) {
      setCurrentPositionFromParams();
    } else {
      setCurrentPosition();
    }
  }, [isFocused]);

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

  useEffect(() => {
    if (focusedTree != "") {
      markers[focusedTree].showCallout();
    }
  }, [focusedTree]);

  return (
    <View style={styles.map}>
      <MapView
        ref={mapRef}
        initialRegion={region}
        style={styles.map}
        showsUserLocation={true}
        onRegionChangeComplete={onRegionChange}
      >
        {trees ? renderTrees(trees) : null}
      </MapView>
      {locationPinVisible ? (
        <SetLocationOnMap
          showDialog={showTreeInfoDialog}
          hideLocationPin={hideLocationPin}
          region={region}
          setCurrentTree={setCurrentTree}
        />
      ) : (
        <MenuButton
          showLocationPin={showLocationPin}
          showChangeDistanceDialog={showChangeDistanceDialog}
          refreshTrees={refresh}
          navigation={navigation}
        />
      )}
      {treeInfoDialogVisible ? (
        <TreeInfoDialog
          hideLocationPin={hideLocationPin}
          hideDialog={hideTreeInfoDialog}
          tree={currentTree}
          action={currentAction}
        />
      ) : null}
      {changeDistanceDialogVisible ? (
        <NewDistanceDialog
          hideDialog={hideChangeDistanceDialog}
          setRadius={setRadius}
        />
      ) : null}
      {wantToEditTreeDialogVisible ? (
        <WantToEditTreeDialog
          hideDialog={hideWantToEditTreeDialog}
          showTreeInfoDialog={showTreeInfoDialog}
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
