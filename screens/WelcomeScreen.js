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
import { Button } from "react-native-paper";
import routes from "../navigation/routes";
import useAuth from "../auth/useAuth";

const validationSchema = Yup.object().shape({
  email: Yup.string().required().email().label("Email"),
  password: Yup.string().required().min(4).label("Password"),
});

const WelcomeScreen = ({ navigation }) => {
  const { logIn } = useAuth();

  const [loginFailed, setLoginFailed] = React.useState(false);

  const handleSubmit = async ({ email, password }) => {
    result = await authApi.login(email, password);
    if (!result.ok) return setLoginFailed(true);
    setLoginFailed(false);
    console.log("Hey, it works:", result.data);
    logIn(result.data["token"]);
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
          <View style={styles.innerContainer}>
            <Text style={styles.optionsText}>ou</Text>
            <Button
              style={styles.innerButton}
              onPress={() => navigation.navigate(routes.REGISTER_ACCOUNT)}
            >
              Crie sua conta
            </Button>
          </View>
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
  innerButton: {
    margin: 0,
    padding: 0,
  },
  containerOptions: {
    alignItems: "center",
  },
  innerContainer: {
    flexDirection: "row",
    justifyContent: "center",
    alignItems: "center",
  },
  optionsText: {
    fontSize: 16,
  },
});
