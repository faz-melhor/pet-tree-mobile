import * as React from "react";
import { TextInput } from "react-native-paper";
import { StyleSheet, Text, View } from "react-native";

const WelcomeScreen = () => {
  const [text, setText] = React.useState("");
  const [password, setPassword] = React.useState("");

  return (
    <View style={{ marginTop: 50, marginHorizontal: 10 }}>
      <TextInput
        theme={{ colors: { primary: "#48ac3c" } }}
        label="Email"
        mode="outlined"
        selectionColor="#48ac3c"
        value={text}
        onChangeText={(text) => setText(text)}
      />

      <TextInput
        theme={{ colors: { primary: "green" } }}
        label="Password"
        mode="outlined"
        selectionColor="#48ac3c"
        secureTextEntry={true}
        value={password}
        onChangeText={(password) => setPassword(password)}
      />
    </View>
  );
};

export default WelcomeScreen;

const styles = StyleSheet.create({});
