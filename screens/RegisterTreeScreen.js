import * as React from "react";
import { StyleSheet, View } from "react-native";
import { TextInput, Text, Button, Switch, useTheme } from "react-native-paper";

const RegisterScreen = () => {
  const [description, setDescription] = React.useState("");
  const [treeSpecies, setTreeSpecies] = React.useState("");
  const [treeFruitful, setTreeFruitful] = React.useState(false);

  const { defaultMargin } = useTheme();

  const onToggleFruitfulSwitch = () => setTreeFruitful(!treeFruitful);

  return (
    <View style={styles({ defaultMargin }).container}>
      <TextInput
        style={styles().item}
        label="Descrição"
        mode="outlined"
        value={description}
        onChangeText={(d) => setDescription(d)}
      />
      <TextInput
        style={styles().item}
        label="Espécie"
        mode="outlined"
        value={treeSpecies}
        onChangeText={(s) => setTreeSpecies(s)}
      />
      <View style={styles().switchContainer}>
        <Switch
          style={styles().switchComponent}
          value={treeFruitful}
          onValueChange={onToggleFruitfulSwitch}
        />
        <Text style={styles().switchLabel}>Frutífera</Text>
      </View>
      <Button
        style={styles().button}
        contentStyle={{ height: 50 }}
        mode="contained"
        onPress={() => console.log("Pressed")}
      >
        Confirmar
      </Button>
    </View>
  );
};

export default RegisterScreen;

const styles = (props) => {
  const { defaultMargin } = props || 5;
  return StyleSheet.create({
    container: {
      flex: 1,
      margin: defaultMargin,
    },
    textContainer: {
      margin: 10,
      flex: 1,
    },
    item: {
      marginVertical: 10,
    },
    button: {
      marginVertical: 10,
    },
    innerText: {
      color: "#43a047",
    },
    containerOptions: {
      alignItems: "center",
    },

    optionsText: {
      marginTop: 10,
      fontSize: 16,
      alignItems: "center",
    },
    switchComponent: {
      transform: [{ scaleX: 1.3 }, { scaleY: 1.3 }],
    },
    switchLabel: {
      fontSize: 20,
      textAlignVertical: "bottom",
    },
    switchContainer: {
      display: "flex",
      flexDirection: "row",
      alignItems: "flex-start",
      justifyContent: "flex-start",
    },
  });
};
