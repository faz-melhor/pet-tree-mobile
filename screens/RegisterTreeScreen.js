import * as React from "react";
import { StyleSheet, View } from "react-native";
import { Text, Switch, useTheme } from "react-native-paper";
import {
  AppForm,
  AppFormField,
  SubmitButton,
  ErrorMessage,
} from "../components/forms";
import * as Yup from "yup";
import useAuth from "../auth/useAuth";
import useApi from "../hooks/useApi";
import usersApi from "../api/users";
import AppFormSwitch from "../components/forms/AppFormSwitch";

const validationSchema = Yup.object().shape({
  description: Yup.string().required().label("description"),
  specie: Yup.string().required().label("specie"),
  fruitful: Yup.boolean().required(),
  lat: Yup.number().required(),
  lng: Yup.number().required(),
});

const RegisterScreen = (lat, long) => {
  const { user } = useAuth();
  const addTree = useApi(usersApi.addTree);

  const [treeFruitful, setTreeFruitful] = React.useState(false);

  const { defaultMargin } = useTheme();

  const onToggleFruitfulSwitch = () => setTreeFruitful(!treeFruitful);
  const [error, setError] = React.useState();

  const handleSubmit = async (treeInfo) => {
    const result = await addTree.request(user.sub, treeInfo);
    if (!result.ok) {
      if (result.data) setError(result.data.errors.detail);
      else {
        setError("An unexpected error occurred.");
      }
      return;
    }
    console.log("Hey it works");
    console.log(treeInfo);
  };

  return (
    <View style={styles({ defaultMargin }).container}>
      <AppForm
        initialValues={{
          description: "",
          specie: "",
          fruitful: false,
          lat: -34.57613278928747,
          lng: -58.40964771739279,
        }}
        onSubmit={handleSubmit}
        validationSchema={validationSchema}
      >
        <ErrorMessage error={error} visible={error} />
        <AppFormField
          autoCorrect={false}
          mode="outlined"
          name="description"
          placeholder="Descrição"
        />
        <AppFormField
          autoCorrect={false}
          mode="outlined"
          name="specie"
          placeholder="Espécie"
        />
        <View style={styles().switchContainer}>
          <AppFormSwitch style={styles().switchComponent} name="fruitful" />
          <Text style={styles().switchLabel}> Frutífera</Text>
        </View>
        <SubmitButton title="Adicionar Árvore" />
      </AppForm>
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
      margin: 10,
    },
  });
};
