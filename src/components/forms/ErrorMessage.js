import React from "react";
import { StyleSheet } from "react-native";

import AppText from "../AppText";

const ErrorMessage = ({ error, visible, status }) => {
  if (!error || !visible) return null;
  return <AppText style={styles.error}>{error}</AppText>;
};

export default ErrorMessage;

const styles = StyleSheet.create({
  error: {
    color: "red",
  },
});
