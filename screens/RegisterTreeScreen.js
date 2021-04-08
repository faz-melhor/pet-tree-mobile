import * as React from "react";
import { StyleSheet, Image, Text, View } from "react-native";
import { TextInput, Button } from "react-native-paper";

const RegisterScreen = () => {
  const [email, setEmail] = React.useState("");
  const [nome, setNome] = React.useState("");

  const [password, setPassword] = React.useState("");
  const [passwordConfirmation, setPasswordConfirmation] = React.useState("");

  return (
    <View style={styles.container}>
      <TextInput
        style={styles.item}
        label="E-mail"
        mode="outlined"
        value={email}
        onChangeText={(email) => setEmail(email)}
      />
      <TextInput
        style={styles.item}
        label="Nome"
        mode="outlined"
        value={nome}
        onChangeText={(nome) => setNome(nome)}
      />
      <TextInput
        style={styles.item}
        label="Senha"
        mode="outlined"
        secureTextEntry={true}
        value={password}
        onChangeText={(password) => setPassword(password)}
      />
      <TextInput
        style={styles.item}
        label="Confirmar Senha"
        mode="outlined"
        secureTextEntry={true}
        value={passwordConfirmation}
        onChangeText={(passwordConfirmation) =>
          setPasswordConfirmation(passwordConfirmation)
        }
      />
      <Button
        style={styles.button}
        contentStyle={{ height: 50 }}
        mode="contained"
        onPress={() => console.log("Pressed")}
      >
        Entrar
      </Button>
    </View>
  );
};

export default RegisterScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
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
});
