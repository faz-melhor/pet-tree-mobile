import * as React from "react";
import { View, Text, Button, StyleSheet } from "react-native";

const NavigationScreen = ({ navigation }) => {
  return (
    <View>
      <Text>Choose the Screen</Text>
      <Button
        title="Go to Welcome Screen"
        onPress={() => navigation.navigate("Welcome")}
      />
      <Button
        title="Go to Account Registration Screen"
        onPress={() => navigation.navigate("RegisterAccount")}
      />
      <Button
        title="Go to Tree Registration Screen"
        onPress={() => navigation.navigate("RegisterTree")}
      />
      <Button
        title="Go to Tree Map Screen"
        onPress={() => navigation.navigate("TreeMap")}
      />
    </View>
  );
};

const stylesheet = StyleSheet.create({});

export default NavigationScreen;
