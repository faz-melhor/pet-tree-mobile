import { StatusBar } from 'expo-status-bar';
import color from 'color';
import React from 'react';
import { StyleSheet, Text, View } from 'react-native';
import WelcomeScreen from './screens/WelcomeScreen';
import { DefaultTheme, Provider as PaperProvider } from 'react-native-paper'

const theme = {
  ...DefaultTheme,
  // Specify custom property in nested object
  dark: true,
  roundness: 10,
  animation: {
    scale: 2.0,
  },
  colors: {
    primary: '#43a047',
    accent: '#03dac4',
    background: '#f6f6f6',
    surface: '#FFFFFF',
    error: '#B00020',
    text: '#43a047',
    onBackground: '#000000',
    onSurface: '#000000',
    disabled: color('#000').alpha(0.26).rgb().string(),
    placeholder: color('#000').alpha(0.54).rgb().string(),
    backdrop: color('#000').alpha(0.5).rgb().string(),
  },
};

export default function App() {
  return (
    <PaperProvider theme={theme}>
      <WelcomeScreen/>
    </PaperProvider>
    
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
});
