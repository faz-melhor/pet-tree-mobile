import React, { useState } from "react";
import { NavigationContainer } from "@react-navigation/native";
import AuthContext from "./src/auth/context";
import authStorage from "./src/auth/storage";
import AuthNavigator from "./src/navigation/AuthNavigator";
import AppNavigator from "./src/navigation/AppNavigator";
import { navigationRef } from "./src/navigation/rootNavigation";
import AppLoading from "expo-app-loading";
import color from "color";
import {
  DefaultTheme,
  withTheme,
  Provider as PaperProvider,
} from "react-native-paper";

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

const RootScreen = () => {
  const [user, setUser] = useState();
  const [isReady, setIsReady] = useState(false);

  const restoreUser = async () => {
    const user = await authStorage.getUser();
    if (user) setUser(user);
  };

  if (!isReady)
    return (
      <AppLoading
        startAsync={restoreUser}
        onFinish={() => setIsReady(true)}
        onError={console.warn}
      />
    );

  return (
    <AuthContext.Provider value={{ user, setUser }}>
      <PaperProvider theme={theme}>
        <NavigationContainer ref={navigationRef}>
          {user ? <AppNavigator /> : <AuthNavigator />}
        </NavigationContainer>
      </PaperProvider>
    </AuthContext.Provider>
  );
};

export default withTheme(RootScreen);
