import React, { useState, useEffect } from "react";
import { FlatList, StyleSheet } from "react-native";
import ListItem from "../components/ListItem";
import ListItemSeparator from "../components/ListItemSeparator";
import Screen from "../components/Screen";

import usersApi from "../api/users";

import useApi from "../hooks/useApi";
import useAuth from "../auth/useAuth";
import AppActivityIndicator from "../components/AppActivityIndicator";

const TreeListScreen = () => {
  const { user, logOut } = useAuth();
  const getTrees = useApi(usersApi.getUserTrees);
  useEffect(() => {
    getTrees.request(user.id);
  }, []);

  return (
    <Screen>
      <AppActivityIndicator visible={getTrees.loading} />

      <FlatList
        data={getTrees.data.trees}
        keyExtractor={(tree) => tree.id.toString()}
        renderItem={({ item }) => (
          <ListItem
            title={item.specie}
            subTitle={item.description}
            image={
              item.fruitful
                ? require("../../assets/tree_1.png")
                : require("../../assets/tree_0.png")
            }
            style_image={{
              width: 35,
              height: 42,
            }}
            onPress={() => console.log("Tree Press", item)}
          />
        )}
        ItemSeparatorComponent={ListItemSeparator}
      />
    </Screen>
  );
};

export default TreeListScreen;

const styles = StyleSheet.create({});
