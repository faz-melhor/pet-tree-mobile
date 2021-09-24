import * as React from "react";
import { StyleSheet, View } from "react-native";
import { useTheme } from "react-native-paper";
import usersApi from "../api/users";
import useApi from "../hooks/useApi";

import {
  AppForm,
  AppFormField,
  SubmitButton,
  ErrorMessage,
} from "../components/forms";
import * as Yup from "yup";

const validationSchema = Yup.object().shape({
  name: Yup.string().required().label("Nome"),
  nickname: Yup.string().required().label("Nickname"),
  email: Yup.string().required().email().label("Email"),
  password: Yup.string().required().min(4).label("Senha"),
});

const RegisterAccountScreen = ({ navigation }) => {
  const { defaultMargin } = useTheme();

  const registerApi = useApi(usersApi.register);

  const [error, setError] = React.useState();

  const handleSubmit = async (userInfo) => {
    const result = await registerApi.request(userInfo);
    if (!result.ok) {
      if (result.data) setError(result.data.error);
      else {
        setError("An unexpected error occurred.");
        console.log(result);
      }
      return;
    }

    navigation.goBack(null);
  };

  return (
    <View style={styles({ defaultMargin }).container}>
      <AppForm
        initialValues={{ name: "", nickname: "", email: "", password: "" }}
        onSubmit={handleSubmit}
        validationSchema={validationSchema}
      >
        <ErrorMessage error={error} visible={error} />
        <AppFormField
          autoCorrect={false}
          mode="outlined"
          name="name"
          placeholder="Name"
        />
        <AppFormField
          autoCorrect={false}
          mode="outlined"
          name="nickname"
          placeholder="Nickname"
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
        <SubmitButton title="Registrar" />
      </AppForm>
    </View>
  );
};

export default RegisterAccountScreen;
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
  });
};
