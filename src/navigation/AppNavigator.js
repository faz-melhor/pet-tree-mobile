import React from "react";
import { createNativeStackNavigator } from "@react-navigation/native-stack";

import TreeMapScreen from "../screens/TreeMapScreen";
import ProfileScreen from "../screens/ProfileScreen";
import TreeListScreen from "../screens/TreeListScreen";

import routes from "./routes";

const Stack = createNativeStackNavigator();

const AppNavigator = () => {
  return (
    <Stack.Navigator initialRouteName={routes.MAP}>
      <Stack.Screen
        name={routes.MAP}
        component={TreeMapScreen}
        options={{ headerShown: false }}
      />
      <Stack.Screen name={routes.PROFILE} component={ProfileScreen} />
      <Stack.Screen name={routes.TREE_LIST} component={TreeListScreen} />
    </Stack.Navigator>
  );
};

export default AppNavigator;
