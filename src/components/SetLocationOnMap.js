import React from "react";
import { View, StyleSheet, TouchableOpacity, Image } from "react-native";
import { IconButton } from "react-native-paper";

const SetLocationOnMap = ({
  showDialog,
  hideLocationPin,
  region,
  setCurrentTree,
}) => {
  const pin = require("../../assets/leaf_pin.png");

  const prepareAddInfo = (region, setCurrentTree) => {
    const tree = {
      description: "",
      specie: "",
      fruitful: false,
      lat: region.latitude,
      lng: region.longitude,
    };
    setCurrentTree(tree);
    showDialog();
  };

  return (
    <View style={styles.defaultPosition}>
      <View style={styles.topLeftPosition}>
        <TouchableOpacity style={styles.greenCircle} onPress={hideLocationPin}>
          <IconButton color="white" icon="arrow-left" size={25} />
        </TouchableOpacity>
      </View>
      <View style={styles.treePinPos}>
        <Image source={pin} style={styles.treePin} resizeMode="cover" />
      </View>
      <View style={styles.bottomCenter}>
        <TouchableOpacity style={styles.greenCircle}>
          <IconButton
            style={{ backgroundColor: "#43a047" }}
            color="white"
            icon="plus"
            size={40}
            onPress={() => prepareAddInfo(region, setCurrentTree)}
          />
        </TouchableOpacity>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
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
    borderRadius: 100,
  },
  treePinPos: {
    position: "absolute",
    top: "50%",
    left: "50%",
    marginLeft: -50,
    marginTop: -92,
  },
  treePin: {
    width: 100,
    height: 100,
    resizeMode: "contain",
  },
  bottomCenter: {
    position: "absolute",
    bottom: "5%",
    alignSelf: "center",
  },
  greenButton: {
    marginVertical: 10,
    backgroundColor: "#43a047",
  },
});

export default SetLocationOnMap;
