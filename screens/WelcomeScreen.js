import * as React from "react";
import { StyleSheet, Image, Text, View } from "react-native";
import {
  AppForm,
  AppFormField,
  SubmitButton,
  ErrorMessage,
} from "../components/forms";
import authApi from "../api/auth";
import * as Yup from "yup";

const validationSchema = Yup.object().shape({
  email: Yup.string().required().email().label("Email"),
  password: Yup.string().required().min(4).label("Password"),
});

const WelcomeScreen = () => {
  const [loginFailed, setLoginFailed] = React.useState(false);

  const handleSubmit = async ({ email, password }) => {
    result = await authApi.login(email, password);
    if (!result.ok) return setLoginFailed(true);
    setLoginFailed(false);
    console.log("Hey, it works:", result.data);
  };

  return (
    <View style={styles.container}>
      <View style={styles.logoContainer}>
        <Image source={require("../assets/leaf_logo.png")} />
      </View>
      <AppForm
        initialValues={{ email: "", password: "" }}
        onSubmit={handleSubmit}
        validationSchema={validationSchema}
      >
        <ErrorMessage
          error="Invalid email and/or password."
          visible={loginFailed}
        />
        <AppFormField
          autoCapitalize="none"
          autoCorrect={false}
          mode="outlined"
          keyboardType="email-address"
          name="email"
          placeholder="Email"
          textContentType="emailAddress"
        />
        <AppFormField
          autoCapitalize="none"
          autoCorrect={false}
          mode="outlined"
          name="password"
          placeholder="Password"
          secureTextEntry
          textContentType="password"
        />
        <SubmitButton title="Log In" />
        <View style={styles.containerOptions}>
          <Text style={styles.optionsText}>Esqueceu sua senha?</Text>
          <Text style={styles.optionsText}>
            ou <Text style={styles.innerText}>Crie sua conta</Text>
          </Text>
        </View>
      </AppForm>
    </View>
  );
};

export default WelcomeScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    margin: 10,
  },
  logoContainer: {
    justifyContent: "center",
    alignItems: "center",
    flex: 1,
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
