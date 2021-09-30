import React from "react";
import LottieView from "lottie-react-native";
import { StyleSheet, View } from "react-native";

const AppActivityIndicator = ({ visible = false }) => {
  if (!visible) return null;
  return (
    <View style={style.overlay}>
      <LottieView
        autoPlay
        loop
        source={require("../../assets/animations/loading.json")}
      />
    </View>
  );
};

const style = StyleSheet.create({
  overlay: {
    position: "absolute",
    backgroundColor: "white",
    height: "100%",
    opacity: 0.8,
    width: "100%",
    zIndex: 1,
  },
});

export default AppActivityIndicator;
