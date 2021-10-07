import React, { useState, useEffect } from "react";
import { View, StyleSheet, TouchableOpacity, Image } from "react-native";
import MapView, { Marker } from "react-native-maps";
import * as Location from "expo-location";
import { Divider, IconButton, Menu, Button } from "react-native-paper";
import routes from "../navigation/routes";
import useAuth from "../auth/useAuth";

const SetLocationOnMap = ({ region, navigation, setShowLocationPin }) => {
  const pin = require("../../assets/leaf_pin.png");

  return (
    <View style={styles.defaultPosition}>
      <View style={styles.topLeftPosition}>
        <TouchableOpacity
          style={styles.greenCircle}
          onPress={() => setShowLocationPin(false)}
        >
          <IconButton
            color="white"
            icon="arrow-left"
            size={25}
          />
        </TouchableOpacity>
      </View>
      <View style={styles.treePinPos}>
        <Image source={pin} style={styles.treePin} resizeMode='cover' />
      </View>
      <View style={styles.bottomCenter}>
        <Button
          style={styles.greenButton}
          mode="contained"
          contentStyle={{ height: 50 }}
          onPress={() => {
            navigation.navigate(routes.REGISTER_TREE, {
              lat: region.latitude,
              lng: region.longitude,
            });
          }}
        >
          Set Location
        </Button>
      </View>
    </View >
  )
}

const MenuButton = () => {
  const [showMenu, setShowMenu] = useState(false);
  const auth = useAuth();

  return (
    <View style={styles.topLeftPosition}>
      <Menu
        visible={showMenu}
        onDismiss={() => setShowMenu(false)}
        anchor={
          <TouchableOpacity
            style={styles.greenCircle}
            onPress={() => setShowMenu(true)}
          >
            <IconButton
              color="white"
              icon="menu"
              size={25}
            />
          </TouchableOpacity>
        }
      >
        <Menu.Item onPress={() => console.log("refresh")} title="refresh" />
        <Menu.Item onPress={() => console.log("change distance")} title="change distance" />
        <Menu.Item onPress={() => console.log("profile")} title="profile" />
        <Divider />
        <Menu.Item onPress={() => auth.logOut()} title="logout" />
      </Menu>
    </View>
  )
}

const RegisterTreeButton = ({ setShowLocationPin }) => {
  return (
    <View style={styles.bottomCenter}>
      <TouchableOpacity style={styles.greenCircle}>
        <IconButton
          style={{ backgroundColor: "#43a047" }}
          color="white"
          icon="plus"
          size={40}
          onPress={() => setShowLocationPin(true)}
        />
      </TouchableOpacity>
    </View>
  )
}

const MainButtons = ({ setShowLocationPin }) => {
  return (
    <View style={styles.defaultPosition}>
      <MenuButton />
      <RegisterTreeButton setShowLocationPin={setShowLocationPin} />
    </View>
  )
}

const TreeMapScreen = ({ navigation }) => {
  const fruitfulTreeMarketImage = require("../../assets/tree_1.png");
  const nonFruitfulTreeMarketImage = require("../../assets/tree_0.png");
  const [region, setRegion] = useState();
  const [showLocationPin, setShowLocationPin] = useState(false);

  const onRegionChange = (region) => {
    setRegion(region);
  }

  const getCurrentPosition = async () => {
    let { status } = await Location.requestForegroundPermissionsAsync();

    if (status !== "granted") {
      Alert.alert("Ops!", "Permissão de acesso à localização negada.");
    }

    const { coords } = await Location.getCurrentPositionAsync({ enableHighAccuracy: true });
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
        <Marker
          coordinate={{ latitude: -25.519028, longitude: -54.574422 }}
        >
          <Image source={fruitfulTreeMarketImage} style={styles.treeMarker} resizeMode='cover' />
        </Marker>
        <Marker
          coordinate={{ latitude: -25.3074137, longitude: -52.5423814 }}
        >
          <Image source={nonFruitfulTreeMarketImage} style={styles.treeMarker} resizeMode='cover' />
        </Marker>
      </MapView>
      {showLocationPin ? <SetLocationOnMap region={region} navigation={navigation} setShowLocationPin={setShowLocationPin} /> : <MainButtons setShowLocationPin={setShowLocationPin} />}
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
    resizeMode: 'contain'
  },
  defaultPosition: {
    position: "absolute",
    bottom: 0,
    top: 0,
    right: 0,
    left: 0,
  },
  topLeftPosition: {
    position: "absolute",
    top: "8%",
    left: "8%",
    alignSelf: "center",
  },
  greenCircle: {
    backgroundColor: "#43a047",
    borderRadius: 100
  },
  treePinPos: {
    position: "absolute",
    top: '50%',
    left: '50%',
    marginLeft: -50,
    marginTop: -92,
  },
  treePin: {
    width: 100,
    height: 100,
    resizeMode: 'contain'
  },
  bottomCenter: {
    position: "absolute",
    bottom: "5%",
    alignSelf: "center",
  },
  greenButton: {
    marginVertical: 10,
    backgroundColor: "#43a047"
  }
});

export default TreeMapScreen;
