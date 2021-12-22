import * as React from "react";
import { ScrollView, StyleSheet, Text, View } from "react-native";
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
import useAuth from "../auth/useAuth";
import AppActivityIndicator from "../components/AppActivityIndicator";

const validationSchema = Yup.object().shape({
  name: Yup.string().required().label("Nome"),
  nickname: Yup.string().required().label("Nickname"),
  email: Yup.string().required().email().label("Email"),
  password: Yup.string().required().min(4).label("Senha"),
});

const simple_diff = (obj1, obj2) => {
  var result = {};

  for (var key in obj2) {
    if (obj1[key] != obj2[key]) {
      result[key] = obj2[key];
    }
  }
  return result;
};

const EditAccountScreen = ({ navigation }) => {
  const { defaultMargin } = useTheme();
  const { user, setUserInfo } = useAuth();

  const initialValues = {
    name: user.name,
    nickname: user.nickname,
    email: user.email,
    password: "pass_test_123#",
  };

  const updateApi = useApi(usersApi.updateUserInfo);
  const getUserApi = useApi(usersApi.getUser);

  const [error, setError] = React.useState();

  const handleSubmit = async (userInfo) => {
    const userInfoToUpdate = simple_diff(initialValues, userInfo);
    if (Object.keys(userInfoToUpdate).length === 0) {
      return;
    }
    const result = await updateApi.request(user.id, userInfoToUpdate);
    if (!result.ok) {
      if (result.data) setError(result.data.error);
      else {
        setError("An unexpected error occurred.");
      }
      return;
    }
    userInfo = await getUserApi.request(user.id);
    setUserInfo(userInfo.data);

    navigation.goBack(null);
  };

  return (
    <ScrollView>
      <AppActivityIndicator visible={updateApi.loading || getUserApi.loading} />
      <View style={styles({ defaultMargin }).container}>
        <AppForm
          initialValues={initialValues}
          onSubmit={handleSubmit}
          validationSchema={validationSchema}
        >
          <ErrorMessage error={error} visible={error} />
          <Text style={styles().text}>Nome</Text>
          <AppFormField
            style={styles().formText}
            autoCorrect={false}
            mode="outlined"
            name="name"
            placeholder="Name"
          />
          <Text style={styles().text}>Nickname</Text>
          <AppFormField
            style={styles().formText}
            autoCorrect={false}
            mode="outlined"
            name="nickname"
            placeholder="Nickname"
          />
          <Text style={styles().text}>E-mail</Text>
          <AppFormField
            style={styles().formText}
            autoCapitalize="none"
            autoCorrect={false}
            mode="outlined"
            keyboardType="email-address"
            name="email"
            placeholder="Email"
            textContentType="emailAddress"
          />
          <Text style={styles().text}>Senha</Text>
          <AppFormField
            autoCapitalize="none"
            autoCorrect={false}
            mode="outlined"
            name="password"
            placeholder="Password"
            secureTextEntry
            textContentType="password"
          />

          <SubmitButton title="Salvar" />
        </AppForm>
      </View>
    </ScrollView>
  );
};

export default EditAccountScreen;
const styles = (props) => {
  const { defaultMargin } = props || 5;
  return StyleSheet.create({
    container: {
      flex: 1,
      margin: defaultMargin,
    },
    text: {
      fontSize: 16,
    },
    formText: {
      marginVertical: 0,
      marginBottom: 20,
    },
  });
};
