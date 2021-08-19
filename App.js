import React, { useState } from "react";
import { createAppContainer } from "react-navigation";
import { createStackNavigator } from "react-navigation-stack";
import NavigatorScreen from "./screens/NavigatorScreen";
import WelcomeScreen from "./screens/WelcomeScreen";
import RegisterAccountScreen from "./screens/RegisterAccountScreen";
import RegisterTreeScreen from "./screens/RegisterTreeScreen";
import TreeMapScreen from "./screens/TreeMapScreen";
import AuthContext from "./auth/context";
import authStorage from "./auth/storage";

import { AppLoading } from "expo";

import color from "color";
import {
  DefaultTheme,
  withTheme,
  Provider as PaperProvider,
} from "react-native-paper";

RegisterTreeScreen["navigationOptions"] = (screenProps) => ({
  title: "Registrar Nova Árvore",
});

RegisterAccountScreen["navigationOptions"] = (screenProps) => ({
  title: "Registrar Nova Conta",
});

const navigator = createStackNavigator(
  {
    Navigator: NavigatorScreen,
    Welcome: WelcomeScreen,
    RegisterAccount: RegisterAccountScreen,
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
  dark: false,
  roundness: 10,
  animation: {
    scale: 2.0,
  },
  defaultMargin: 15,
  colors: {
    primary: "#43a047",
    accent: "#43a047",
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
  const [user, setUser] = useState();
  const [isReady, setIsReady] = useState(false);

  const restoreUser = async () => {
    const user = await authStorage.getUser();
    if (user) setUser(user);
  };

  if (!isReady)
    return (
      <AppLoading startAsync={restoreUser} onFinish={() => setIsReady(true)} />
    );

  return (
    <AuthContext.Provider value={{ user, setUser }}>
      <PaperProvider theme={theme}>
        <AppContainer />
      </PaperProvider>
    </AuthContext.Provider>
  );
};

export default withTheme(RootScreen);
