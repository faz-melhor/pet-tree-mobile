import React from "react";
import { StyleSheet, FlatList, View } from "react-native";
import useAuth from "../auth/useAuth";
import Icon from "../components/Icon";
import ListItem from "../components/ListItem";
import ListItemSeparator from "../components/ListItemSeparator";
import Screen from "../components/Screen";
import colors from "../../config/colors";
import routes from "../navigation/routes";

const menuItems = [
  {
    title: "Minhas Árvores",
    icon: {
      name: "pine-tree",
      backgroundColor: colors.primary,
    },
    targetScreen: routes.TREE_LIST,
  },
];

const ProfileScreen = ({ navigation }) => {
  const { user, logOut } = useAuth();
  console.log(user);

  return (
    <Screen style={styles.screen}>
      <View style={styles.container}>
        <ListItem
          title={user.name}
          nick={user.nickname}
          subTitle={user.email}
          image={require("../../assets/profile.png")}
        />
      </View>
      <View style={styles.container}>
        <FlatList
          data={menuItems}
          ItemSeparatorComponent={ListItemSeparator}
          keyExtractor={(menuItem) => menuItem.title}
          renderItem={({ item }) => (
            <ListItem
              title={item.title}
              IconComponent={
                <Icon
                  name={item.icon.name}
                  backgroundColor={item.icon.backgroundColor}
                />
              }
              onPress={() => navigation.navigate(item.targetScreen)}
            />
          )}
        />
      </View>
      <ListItem
        title="Log Out"
        IconComponent={<Icon name="logout" backgroundColor="#cf077c" />}
        onPress={() => logOut()}
      />
    </Screen>
  );
};

export default ProfileScreen;

const styles = StyleSheet.create({
  container: {
    marginVertical: 20,
  },
  screen: {
    backgroundColor: colors.light,
  },
});
