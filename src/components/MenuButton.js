import React, { useState } from "react";
import { View, StyleSheet, TouchableOpacity } from "react-native";
import { Divider, IconButton, Menu } from "react-native-paper";
import useAuth from "../auth/useAuth";
import routes from "../navigation/routes";

const MenuButton = ({ showLocationPin, navigation }) => {
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
            <IconButton color="white" icon="menu" size={25} />
          </TouchableOpacity>
        }
      >
        <Menu.Item onPress={showLocationPin} title="add tree" />
        <Menu.Item onPress={() => console.log("refresh")} title="refresh" />
        <Menu.Item
          onPress={() => console.log("change distance")}
          title="change distance"
        />
        <Menu.Item
          onPress={() => {
            setShowMenu(false);
            navigation.navigate(routes.PROFILE);
          }}
          title="profile"
        />
        <Divider />
        <Menu.Item onPress={() => auth.logOut()} title="logout" />
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
