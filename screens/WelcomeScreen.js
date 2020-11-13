import * as React from "react";
import { TextInput, Button } from "react-native-paper";
import { StyleSheet, Image, Text, View } from "react-native";

const WelcomeScreen = () => {
  const [text, setText] = React.useState("");
  const [password, setPassword] = React.useState("");

  return (
    <View style={styles.container}>
      <View style={styles.logoContainer}>
        <Image source={require('../assets/leaf_logo.png')} />
      </View>
      <View style={styles.textContainer}>
        <TextInput
          style={styles.item}
          label="E-mail"
          mode="outlined"
          value={text}
          onChangeText={(text) => setText(text)}
        />
        <TextInput
          style={styles.item}
          label="Senha"
          mode="outlined"
          secureTextEntry={true}
          value={password}
          onChangeText={(password) => setPassword(password)}
        />
        <Button           
        style={styles.button}
        contentStyle={{height: 50}}
        mode="contained" 
        onPress={() => console.log('Pressed')}>
            Entrar
        </Button>
        <View style={styles.containerOptions}>
          <Text style={styles.optionsText}>
            Esqueceu sua senha? 
          </Text>
          <Text style={styles.optionsText}>
            ou <Text style={styles.innerText}>Crie sua conta</Text>
          </Text>
        </View>
        
        
              
      </View>
    </View>
  );
};

export default WelcomeScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  logoContainer: {
    justifyContent: 'center',
    alignItems: 'center',
    flex: 1
  },
  textContainer: {
    margin: 10,
    flex: 1,
  },
  item: {
    marginVertical: 10
  },
  button: {
    marginVertical: 10
  },
  innerText: {
    color: '#43a047'
  },
  containerOptions:{
    alignItems: 'center',
  },

  optionsText: { 
    marginTop: 10,
    fontSize: 16,
    alignItems: 'center'
  }
});
