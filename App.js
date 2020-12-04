import React from "react";
import { createAppContainer } from "react-navigation";
import { createStackNavigator } from "react-navigation-stack";
import NavigatorScreen from "./screens/NavigatorScreen";
import WelcomeScreen from "./screens/WelcomeScreen";
import RegisterTreeScreen from "./screens/RegisterTreeScreen";
import TreeMapScreen from "./screens/TreeMapScreen";

import color from "color";
import { DefaultTheme, Provider as PaperProvider } from "react-native-paper";

const navigator = createStackNavigator(
  {
    Navigator: NavigatorScreen,
    Welcome: WelcomeScreen,
    RegisterTree: RegisterTreeScreen,
    TreeMap: TreeMapScreen,
  },
  {
    initialRoute: "Navigator",
    defaultNavigationOptions: {
      title: "PetTree",
    },
  }
);

const theme = {
  ...DefaultTheme,
  dark: true,
  roundness: 10,
  animation: {
    scale: 2.0,
  },
  colors: {
    primary: "#43a047",
    accent: "#03dac4",
    background: "#f6f6f6",
    surface: "#FFFFFF",
    error: "#B00020",
    text: "#43a047",
    onBackground: "#000000",
    onSurface: "#000000",
    disabled: color("#000").alpha(0.26).rgb().string(),
    placeholder: color("#000").alpha(0.54).rgb().string(),
    backdrop: color("#000").alpha(0.5).rgb().string(),
  },
};

const AppContainer = createAppContainer(navigator);

const RootScreen = () => {
  return (
    <PaperProvider theme={theme}>
      <AppContainer />
    </PaperProvider>
  );
};

export default RootScreen;
