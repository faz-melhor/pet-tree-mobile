import React, { useState, useEffect } from "react";
import { View, StyleSheet, TouchableOpacity } from "react-native";
import MapView, { Marker } from "react-native-maps";
import * as Location from "expo-location";
import { Divider, IconButton, Menu } from "react-native-paper";
import routes from "../navigation/routes";
import useAuth from "../auth/useAuth";


const TreeMapScreen = ({ navigation }) => {
  const [region, setRegion] = useState();
  const [showMenu, setShowMenu] = useState(false);

  const auth = useAuth();

  const getCurrentPosition = async () => {
    let { status } = await Location.requestForegroundPermissionsAsync();

    if (status !== "granted") {
      Alert.alert("Ops!", "Permissão de acesso à localização negada.");
    }

    const { coords } = await Location.getCurrentPositionAsync({ enableHighAccuracy: true });
    console.log("lat:", coords.latitude, "long: ", coords.longitude);
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
    <View style={{ flex: 1 }}>
      <MapView region={region} style={styles.map}>
        <Marker
          coordinate={{ latitude: -25.519028, longitude: -54.574422 }}
          image={require("../../assets/tree_1.png")}
        />
        <Marker
          coordinate={{ latitude: -25.3074137, longitude: -52.5423814 }}
          image={require("../../assets/tree_0.png")}
        />
      </MapView>
      <View
        style={{
          position: "absolute",
          top: "8%",
          left: "8%",
          alignSelf: "center",
        }}
      >
        <Menu
          visible={showMenu}
          onDismiss={() => setShowMenu(false)}
          anchor={
            <TouchableOpacity
              style={{ backgroundColor: "#43a047", borderRadius: 100 }}
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
      <View
        style={{
          position: "absolute",
          bottom: "5%",
          alignSelf: "center",
        }}
      >
        <TouchableOpacity
          style={{ backgroundColor: "#43a047", borderRadius: 100 }}
        >
          <IconButton
            style={{ backgroundColor: "#43a047" }}
            color="white"
            icon="plus"
            size={40}
            onPress={() => {
              navigation.navigate(routes.REGISTER_TREE, {
                lat: -34.57613278928747,
                lng: -58.40964771739279,
              });
            }}
          />
        </TouchableOpacity>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  map: {
    flex: 1,
  },
  actionButtonIcon: {
    fontSize: 20,
    height: 22,
    color: 'white',
  },
});

export default TreeMapScreen;
