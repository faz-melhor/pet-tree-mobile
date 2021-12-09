import React, { useState } from "react";
import { View, StyleSheet, TouchableOpacity } from "react-native";
import { IconButton, Menu } from "react-native-paper";
import routes from "../navigation/routes";

const MenuButton = (props) => {
  const {
    showLocationPin,
    showChangeDistanceDialog,
    refreshTrees,
    navigation,
  } = props;
  const [showMenu, setShowMenu] = useState(false);

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
            <IconButton color="white" icon="menu" size={25} />
          </TouchableOpacity>
        }
      >
        <Menu.Item onPress={showLocationPin} title="add tree" />
        <Menu.Item onPress={refreshTrees} title="refresh" />
        <Menu.Item onPress={showChangeDistanceDialog} title="change distance" />
        <Menu.Item
          onPress={() => {
            setShowMenu(false);
            navigation.navigate(routes.PROFILE);
          }}
          title="profile"
        />
      </Menu>
    </View>
  );
};

const styles = StyleSheet.create({
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
});

export default MenuButton;
