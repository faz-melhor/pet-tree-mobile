import React from "react";
import { Modal, StyleSheet, View } from "react-native";
import LottieView from "lottie-react-native";

const UploadScreen = ({ onDone, visible = false }) => {
  return (
    <Modal visible={visible}>
      <View style={styles.container}>
        <LottieView
          autoPlay
          resizeMode="cover"
          loop={false}
          onAnimationFinish={onDone}
          style={styles.animation}
          source={require("../../assets/animations/check.json")}
        />
      </View>
    </Modal>
  );
};

export default UploadScreen;

const styles = StyleSheet.create({
  container: {
    alignItems: "center",
    flex: 1,
    justifyContent: "center",
  },
  animation: {
    width: 200,
  },
});
